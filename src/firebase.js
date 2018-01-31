// Initialize Firebase
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

        // userId = firebase.auth().currentUser.uid;
        //console.log(userId);

        Uid = uid;
        /*Uid = userId;*/
        document.getElementById("name").innerHTML = displayName;
        document.getElementById("email").innerHTML =  email;
        document.getElementById("tel").innerHTML =  phoneNumber;
        document.getElementById("dropdownMenuButton").innerHTML = "Hi : " + displayName;
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
    firebase.database().ref('Log/' + d).set({
        Uid: userId,
        SBNumber: "SB1"


    });

}


function Signout() {
    firebase.auth().signOut().then(function() {
            console.log('Signed Out');
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
            window.location.href = "Data.html";
            console.log("TRUE");
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






var sessionsRef = firebase.database().ref("sessions");
sessionsRef.push({
    startedAt: firebase.database.ServerValue.TIMESTAMP
});


var SUM = 0;
var num = 0;
database.ref("/History").once('value', function(snapshot){

    if(snapshot.exists()){
        var content = '';
        var Sum_text = '';
        snapshot.forEach(function(data){
            var val = data.val();
            var User = val.UID;
            var Bottle = val.Logbottle;


            /*    console.log(Uid);
                console.log(User);*/

            if(Uid == User){

                if( val.Logbottle != 0) {
                    num = num+1;
                    SUM += Bottle;
                    content += '<tr>';
                    content += '<td>' +  num + '</td>';
                    content += '<td>' + val.Username + '</td>';
                    content += '<td>' + val.Logbottle + '</td>';
                    content += '</tr>';
                    console.log(val.Logbottle );
                    console.log(SUM);
                }
            }
        });
        num = 0;
        $('#ex-table').append(content);
    }

    document.getElementById("Summary").innerHTML = "Total " + SUM + " Bottles";
    SUM = 0;
});



/*var database = firebase.database();
// var ref = database.ref('History');
var ref = database.ref();
var text = "";
var text2 = "";
var Sum = 0;
var User;
var Outsource = 0;

function gotData(){ref.once('value').then(function (snapshot) {
        var key = snapshot.key;
        var chilldKey = snapshot.child("History").val();
        // console.log(key, chilldKey);

        var  data = chilldKey;
        var  keys = Object.keys(data);
        for(var i=0;i < keys.length; i++) {
            var k = keys[i];
            var name = data[k].Username;
            var Count = data[k].Logbottle;
            var uid = data[k].UID;
            User = uid;

            if( Uid == User){
                //console.log("Equal!!");
                if (Count !=  0) {
                    text += name + ' : ' + Count + "<br>";
                    //text += name + ' : ' + Count;
                    Sum += Count;


                }
            }

        }
        console.log(data)

        text2 = 'You Bottle is ' + Sum + ' Bottles';
        document.getElementById("tableData").innerHTML = text;
        document.getElementById("sum").innerHTML =  text2;


        // clear Value
        Sum = 0;
        text = "";
        text2 = "";
        //Uid = "";
        //
    });

}*/
