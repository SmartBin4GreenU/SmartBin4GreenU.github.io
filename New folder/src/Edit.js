var config = {
    apiKey: "AIzaSyB5J3z8FirEN4HskBoM1fqsj6vkdTATG9g",
    authDomain: "sb-fgu.firebaseapp.com",
    databaseURL: "https://sb-fgu.firebaseio.com",
    projectId: "sb-fgu",
    storageBucket: "sb-fgu.appspot.com",
    messagingSenderId: "368024117056"
};
firebase.initializeApp(config);

var storage = firebase.storage();


var database = firebase.database();
var defaults = window.src = "Picture/Default.png" ;
var Uid;
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
        document.getElementById("dropdownMenuButton").innerHTML = "Hi : " + displayName;

        // userId = firebase.auth().currentUser.uid;
        //console.log(userId);

        Uid = uid;
        /*Uid = userId;*/
        document.getElementById("name").innerHTML = displayName;
        document.getElementById("email").innerHTML =  email;
        document.getElementById("tel").innerHTML =  phoneNumber;

        /*document.querySelector('img').src = photoURL;*/
        // noinspection JSAnnotator
        if(photoURL != null){
            document.querySelector('img').src = photoURL;
        }
        else{
            document.querySelector('img').src = defaults  ;
        }

    }

}, function(error) {
    console.log(error);
    alert("Some Thing Worng! please login agian");
});



function Signout() {
    firebase.auth().signOut().then(function() {
            console.log('Signed Out');
            window.location.href = "index.html";

        },
        function(error) {
            console.error('Sign Out Error', error);
        });

}