var config = {
    apiKey: "AIzaSyB5J3z8FirEN4HskBoM1fqsj6vkdTATG9g",
    authDomain: "sb-fgu.firebaseapp.com",
    databaseURL: "https://sb-fgu.firebaseio.com",
    projectId: "sb-fgu",
    storageBucket: "sb-fgu.appspot.com",
    messagingSenderId: "368024117056"
};
firebase.initializeApp(config);

// Initialize Firebase
// var config = {
//     apiKey: "AIzaSyBBRzM0dlKNHCN2dNFdINzioWxmPQ6XZz4",
//     authDomain: "smartbin4greenuniversity.firebaseapp.com",
//     databaseURL: "https://smartbin4greenuniversity.firebaseio.com",
//     projectId: "smartbin4greenuniversity",
//     storageBucket: "smartbin4greenuniversity.appspot.com",
//     messagingSenderId: "454493721327"
// };
// firebase.initializeApp(config);

var name;
var database = firebase.database();
var Uid;

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
            Uid = uid;
            // console.log(providerData);
            // $("#Name").text("Hi: " + displayName.toString());
            writeUserData(uid,displayName,email,photoURL);
        }
    }, function(error) {
        console.log(error);
        alert("Some Thing Worng! please login agian");
    });
};
window.addEventListener('load', function() {
    initApp();
});

function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).update({
        username: name,
        email: email,
        profile_picture: imageUrl,
        SBNumber: "SB1",
        uid : userId
    });
    firebase.database().ref('LogUser/').child('Lasted').set({
        Uid: userId,
        SBNumber: "SB1",
        StatusDevice: parseInt(1)
    });
    var d = new Date();
    firebase.database().ref('Log/').child('Time').push({
        Uid: userId,
        SBNumber: "SB1",
        Time: d.toString().substr(0, 24)
    });
    console.log("Write data Success")
}

function Signout(){
    firebase.auth().signOut().then(function() {
            firebase.database().ref('LogUser/CodeGen/').child('AuthenCode').set({
                Status : parseInt(0)
            });
            firebase.database().ref('LogUser/CodeGen/').child('Repush_state').set({
                Repush : parseInt(0)
            });
            firebase.database().ref('LogUser/').child('Lasted').set({
                Uid : Uid,
                SBNumber: "SB1",
                StatusDevice: parseInt(0)
            });
            console.log('Signed Out');
            alert('Signed Out');
            window.location.href = "index.html";
        },
        function(error) {
            console.error('Sign Out Error', error);
        });
     setTimeout(3000);
}

function veryfyCode() {
    var database = firebase.database();
    var ref = database.ref('LogUser/CodeGen/Code');
    ref.on('value',function (snapshot){
        var Token = snapshot.val();
        var Code =  document.getElementById("activeCode").value;
        if(Code == Token){
            firebase.database().ref('LogUser/CodeGen/').child('AuthenCode').set({
                Status: parseInt(1)
            });
            alert("CORRECT");
            console.log("TRUE");
            window.location.href = "data.html";
        }
        else{
            firebase.database().ref('LogUser/CodeGen/').child('AuthenCode').set({
                Status: parseInt(0)
            });
            console.log("FALSE");
            alert("Please Try agian!!");
        }
    });
}

function EditProfile() {
    // var user = firebase.auth().currentUser;
    var Firstname =  $('#EditFirstname').val();
    var Lastname =   $('#EditLastname').val();
    var Email = $('#EditEmail').val();
    var Telephone = $('#EditTelephone').val();
    var Defualt_Username = $('#EditUsername').val();
    var seLectedFile = $('#Profile_picture').get(0).files[0];
    var filename =  seLectedFile.name;
    console.log(seLectedFile);

    var dataref = firebase.storage().ref("/imgProfile/" + filename);
    var uploadTask = dataref.put(seLectedFile);

    uploadTask.on('state_changed' , function (snapshot) {
    },function (err) {

    },function () {
        var downLoadURL = uploadTask.snapshot.downloadURL;
            var user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: Firstname + ' ' + Lastname,
                photoURL: downLoadURL,
                email : Email,
                phoneNumber : Telephone
            }).then(function() {
                console.log("updateProfile  Success")
            }).catch(function(error) {
                console.log("updateProfile  Error")
            });
            user.updateEmail(Email).then(function() {
                console.log("updateEmail Success")
            }).catch(function(error) {
                console.log("updateEmail Success")
            });
            console.log(downLoadURL)
        }

    );
    database.ref('users/' + Uid).update({
        Defualt_Username: Defualt_Username
    });
}

var News = [];
var ref1 = database.ref('Admin/Post/').limitToLast(4);
ref1.orderByKey().on('value',function (snapshot){
    if(snapshot.exists()) {
        snapshot.forEach(function (data) {
            var Values = data.val();
            // console.log(Values);
            News.push(Values);
        });
        News.reverse();
        // console.log(News);
        if (News.length === 1){
            $("#New1").show();
            $("#New2").hide();
            $("#New3").hide();
            $("#New4").hide();
        }
        else if(News.length === 2 ) {
            $("#New1").show();
            $("#New2").show();
            $("#New3").hide();
            $("#New4").hide();

        }
        else if(News.length === 3 ) {
            $("#New1").show();
            $("#New2").show();
            $("#New3").show();
            $("#New4").hide();

        }
        else if(News.length === 4 ) {
            $("#New1").show();
            $("#New2").show();
            $("#New3").show();
            $("#New4").show();
        }

            $("#Title1").text(News[0].Title);
            $("#Header1").text(News[0].Title);
            $("#img1").attr("src", News[0].Img_Url);
            $("#Details1").text(News[0].Details);
            $("#Writer1").text("Write by : " + News[0].Writer);
            $("#PostTime1").text("Post Time : " + News[0].Time);

            $("#Title2").text(News[1].Title);
            $("#Header2").text(News[1].Title);
            $("#img2").attr("src", News[1].Img_Url);
            $("#Details2").text(News[1].Details);
            $("#Writer2").text("Write by : " + News[1].Writer);
            $("#PostTime2").text("Post Time : " + News[1].Time);

            $("#Title3").text(News[2].Title);
            $("#Header3").text(News[2].Title);
            $("#img3").attr("src", News[2].Img_Url);
            $("#Details3").text(News[2].Details);
            $("#Writer3").text("Write by : " + News[2].Writer);
            $("#PostTime3").text("Post Time : " + News[2].Time);

            $("#Title4").text(News[3].Title);
            $("#Header4").text(News[3].Title);
            $("#img4").attr("src", News[3].Img_Url);
            $("#Details4").text(News[3].Details);
            $("#Writer4").text("Write by : " + News[3].Writer);
            $("#PostTime4").text("Post Time : " + News[3].Time);
    }
});

var SUM = 0;
database.ref("/History").once('value', function(snapshot){
    if(snapshot.exists()){
        snapshot.forEach(function(data){
            var val = data.val();
            var User = val.UID;
            var Bottle = val.Logbottle;
            if(Uid == User){
                if( val.Logbottle != 0) {
                    SUM += Bottle;
                }
            }
        });
    }
    $("#totalbot").text(SUM.toString());
    SUM = 0;
});

var ref2 = firebase.database().ref("Log/Time");
ref2.orderByKey().on("value", function(snapshot) {
    if (snapshot.exists()) {
        snapshot.forEach(function (data) {
            var val = data.val();
            var User_ID = val.Uid;
            var Time = val.Time;
            if (Uid == User_ID) {
                if (Time != null) {
                    // document.getElementById("Time").innerHTML = Time.toString();
                    $("#Time").text(Time.toString());
                }
            }
        });
    }
});

var ref3 = firebase.database().ref('users/');
ref3.on("value", function(snapshot) {
    snapshot.forEach(function(data){
        var Val = data.val();
        var User = Val.uid;
        // console.log(Val)
        if(Uid == User){
            $("#Username").text(Val.username);
            $("#Email").text(Val.email);
            $("#image1").attr("src", Val.profile_picture);
            $("#Name").text("Hi : " + Val.Defualt_Username);
            $("#Defualt_Username").text( '@' + Val.Defualt_Username);

        }
    });
});

$(document).ready(function () {
    $("#New1").hide();
    $("#New2").hide();
    $("#New3").hide();
    $("#New4").hide();
    $("#editProfile").hide();

    $("#btnEdit").click(function (){
        $("#Profile").hide();
        $("#editProfile").show();
    });
    $("#Submit").click(function(){
        $("#EditPro").trigger("reset");
        $("#Profile").show();
        $("#editProfile").hide();
    });
    $("#Cancle").click(function(){
        location.reload();
    });
});



