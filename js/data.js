var config = {
    apiKey: "AIzaSyB5J3z8FirEN4HskBoM1fqsj6vkdTATG9g",
    authDomain: "sb-fgu.firebaseapp.com",
    databaseURL: "https://sb-fgu.firebaseio.com",
    projectId: "sb-fgu",
    storageBucket: "sb-fgu.appspot.com",
    messagingSenderId: "368024117056"
};
firebase.initializeApp(config);


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

var database = firebase.database();

var SUM = 0;
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
        Uid = uid;
    }

}, function(error) {
    console.log(error);
    alert("Some Thing Worng! please login agian");
});

var ref3 = firebase.database().ref('users/');
ref3.on("value", function(snapshot) {
    snapshot.forEach(function(data){
        var Val = data.val();
        var User = Val.uid;
        if(Uid == User){
            $("#Name").text("Hi : " + Val.Defualt_Username);
            if (Val.status === "DISABLE"){
               $("#Table").hide()
               $("#Status_Bar").show()
                alert("Some Thing Worng! please Sign in agian");
                console.log("DISABLE");
                // console.log(User + "  " + Val.status );
            }
            else if(Val.status === "ENABLE"){
                $("#Status_Bar").hide()
                $("#Table").show()
                Status_Access();
                // location.reload();
                console.log("ENABLE");
                // console.log(User + "  " + Val.status );

            }
        }

    });
});

function Signout() {
    firebase.auth().signOut().then(function() {
            console.log('Signed Out');
            alert('Signed Out');
            window.location.href = "index.html";
        },
        function(error) {
            console.error('Sign Out Error', error);
        });

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
}

$(document).ready(function () {
    $('#dataUpSuccess').hide();
    $("#Status_Bar").hide()
    $("#Table").hide()
});

var Data =[];
var rows = [];
var j =0;
var Total = 0;

function Status_Access() {
    var ref = firebase.database().ref('History/');
    ref.on("value", function(snapshot) {
        var Val = snapshot.val();
        var num = 0;
        snapshot.forEach(function(data){
            var Val = data.val();
            var User = Val.UID;
            var Bottle = Val.Logbottle;
            if(Uid == User){
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
            rows[j] = {"id": (j+1).toString(), "time": Data[i].Logtime.toString(),"bottle":Data[i].Logbottle.toString()};
            j++;
            SUM += B;
            Total = SUM;
        }

        if(SUM == 0){
            alert("You should put the bottle before!!!");
        }

        Object.keys(Data).map(function (key) {
            $('tbody').append('<tr>' +
                '<td>' + ++num +'</td>' +
                '<td>' + Data[key].Logtime +'</td>' +
                '<td>' + Data[key].Logbottle +'</td>' +
                '</tr>')
        });
        $("#Summary").text("Total " + SUM + " Bottles");
        SUM = 0;
        j = 0;
        Data = [];
    });
}


function InsertAgain(){
    firebase.database().ref('LogUser/CodeGen/').child('AuthenCode').set({
        Status : parseInt(1)
    });
    firebase.database().ref('LogUser/CodeGen/').child('Repush_state').set({
        Repush : parseInt(1)
    });
    firebase.database().ref('LogUser/').child('Lasted').set({
        Uid : Uid,
        SBNumber: "SB1",
        StatusDevice: parseInt(1)
    });
}

Get_time = function() {
    var ref = firebase.database().ref("Log/Time");
    ref.orderByKey().limitToFirst(100).on("value", function(snapshot) {
        if(snapshot.exists()){
            snapshot.forEach(function(data){
                var val = data.val();
                var User_ID = val.Uid;
                var Time = val.Time;
                if(Uid ==  User_ID ) {
                    // max++;
                    if (Time != null) {
                        document.getElementById("Time").innerHTML = Time.toString();
                    }
                }
            });
        }
    });
}

function Export(){
    var columns = [
        {title: "ID", dataKey: "id"},
        {title: "TIME", dataKey: "time"},
        {title: "BOTTLE", dataKey: "bottle"},
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
        }
    });
    doc.text("Total Bottle : " + Total ,430 ,760 );
    doc.save('SmartBin4GreenU_Report.pdf');
    Total = 0;
}

$(document).ready(function(){

    var element = $("#html-content-holder"); // global variable
    var getCanvas; // global variable

    $("#btn-Preview-Image").on('click', function () {
        html2canvas(element, {
            onrendered: function (canvas) {
                $("#previewImage").append(canvas);
                getCanvas = canvas;
            }
        });
    });

    $("#btn-Convert-Html2Image").on('click', function () {
        var imgageData = getCanvas.toDataURL("image/png");
        // Now browser starts downloading it instead of just showing it
        var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");
        $("#btn-Convert-Html2Image").attr("download", "your_pic_name.png").attr("href", newData);
        console.log(newData)
    });

});

