var config = {
    apiKey: "AIzaSyB5J3z8FirEN4HskBoM1fqsj6vkdTATG9g",
    authDomain: "sb-fgu.firebaseapp.com",
    databaseURL: "https://sb-fgu.firebaseio.com",
    projectId: "sb-fgu",
    storageBucket: "sb-fgu.appspot.com",
    messagingSenderId: "368024117056"
};
firebase.initializeApp(config);

var seLectedFile;
initApp =  function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var phoneNumber = user.phoneNumber;
            var providerData = user.providerData;

            document.getElementById("Name").innerHTML = "Hi Admin: " + displayName.toString();
            console.log(displayName);
        }
    }, function(error) {
        console.log(error);
        alert("Some Thing Worng! please login agian");
    });
};
window.addEventListener('load', function() {
    initApp()
});

var database = firebase.database();

$(document).ready(function () {
     $('#updateSuccess').hide();
    // seLectedFile = event.target.files[0];
    $("#Submit").click(function(){
        $("#form").trigger("reset");
    });
});

function showStatesuccess() {
    $('#updateSuccess').show();
}


function addNews() {
    var Writer =  $('#Writer').val();
    var Title =   $('#Title').val();
    var Details = $('#Details').val();
    var seLectedFile = $('#Picturefile').get(0).files[0];
    var filename =  seLectedFile.name;
    console.log(seLectedFile);
    var dataref = firebase.storage().ref("/images/" + filename);
    var uploadTask = dataref.put(seLectedFile);

    uploadTask.on('state_changed' , function (snapshot) {
    },function (err) {

    },function () {
        var postKey = database.ref('/Admin/Post/').push().key;
        var downLoadURL = uploadTask.snapshot.downloadURL;
        var updates = {};
        var postData = {
            Writer : Writer,
            Title : Title,
            Details: Details,
            Img_Url : downLoadURL
        }
        updates['/Admin/Post/'+ postKey] = postData;
        database.ref().update(updates);
        showStatesuccess();
        setTimeout(2000);
    });
}
