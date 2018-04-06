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
    initApp();
});

var Level ;
var database = firebase.database();
var ref = database.ref('Ultrasonic/');
ref.on('value',function (snapshot){
        var Values = snapshot.val();
        var D1 = Values.Distance1;
        var D2 = Values.Distance2;
        Level= D1;

        // if(         ( D1 >= 45 && D1 <= 60 )  &&  ( D2 >= 23  && D2 <= 30 )  ){
        //     Level = xxx;
        // }
        // else if(    ( D1 >= xxx && D1 <= xxx )  &&  ( D2 >= xxx  && D2 <= xxx )  ){
        //     Level = xxx;
        // }
        // else if(    ( D1 >= xxx && D1 <= xxx )  &&  ( D2 >= xxx && D2 <= xxx )   ){
        //     Level = xxx ;
        // }
        // else if(    ( D1 >= xxx && D1 <= xxx)  &&   ( D2 >= xxx && D2 <= xxx )   ){
        //     Level = xxx ;
        // }

        console.log(D1);
        $("#Percent").text(Level + "%");

    $("#pg1").css("width", "0px");
    $(function() {
        $("#pg1").each(function() {
            // var finalWidth = parseInt($(this).attr("aria-valuenow"));
            var finalWidth = Level;
            if(finalWidth >=0 && finalWidth<=25){
                $('#pg1').show();
            }
            else{
                $('#pg1').hide();
            }

            $(this).css("width", "0px").animate({width: finalWidth+"%"}, 500);
        });
    });

    $("#pg2").css("width", "0px")
    $(function() {
        $("#pg2").each(function() {
            // var finalWidth = parseInt($(this).attr("aria-valuenow"));
            var finalWidth = Level;
            if(finalWidth >=26 && finalWidth<=50){
                $('#pg2').show();
            }
            else{
                $('#pg2').hide();
            }
            $(this).css("width", "0px").animate({width: finalWidth+"%"}, 500);
        });
    });

    $("#pg3").css("width", "0px")
    $(function() {
        $("#pg3").each(function() {
            // var finalWidth = parseInt($(this).attr("aria-valuenow"));
            var finalWidth = Level;
            if(finalWidth >=51 && finalWidth<=75){
                $('#pg3').show();
            }
            else{
                $('#pg3').hide();
            }
            $(this).css("width", "0px").animate({width: finalWidth+"%"}, 500);
        });
    });

    $("#pg4").css("width", "0px")
    $(function() {
        $("#pg4").each(function() {
            // var finalWidth = parseInt($(this).attr("aria-valuenow"));
            var finalWidth = Level;
            if(finalWidth >=76 && finalWidth<=98){
                $('#pg4').show();
            }
            else{
                $('#pg4').hide();
            }
            $(this).css("width", "0px").animate({width: finalWidth+"%"}, 500);
        });
    });

    $("#pg5").css("width", "0px")
    $(function() {
        $("#pg5").each(function() {
            // var finalWidth = parseInt($(this).attr("aria-valuenow"));
            var finalWidth = Level;
            if(finalWidth > 98){
                $('#pg5').show();
            }
            else{
                $('#pg5').hide();
            }
            $(this).css("width", "0px").animate({width: finalWidth+"%"}, 500);
        });
    });
});

$(document).ready(function () {
     $('#updateSuccess').hide();
     $('#updateOSV').hide();
     $('#updateSV').hide();
     // $('#btnSV').hide();
     $("#Submit").click(function(){
         $("#form").trigger("reset");
      });
});

function showStatesuccess() {
    $('#updateSuccess').show();
}

function setOutofservice() {
    $('#updateOSV').show();
    $('#updateSV').hide();
}

function setService() {
    $('#updateOSV').hide();
    $('#updateSV').show();
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
        };
        updates['/Admin/Post/'+ postKey] = postData;
        database.ref().update(updates);
        showStatesuccess();
        setTimeout(2000);
    });
}

