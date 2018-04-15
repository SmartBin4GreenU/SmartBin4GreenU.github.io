var config = {
    apiKey: "AIzaSyB5J3z8FirEN4HskBoM1fqsj6vkdTATG9g",
    authDomain: "sb-fgu.firebaseapp.com",
    databaseURL: "https://sb-fgu.firebaseio.com",
    projectId: "sb-fgu",
    storageBucket: "sb-fgu.appspot.com",
    messagingSenderId: "368024117056"
};
firebase.initializeApp(config)


//Initialize Firebase
// var config = {
//     apiKey: "AIzaSyBBRzM0dlKNHCN2dNFdINzioWxmPQ6XZz4",
//     authDomain: "smartbin4greenuniversity.firebaseapp.com",
//     databaseURL: "https://smartbin4greenuniversity.firebaseio.com",
//     projectId: "smartbin4greenuniversity",
//     storageBucket: "smartbin4greenuniversity.appspot.com",
//     messagingSenderId: "454493721327"
// };
// firebase.initializeApp(config);

var seLectedFile;
var Uid;
var database = firebase.database();
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
            // document.getElementById("Name").innerHTML = "Hi Admin: " + displayName.toString();
            $("#Name").text("Hi Admin: " + displayName.toString())
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

var name;
var ref4 = database.ref('Admin/List/');
ref4.on('value',function (snapshot){
    var Val = snapshot.val();
    var Admin = Val.Admin1;
    // console.log(Admin.toString() + '=='+Uid.toString());
      name = Admin;
      if (Uid != name ) {
          alert('Yoy are not Admin!!');
          setTimeout(2000);
          window.location.href = "index.html";
      }
    console.log("ADMIN");
    //
});

$(document).ready(function () {
    $('#updateSuccess').hide();
    $('#setUptankOK').hide();

    $('#User_Data').hide();
    $('#User_Table').show();

    $('#Print').hide();
    $('#Prev').hide();

    $('#Settank').hide();

    // $('#btnSetup').show();
    // $('#btnReset').show();
    $('#btnSetting').show();


    $('#updateOSV').hide();
    $('#updateSV').hide();

    $('#ResetSuccess').hide();

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

    $("#btnSetup").click(function(){
        $('#Settank').show();
        $('#btnSetting').hide();
        // $('#btnSetup').hide();
    });

    $('#btnReset').click(function () {
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
        alert("Reset Device Success")
        $('#ResetSuccess').show();
        $('#Settank').hide();
        $('#btnSetup').show();;
    });


    $('#Prev').click(function() {
        location.reload();
    });

});

var Level ;
var ref = database.ref('Ultrasonic/');
 ref.on('value',function (snapshot){
            var Values = snapshot.val();
            var Distance = Values.Distance;
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
        $('.U_Table').append('<tr>' +
            '<td>' + ++num +'</td>' +
            '<td>' + Val[key].username +'</td>' +
            '<td>' + key.substr(0,20)+"xxxxxxx" +'</td>' +
            '<td>' + Val[key].email + '</td>' +
            '<td style="text-align: center">' + '<button class="btn btn-success" style="margin: 10px" onclick="Show(\''+ key +'\' ,  \'' + Val[key].username + '\')">SHOW</button>' +
            '<button class="btn btn-danger"  onclick="DelData(\''+ key +'\')">DELETE</button>' + '</td>' +
            '</tr>')
    });

});

function DelData(UID) {
    var Checknode = 0;
    var ref = firebase.database().ref('History/');
    ref.on("value", function(snapshot) {
        var Val = snapshot.val();
        var num = 0;
        snapshot.forEach(function(data){
            var Val = data.val();
            var User = Val.UID;
            var Keys =  data.key;
            if( User === UID ){
               // firebase.database().ref('History/'+ Keys).remove()
                console.log("remove success!!")
                console.log(Keys)
                Checknode++;
            }
        });
        if(Checknode == 0){
            alert("User data  not found")
            //     console.log("Data User not found")
        }
    Checknode = 0;
    });
}

var ref3 = firebase.database().ref('users/');
ref3.on("value", function(snapshot) {
    var Val = snapshot.val();
    var num = 0;
    // console.log(Val);
         Object.keys(Val).map(function (key) {
            $('.U_Manage').append('<tr>' +
                '<td>' + ++num + '</td>' +
                '<td>' + Val[key].username + '</td>' +
                '<td>' + key.substr(0, 20) + "xxxxxxx" + '</td>' +
                '<td>' + Val[key].email + '</td>' +
                '<td style="text-align: center" >' + '<strong>' +  Val[key].status + '</strong>' + '</td>' +
                '<td style="text-align: center">' + '<button class="btn btn-danger " style="margin: 5px" onclick="STATUS(\'' + key + '\' , \'' + Val[key].status +'\')" id="Disable">Click</button>' +
                '</tr>')
    });

});


function STATUS( UID , STAUS){
     if(STAUS === "DISABLE"){
         firebase.database().ref('users/'+ UID).update({
             status : "ENABLE"
         });
         console.log("STAUS = ENABLE");
     }
     if(STAUS === "ENABLE"){
         firebase.database().ref('users/'+ UID).update({
             status : "DISABLE"
         });
         console.log("STAUS = DISABLE");
     }
    location.reload();
}

function showStatesuccess() {
    $('#updateSuccess').show();
}

function setUptank() {
    firebase.database().ref('Ultrasonic/').update({
        Raduis : parseInt($("#Raduistank").val()),
        Hight :  parseInt($("#Higthesttank").val())
    });
    $('#setUptankOK').show();
    $('#Settank').hide();
    $('#btnSetting').show();
}
var rows = [];
var Total = 0;
var Data = [];
var j =0;
var SUM  = 0;
function Show(UID, NAME){
     console.log("SHOW");
     $('#Username').text("NAME : " + NAME);
     $('#Uid').text("UID: " + UID.substr(0,20)+"xxxxxxx");
     $('#User_Data').show();
     $('#User_Table').hide();
     $('#Print').show();
            // alert("Edit");
     var ref = firebase.database().ref('History/');
     ref.on("value", function(snapshot) {
         var Val = snapshot.val();
         var num = 0;
         snapshot.forEach(function(data){
             var Val = data.val();
             var User = Val.UID;
             var Bottle = Val.Logbottle;
             if(UID == User){
                 if( Val.Logbottle != 0){
                     Data.push(Val)
                 }
             }
         });
         Data.reverse();
         console.log(Data)
         for (i in Data)
         {
             var B = Data[i].Logbottle;
             rows[j] = {"id": (j+1).toString(), "time": Data[i].Logtime.toString(),"bottle":Data[i].Logbottle.toString(),"name":Data[i].Username.toString()};
             j++;
             SUM += B;
             Total = SUM;
         }

         if(SUM == 0){
             alert("USER  " + NAME + "  ARE NOT USE DEVICE!!");
             $('#Prev').show();
         }

         Object.keys(Data).map(function (key) {
             $('.D_Table').append('<tr>' +
                 '<td>' + ++num +'</td>' +
                 '<td>' + Data[key].Logtime +'</td>' +
                 '<td>' + Data[key].Logbottle +'</td>' +
                 '</tr>')
         });
          $("#Sum").text("Total " + SUM + " Bottles");
         SUM = 0;
         j = 0;
         Data = [];
     });
 }
 function Export(){
     console.log("EXPORT");
     $('#Prev').show();
     var columns = [
         {title: "ID", dataKey: "id"},
         {title: "TIME", dataKey: "time"},
         {title: "BOTTLE", dataKey: "bottle"},
         {title: "NAME", dataKey: "name"},
     ];
     // Only pt supported (not mm or in)
     var doc = new jsPDF('p', 'pt','a4');
     doc.autoTable(columns, rows,
         {
             // styles: {fillColor: [100, 255, 255]},
             // columnStyles: {
             //     id: {fillColor: 255}
             // },
             margin: {top: 60 , bottom: 100},
             addPageContent: function(data) {
                 doc.text("Export Data", 40, 30);
                 doc.text("BY SmartBin4GreenU", 60, 50);
             },

         });
     doc.text("Total Bottle : " + Total ,430 ,760 );
     doc.save('SmartBin4GreenU_Report.pdf');
     Total = 0;
     setTimeout(3000);

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
         SBNumber: "SB1",
         StatusDevice: parseInt(0),
         Uid: Uid
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
                // console.log(date.toString().substr(0, 24));
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