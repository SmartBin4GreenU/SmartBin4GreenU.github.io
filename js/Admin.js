var config = {
    apiKey: "AIzaSyB5J3z8FirEN4HskBoM1fqsj6vkdTATG9g",
    authDomain: "sb-fgu.firebaseapp.com",
    databaseURL: "https://sb-fgu.firebaseio.com",
    projectId: "sb-fgu",
    storageBucket: "sb-fgu.appspot.com",
    messagingSenderId: "368024117056"
};
firebase.initializeApp(config)

var seLectedFile;
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
            document.getElementById("Name").innerHTML = "Hi Admin: " + displayName.toString();
            console.log(displayName);
        }
    }, function(error) {
        console.log(error);
        alert("Some Thing Worng! please login agian");
    });
};
window.addEventListener('load', function() {
    initApp();
});

var Level ;
var database = firebase.database();

var ref = database.ref('Ultrasonic/');
ref.on('value',function (snapshot){
        var Values = snapshot.val();
        var Distance = Values.Distance1;
        var h_max = Values.Hight;
        var w_max = Values.Raduis;
        /********************************** Find Volume ************************************/
        var pi = 3.14;
        var h = Distance;
        if(Distance >= h_max ){
           h = h_max;
        }
        var volume = ( ( pi * w_max/2 ) * ( pi * w_max/2 ) )* h_max;
        Level =      ( ( ( pi *  w_max/2 ) * ( pi *  w_max/2) ) * h / volume) * 100 ;
        /***********************************************************************************/
        if(Level >= 100){
            Level =  100 - Level;
        }
        else{
            Level = 100 - Level;
        }
        // console.log("R : " + r);
        // console.log("Vol :" + volume);
        // console.log("Level :" + parseInt(Level));

        $("#Percent").text(parseInt(Level) + " %");

    $("#pg1").css("width", "0px");
    $(function() {
        $("#pg1").each(function() {
            var finalWidth = parseInt(Level);
            if(finalWidth >=0 && finalWidth<=25){
                // if(finalWidth >=0 && finalWidth<=25){
                $('#pg1').show();
            }
            else{
                $('#pg1').hide();
            }

            $(this).css("width", "0px").animate({width: finalWidth+"%"}, 500);
        });
    });

    $("#pg2").css("width", "0px");
    $(function() {
        $("#pg2").each(function() {
            var finalWidth = parseInt(Level);
            if(finalWidth >=26 && finalWidth<=50){
                $('#pg2').show();
            }
            else{
                $('#pg2').hide();
            }
            $(this).css("width", "0px").animate({width: finalWidth+"%"}, 500);
        });
    });

    $("#pg3").css("width", "0px");
    $(function() {
        $("#pg3").each(function() {
            var finalWidth = parseInt(Level);
            if(finalWidth >=51 && finalWidth<=75){
                $('#pg3').show();
            }
            else{
                $('#pg3').hide();
            }
            $(this).css("width", "0px").animate({width: finalWidth+"%"}, 500);
        });
    });

    $("#pg4").css("width", "0px");
    $(function() {
        $("#pg4").each(function() {
            var finalWidth = parseInt(Level);
            if(finalWidth >=76 && finalWidth<=95){
                $('#pg4').show();
            }
            else{
                $('#pg4').hide();
            }
            $(this).css("width", "0px").animate({width: finalWidth+"%"}, 500);
        });
    });

    $("#pg5").css("width", "0px");
    $(function() {
        $("#pg5").each(function() {
            var finalWidth = parseInt(Level);
            if(finalWidth > 95){
                $('#pg5').show();
            }
            else{
                $('#pg5').hide();
            }
            $(this).css("width", "0px").animate({width: finalWidth+"%"}, 500);
        });
    });
});

var ref1 = database.ref('LogUser/Lasted/');
ref1.on('value',function (snapshot){
    var Values = snapshot.val();
    var Status = Values.StatusDevice;
    // console.log(Status);
         if(Status == 0){
             $('#StatusOn').show();
             $('#StatusOn').text("Services");
             $('#StatusOff').hide();
             $("#btnOFS").show();
             $("#btnSV").hide();
         }
         else if(Status == 2 ){
             $('#StatusOff').show();
             $('#StatusOff').text("Out Of Services");
             $('#StatusOn').hide();
             $("#btnOFS").hide();
             $("#btnSV").show();
         }
});

var ref2 = firebase.database().ref('users/');
ref2.on("value", function(snapshot) {
    var Val = snapshot.val();
    var num = 0;
    Object.keys(Val).map(function (key) {
        $('tbody').append('<tr>' +
            '<td>' + ++num +'</td>' +
            '<td>' + Val[key].username +'</td>' +
            '<td>' + key +'</td>' +
            '<td>' + Val[key].email + '</td>' +
            '<td>' + '<button class="btn btn-primary" onclick="Edit(\''+ key +'\')">Edit</button>' + '</td>' +
            '<td>' + '<button class="btn btn-danger"  onclick="Delete(\''+ key +'\')">Delete</button>' + '</td>' +
            '</tr>')
        });
});


$(document).ready(function () {
      $('#updateSuccess').hide();

      $('#updateOSV').hide();
      $('#updateSV').hide();

      $('#editBar').hide();
      $('#delBar').hide();


     $("#Submit").click(function(){
         $("#form").trigger("reset");
      });

     $("#SetupTank").click(function(){
        $("#Setup").trigger("reset");
    });

    $("#btnOFS").show();
    $("#btnSV").hide();
    $('#StatusOn').show();
    $('#StatusOn').text("Services");

    $('#btnOFS').click(function () {
        firebase.database().ref('LogUser/Lasted/').set({
            SBNumber : "SB1",
            StatusDevice : parseInt(2),
            Uid : Uid
        });
    });
    $('#btnSV').click(function () {
        firebase.database().ref('LogUser/Lasted/').set({
            SBNumber : "SB1",
            StatusDevice : parseInt(0),
            Uid : Uid
        });
    });
});

function showStatesuccess() {
    $('#updateSuccess').show();
}

function setUptank() {
    firebase.database().ref('Ultrasonic/').update({
        Raduis : parseInt($("#Raduistank").val()),
        Hight :  parseInt($("#Higthesttank").val())
    });

}
function Edit(UID){
    console.log(UID);
    console.log("Edit");
    $('#editBar').show();
    $('#delBar').hide();
    alert("Edit");
    // firebase.database().ref('users/'+ UID).update({
    //     SBNumber : "SB1",
    //     email : parseInt(2),
    //     profile_picture :  ,
    //     uid : UID,
    //     username :
    // });
}

function Delete(UID){
    console.log(UID);
    console.log("Delete");
    $('#delBar').show();
    $('#editBar').hide();
    alert("Delete");
    // firebase.database().ref('users/'+ UID).remove();
}
function outOfservice() {
    console.log("OUT OF SERVICE");
    firebase.database().ref('LogUser/Lasted/').set({
        SBNumber : "SB1",
        StatusDevice : parseInt(2),
        Uid : Uid
    });
    $("#btnOFS").hide();
    $("#btnSV").show();
    $('#updateOSV').show();
    $('#updateSV').hide();

    $('#StatusOff').show();
    $('#StatusOff').text("Out Of Services");
    $('#StatusOn').hide();
}

function Service() {
    console.log("SERVICE");
    firebase.database().ref('LogUser/Lasted/').set({
        SBNumber : "SB1",
        StatusDevice : parseInt(0),
        Uid : Uid
    });
    $("#btnOFS").show();
    $("#btnSV").hide();
    $('#updateOSV').hide();
    $('#updateSV').show();

    $('#StatusOn').show();
    $('#StatusOn').text("Services");
    $('#StatusOff').hide();
}


function addNews() {
    var Writer =  $('#Writer').val();
    var Title =   $('#Title').val();
    var Details = $('#Details').val();
    var seLectedFile = $('#Picturefile').get(0).files[0];
    var filename =  seLectedFile.name;
    console.log(seLectedFile);
    // if(seLectedFile == null){
    //
    // }
    // else{
    //
    // }
    var dataref = firebase.storage().ref("/images/" + filename);
    var uploadTask = dataref.put(seLectedFile);

    uploadTask.on('state_changed' , function (snapshot) {
    },function (err) {

    },function () {
        var postKey = database.ref('/Admin/Post/').push().key;
        var downLoadURL = uploadTask.snapshot.downloadURL;
        var updates = {};
        var date = new Date();
        var postData = {
            Writer : Writer,
            Title : Title,
            Details: Details,
            Img_Url : downLoadURL,
            Time : date.toString().substr(0, 24)
        };
        console.log(date.toString().substr(0, 24));
        updates['/Admin/Post/'+ postKey] = postData;
        database.ref().update(updates);
        showStatesuccess();
        setTimeout(500);
    });
}


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

}
