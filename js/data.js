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


var Data = [];
var rows = [];
var j =0;
var Total = 0;

Getdata =  function (){
    var ref = firebase.database().ref("/History");
    ref.orderByKey().on("value", function(snapshot) {

    // database.ref("/History").once('value', function(snapshot){
    //     console.log(snapshot.key ,snapshot.val());
            if(snapshot.exists()){
            var content = '';
            var Sum_text = '';
                    snapshot.forEach(function(data){
                        var Val = data.val();
                        var User = Val.UID;
                        var Bottle = Val.Logbottle;

                        if(Uid == User){
                            if( Val.Logbottle != 0){
                                // console.log(data.key ,data.val());
                                Data.push(Val)

                                // console.log(Val)

                                // console.log(Data[0])
                                // console.log(Data.length)
                                // console.log(Val)
                                //     num = num+1;
                                //     SUM += Bottle;
                                //      content += '<tr>';
                                //      content += '<td>' +  num + '</td>';
                                //      content += '<td>' + Val.Logtime + '</td>';
                                //      content += '<td>' + Val.Logbottle + '</td>';
                                //      content += '</tr>';



                            }
                        }
                    });
                 Data.reverse()
                 // console.log(Data)
                for (i in Data)
                {
                       var B = Data[i].Logbottle
                       // console.log( i ,Data[i])
                        num = num+1;
                         rows[j] = {"id": (j+1).toString(), "time": Data[i].Logtime.toString(),"bottle":Data[i].Logbottle.toString()};
                         j++;
                        SUM += B;
                        Total = SUM;
                         content += '<tr>';
                             content += '<td>' +  num + '</td>';
                             content += '<td>' + Data[i].Logtime + '</td>';
                             content += '<td>' + Data[i].Logbottle + '</td>';
                         content += '</tr>';
                }

                 // console.log("Sum :" + SUM)
                 //
                 // console.log("Total :"+ Total)

                if(SUM == 0){
                    alert("You should put the bottle before!!!");
                }
            num = 0
                j = 0
            $('#ex-table').append(content);
        }

        document.getElementById("Summary").innerHTML = "Total " + SUM + " Bottles";
        SUM = 0;

    });


};


window.addEventListener('load', function() {
    Getdata()
});


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
        // console.log(snapshot.key,snapshot.val());
        if(snapshot.exists()){
            snapshot.forEach(function(data){
                var val = data.val();
                var User_ID = val.Uid;
                var Time = val.Time;

                // console.log(val.Uid.toString() , val.Time.toString());
                // var Bottle = val.Logbottle;
                if(Uid ==  User_ID ) {
                    // max++;
                    if (Time != null) {
                        document.getElementById("Time").innerHTML = Time.toString();
                        //
                        // var ref = firebase.database().ref("Log");
                        // ref.orderByChild("Time").equalTo( Time.toString().substr(4,6)).on("child_added", function(snapshot) {
                        //     console.log(snapshot.key,snapshot.val());
                        //     // console.log(snapshot.length());
                        // });
                    }
                }
            });
            // max = 0;
        }

    });


}


function Export(){
    var columns = [
        {title: "ID", dataKey: "id"},
        {title: "TIME", dataKey: "time"},
        {title: "BOTTLE", dataKey: "bottle"},
        ];
    // var rows = [{"id": 1, "name": "Shaw", "country": "Tanzania", },
    //     {"id": 2, "name": "Nelson", "country": "Kazakhstan", },
    //     {"id": 3, "name": "Garcia", "country": "Madagascar", },
    //     ];

// Only pt supported (not mm or in)
    var doc = new jsPDF('p', 'pt');
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
}