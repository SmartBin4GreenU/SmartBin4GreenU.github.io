


var config = {
    apiKey: "AIzaSyB5J3z8FirEN4HskBoM1fqsj6vkdTATG9g",
    authDomain: "sb-fgu.firebaseapp.com",
    databaseURL: "https://sb-fgu.firebaseio.com",
    projectId: "sb-fgu",
    storageBucket: "sb-fgu.appspot.com",
    messagingSenderId: "368024117056"
};
firebase.initializeApp(config);


// var database = firebase.database();
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
        // document.getElementById("Name").innerHTML = "Hi : " + displayName.toString();
        // console.log(displayName);


    }

}, function(error) {
    console.log(error);
    alert("Some Thing Worng! please login agian");
});


// var defaults = window.src = "Picture/Default.png" ;
var Uid;
var name;

function writeUserData(userId, name, email, imageUrl) {

    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageUrl,
        SBNumber: "SB1"
    });
    firebase.database().ref('LogUser/').child('Lasted').set({
        Uid : userId,
        SBNumber: "SB1",
        StatusDevice: parseInt(1)
    });

    var d = new Date();
    firebase.database().ref('Log/' + d ).set({
        Uid: userId,
        SBNumber: "SB1"


    });

}

function Signout() {
    firebase.auth().signOut().then(function() {
            console.log('Signed Out');
            alert('Signed Out');
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
            window.location.href = "index.html";

        },
        function(error) {
            console.error('Sign Out Error', error);
        });

}

function veryfyCode() {

    var database = firebase.database();
    var ref = database.ref('LogUser/CodeGen/Code');
    ref.on('value',function (snapshot){
        var Token = snapshot.val();
        var Code =  document.getElementById("activeCode").value;
        console.log(Token);
        console.log(Code);
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





