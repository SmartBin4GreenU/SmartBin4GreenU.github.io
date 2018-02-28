var config = {
    apiKey: "AIzaSyB5J3z8FirEN4HskBoM1fqsj6vkdTATG9g",
    authDomain: "sb-fgu.firebaseapp.com",
    databaseURL: "https://sb-fgu.firebaseio.com",
    projectId: "sb-fgu",
    storageBucket: "sb-fgu.appspot.com",
    messagingSenderId: "368024117056"
};
firebase.initializeApp(config);


var database = firebase.database();
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

    var d= new Date();

   // firebase.database().ref().child('posts').push().key;

    firebase.database().ref('Log/').child('Time').push({
        Uid: userId,
        SBNumber: "SB1",
        Time : d.toString().substr(0,24)


    });


    // var recentPostsRef = firebase.database().ref('Log').orderByChild('Time').val();
    // var ref = firebase.database().ref("Log/Time");
    // ref.once("value").then(function(snapshot) {
    // var recentPostsRef  = snapshot.child("Log/Time").val();
    // console.log(recentPostsRef);
    // });

    // firebase.database().ref("/Log/Time").once('value', function(snapshot){
    //
    //     if(snapshot.exists()){
    //         snapshot.forEach(function(data){
    //             var val = data.val().order;
    //             console.log(val);
    //         });
    //     }
    // });


    // var ref = firebase.database().ref("Log");
    // ref.orderByChild("Time").on("child_added", function(snapshot) {
    //     console.log(snapshot.key,snapshot.val());
    //     console.log(snapshot.length,);
    // // });
    // var ref = firebase.database().ref("Log/Time");
    // ref.orderByValue().on("child_added", function(snapshot) {
    //     console.log(snapshot.key,snapshot.val());
    //     // console.log(snapshot.length());
    // });


//    firebase.database.ref('Log/').once('value', function(snapshot){
 }

// var offsetRef = firebase.database().ref(".info/serverTimeOffset");
// offsetRef.on("value", function(snap) {
//     var offset = snap.val();
//     var estimatedServerTimeMs = new Date().getTime() + offset;
// });

// // since I can connect from multiple devices or browser tabs, we store each connection instance separately
// // any time that connectionsRef's value is null (i.e. has no children) I am offline
// var myConnectionsRef = firebase.database().ref('users/joe/connections');
//
// // stores the timestamp of my last disconnect (the last time I was seen online)
// var lastOnlineRef = firebase.database().ref('users/joe/lastOnline');
//
// var connectedRef = firebase.database().ref('.info/connected');
// connectedRef.on('value', function(snap) {
//     if (snap.val() === true) {
//         // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
//         var con = myConnectionsRef.push();
//
//         // When I disconnect, remove this device
//         con.onDisconnect().remove();
//
//         // Add this device to my connections list
//         // this value could contain info about the device or a timestamp too
//         con.set(true);
//
//         // When I disconnect, update the last time I was seen online
//         lastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
//     }
// });
function Signout() {
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

}// }

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





