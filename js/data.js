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

var SUM = 0;
var num = 0;
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
        // document.getElementById("name").innerHTML = "User:"+ displayName;

        // userId = firebase.auth().currentUser.uid;
        //console.log(userId);

        Uid = uid;



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

Getdata =  function (){
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
                        content += '<td>' + val.Logtime + '</td>';
                        // content += '<td>' + val.Username + '</td>';
                        content += '<td>' + val.Logbottle + '</td>';
                        content += '</tr>';
                        console.log(val.Logbottle );
                        console.log(SUM);
                    }
                }
            });
            if(SUM == 0){
                alert("You should put the bottle before!!!");
            }
            num = 0;
            $('#ex-table').append(content);
        }

        document.getElementById("Summary").innerHTML = "Total " + SUM + " Bottles";

        SUM = 0;
    });

};


window.addEventListener('load', function() {
    Getdata()
});

