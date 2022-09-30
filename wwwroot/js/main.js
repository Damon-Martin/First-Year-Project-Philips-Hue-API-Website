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

import * as JsonModule from '/js/JsonHandlingModule.js';

let jsonAndFiles = new JsonModule.JSON_Handling("TestFileName");

//global variables used when nessisary
let username = "Shirley"; //Default Value
document.getElementById("greetingUsername").innerHTML = "<h2>Welcome, " + username +"</h2>";

function saveButton() {
    //This will save the activities list to default to JSON and Local Storage
    //It will also save the minimum json requirements to JSON
    jsonAndFiles.buttonSavePressed();
}
function loadButton() {
    console.log("Load Button has been pressed");
    jsonAndFiles.buttonLoadPressed();
    //Change the Username - all usernames are the same
    username = jsonAndFiles.activities[0].Username;
    document.getElementById("greetingUsername").innerHTML = "<h2>Welcome, " + username + "</h2>";
}

function newButton() {
    //must clear local storage
    //must clear json to empty
    jsonAndFiles.buttonNewPressed();

}

function usernameChange(ev) {
    ev.preventDefault();
    username = document.getElementById('changeUsernameValue').value;
    document.getElementById("greetingUsername").innerHTML = "<h2>Welcome, " + username + "</h2>";

    jsonAndFiles.changeUsername(username);
}

function checkActualDuration() {
    let temp_hours = parseInt(document.getElementById('actual_start_time_id').value[0] + document.getElementById('actual_start_time_id').value[1]);
    let temp_minutes = parseInt(document.getElementById('actual_start_time_id').value[3] + document.getElementById('actual_start_time_id').value[4]);
    let total_Mins_In_Day_Until_Start = (temp_hours * 60) + temp_minutes;
    //Start time in Hours - Essentually how many minutes in the day up to that point
    temp_hours = parseInt(document.getElementById('actual_end_time_id').value[0] + document.getElementById('actual_end_time_id').value[1]);
    temp_minutes = parseInt(document.getElementById('actual_end_time_id').value[3] + document.getElementById('actual_end_time_id').value[4]);
    let total_Mins_In_Day_Until_End = (temp_hours * 60) + temp_minutes;

    return (total_Mins_In_Day_Until_End) - (total_Mins_In_Day_Until_Start)
}

function checkExpectedDuration() {
    let temp_hours = parseInt(document.getElementById('desired_start_time_id').value[0] + document.getElementById('desired_start_time_id').value[1]);
    let temp_minutes = parseInt(document.getElementById('desired_start_time_id').value[3] + document.getElementById('desired_start_time_id').value[4]);
    let total_Mins_In_Day_Until_Start = (temp_hours * 60) + temp_minutes;
    //Start time in Hours - Essentually how many minutes in the day up to that point
    temp_hours = parseInt(document.getElementById('desired_end_time_id').value[0] + document.getElementById('desired_end_time_id').value[1]);
    temp_minutes = parseInt(document.getElementById('desired_end_time_id').value[3] + document.getElementById('desired_end_time_id').value[4]);
    let total_Mins_In_Day_Until_End = (temp_hours * 60) + temp_minutes;

    return (total_Mins_In_Day_Until_End) - (total_Mins_In_Day_Until_Start)
}

function checkPercentageInput() {
    //checking if the input is an integer
    if (isNaN(parseInt(document.getElementById('max_diff').value))) {
        alert("Error: Only numbers are allowed for percentages")
        return false;
    }
    else if (parseInt(document.getElementById('max_diff').value) < 0) {
        alert("Error: Only Positive percentages Allowed")
        return false;
    }
    else if (parseInt(document.getElementById('min_diff').value) < 0) {
        alert("Error: Only Positive percentages Allowed")
        return false;
    }
    else if (isNaN(parseInt(document.getElementById('min_diff').value))) {
        alert("Error: Only numbers are allowed for percentages")
        return false;
    }
    //checking if max is greater than min
    else if (parseInt(document.getElementById('min_diff').value) > parseInt(document.getElementById('max_diff').value)) {
        alert("Error: max must be greater or equal to the min")
        return false;
    }
    else {
        return true;
    }
}

//do the scripts only when all elements in the DOM are fully loaded
document.addEventListener('DOMContentLoaded', () => {

    //Save button menu buttons when clicked
    document.getElementById("save").addEventListener("click", saveButton);
    document.getElementById("load").addEventListener("click", loadButton);
    document.getElementById("new").addEventListener("click", newButton);

    document.getElementById("changeUsernameBtn").addEventListener("click", usernameChange);


    //We will grab form data from the index when submit is pressed
    const addActivity = (ev) => {
        //Stops the form submitting
        ev.preventDefault();

        //(usernameInput, appName, desiredEndTimeInput, desiredStartTimeInput, actualStartTimeInput, actualEndTimeInput)

        //We need to essentially calculate the duration is not negative
        let real_duration = checkActualDuration();
        let expected_duration = checkExpectedDuration();
        //We also need to check if the percentages are not negative and is a number! These values will be sent using paramaters as an interface into the function of the JSON class when required
        let percentages_ok = checkPercentageInput();

        if (real_duration >= 0 && expected_duration >= 0 && percentages_ok == true && percentages_ok == true) {
            jsonAndFiles.addCurrentActivityToCurrentJsonObjectToCalculate(username, document.getElementById('activity_name_id').value, document.getElementById('desired_start_time_id').value, document.getElementById('desired_end_time_id').value, document.getElementById('actual_start_time_id').value, document.getElementById('actual_end_time_id').value);
            //Confirmation that Activity is added
            //jsonAndFiles.displayActivitiesJsonObjectToCalculate();

        }
        else if (real_duration < 0 || expected_duration < 0) {
            alert("Error: End Time should be greater than start time");
        }

        
        
    }

    document.getElementById("submitButtonPressed").addEventListener("click", addActivity);



    
});

