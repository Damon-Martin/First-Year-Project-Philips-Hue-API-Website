/*
 * Application: 'Time-managment: Lighting Project'
 * Student ID: 10729705
 *
 * This website is takes in activities the user enters in a form and then calculates how good they have been with the time-managment
 * This SPA application outputs to a Hue Lightbulb via an API using RESTFUL APIs
 * This Application stores JSON into the localStorage via the localStorage API in the set format layed out in the specification
 *
 * This project may use other APIs or libraries when dealing with the advanced feature set such as graphing APIs as planned to make pie charts etc...
 * Any tool I will be using will be refrenced here and in my documentation
 *
 */

function loadTable(sessionActivities) {
    //display in Div if the person is good
    document.getElementById("isGood").innerHTML = "<h2>Overall Time-managment: N/A</h2>";
    if (sessionActivities.length != 0 ){
        var good = calculateIsGood(sessionActivities);
        console.log(good);
        document.getElementById("isGood").innerHTML = "<h2>Overall Time-managment: " + good + "</h2>";

        //load in the table
        var tableBody = document.getElementById("infoTableBody");
        var dataInjectHTML = "";

        for (let i = 0; i < sessionActivities.length; i++) {
            dataInjectHTML += "<tr><td>" + sessionActivities[i].Username + "</td><td>" + sessionActivities[i].Application + "</td><td>" + sessionActivities[i].PlayMins + "</td><td>" + sessionActivities[i].Score + "</td><td>" + sessionActivities[i].Level + "</td><td>" + sessionActivities[i].desiredStartTime + "</td><td>" + sessionActivities[i].desiredEndTime + "</td><td>" + sessionActivities[i].actualStartTime + "</td><td>" + sessionActivities[i].actualEndTime + "</td><td>" + sessionActivities[i].expectedDuration + "</td><td>" + sessionActivities[i].actualDuration + "</td><td>" + sessionActivities[i].Rating+"</td></tr>";
        }
        tableBody.innerHTML = dataInjectHTML;
    }

    //lets use JS to add to the CSS by using class
    document.getElementById("tableCSS").style.border = "1px solid";
    document.getElementById("tableCSS").style.borderCollapse = "collapse";
    document.getElementById("tableCSS").style.width = "15%";

    document.getElementById("th1CSS").style.border = "1px solid";
    document.getElementById("th2CSS").style.border = "1px solid";
    document.getElementById("th3CSS").style.border = "1px solid";
    document.getElementById("th4CSS").style.border = "1px solid";
    document.getElementById("th5CSS").style.border = "1px solid";
    document.getElementById("th6CSS").style.border = "1px solid";
    document.getElementById("th7CSS").style.border = "1px solid";
    document.getElementById("th8CSS").style.border = "1px solid";
    document.getElementById("th9CSS").style.border = "1px solid";
    document.getElementById("th10CSS").style.border = "1px solid";
    document.getElementById("th11CSS").style.border = "1px solid";
    document.getElementById("th12CSS").style.border = "1px solid";
    

}
//This will cacluate if the person is good and then return a string 'good', 'ok', 'bad'
function calculateIsGood(sessionActivities) {
    var averageScore = 0;
    for (let i = 0; i < sessionActivities.length; i++) {
        averageScore += sessionActivities[i].Score;
    }
    averageScore = Math.floor(averageScore / sessionActivities.length);

    if (averageScore >= 70) {
        return ("Good");
    }
    else if (averageScore >= 35) {
        return ("Ok");
    }
    else {
        return ("Bad");
    }
}

console.log("InfoPage JS successfully loaded")
var sessionActivities = JSON.parse(sessionStorage.getItem("previousActivities"));
loadTable(sessionActivities);

