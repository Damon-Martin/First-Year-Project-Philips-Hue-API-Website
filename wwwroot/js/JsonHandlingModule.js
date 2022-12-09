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

import * as HueLightsModule from '/js/LightModule.js';

//This can be used in the JSON Handling class via aggregation
let Light = new HueLightsModule.Lights("http://192.168.0.50/api/stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz/lights");
    /// How to call the Light Functions ///
        //Light.get_All_Light_States();
        //Light.get_Selected_Light_State(1);
        //Light.turn_On_Selected_Light_State(1);
        //Light.turn_On_Selected_Light_State(1,"green");
        //Light.turn_Off_Selected_Light_State(1);
        //Light.turn_On_All_Lights();
        //Light.get_All_Light_States();
        //Light.turn_Off_All_Lights();


export class JSON_Handling {

    constructor(jsonFileName) {
        this.jsonFileName = jsonFileName;
        this.activities = [];

        //initiallizing default JSON format for my project

        //Default all values will be modifide
        this.currentJsonObject = {
            "Username": "Shirley",
            "Application": "Time-managment: Lighting Project",
            "Score": 3,
            "Level": 1,
            "desiredStartTime": null,
            "desiredEndTime": null,
            "actualStartTime": null,
            "actualEndTime": null
        };
    }

    //**********************************************************************key functions*******************************************************************//
    //Note scoreResult and levelResult will have been calculated in the Information Class
    addCurrentActivityToCurrentJsonObjectToCalculate(usernameInput, appName, desiredStartTimeInput, desiredEndTimeInput, actualStartTimeInput, actualEndTimeInput) {
        if (usernameInput == "" || appName == "" || desiredEndTimeInput == "" || desiredStartTimeInput == "" || actualStartTimeInput == "" || actualEndTimeInput == "") {
            alert("Error: Missing Attribute in Adding Current Activity");
        }
        else {

            this.currentJsonObject = {
                "Username": usernameInput,
                "Application": appName,
                //These three values will be calculated and turned into integers
                "PlayMins": null,
                "Score": null,
                "Level": null,
                "desiredStartTime": desiredStartTimeInput,
                "desiredEndTime": desiredEndTimeInput,
                "actualStartTime": actualStartTimeInput,
                "actualEndTime": actualEndTimeInput,
                //To be Calculated Later
                "expectedDuration": null,
                "actualDuration": null,
                "Rating": null
            };
            //Now adding the object to the array
            this.activities.push(this.currentJsonObject);

            //calculating the score
            this.#calculateScore();

            //Change Lightbulb
            this.#TurnTrafficLightsOn();

            //Stored into Session Storage for the Other pages to use the live data (note add a refresh for usability in the other pages)
            sessionStorage.setItem('previousActivities', JSON.stringify(this.activities));
        }
    }

    ///*#Private Functions Section - Encapsulating the innerworkings to make it simpler for the user*///

    //Calculate Score & Level Function (Score rated from <30 Bad. 30-60 ok. 60-100 good) and append it to all items in the array
        //Calculate Level (Using the Score) (score put into a 1-10 format using score using rounding eg score 75 will be 8) --> This will be returned and used to output the Lightbulb
    #calculateScore() {
        let level = 0
        let score = 0;

        let actual_duration = 0;
        let expected_duration = 0;
        let timeDifferenceScore = 0; //worth 40% of Score
        let minMaxScore = 0; //worth 60% of Score
        //Adressing the specific variable of each 
        for (let i = 0; i < this.activities.length; i++) {

            //Durations for each current iterations calculated
            actual_duration = this.#calculateActualDuration(i);
            expected_duration = this.#calculateExpectedDuration(i);

            //Key notes of this Calculation - Both these Calculations will be used to create the score
            //Weightings 70% for calculation 1 and 30% for calculation 2 - (Percentage will be turned into score out of 100 eg 90% will be 90)
            timeDifferenceScore = this.#timeDifferenceScoreCalculation(i);
            minMaxScore = this.#minMaxPercentageCalculation(i);
            score = timeDifferenceScore + minMaxScore;
            
            //assigning to score
            this.activities[i].Score = score;

            //Integer Divide by 10 to calculate level
            level = Math.floor(score / 10);
            this.activities[i].Level = level;

            //Storing Actual Duration as 'PlayMins' - Ensuring to match Requirements and it come handy later
            this.activities[i].PlayMins = actual_duration;
            this.activities[i].expectedDuration = expected_duration;
            this.activities[i].actualDuration = actual_duration;

            if (score >= 70) {
                this.activities[i].Rating = "Good";
            }
            else if (score >= 35) {
                this.activities[i].Rating = "Ok";
            }
            else {
                this.activities[i].Rating = "Bad";
            }

            //Testing Purposes viewing data written to score
            console.log("Item [" + i + "] Application: " + this.activities[i].Application + ", PlayMins: " + this.activities[i].PlayMins + ", Score: " + this.activities[i].Score + ", Level: " + this.activities[i].Level);

        }
        console.log(this.activities);
    }
    //Calculate Durations Functions (Basically using the time inputs we will calculate the time taken to complete)
    #calculateActualDuration(i) {
        //values in integers as minutes
        //We will compare the expected timemanagment to the real time

        let temp_hours = 0;
        let temp_minutes = 0;

        //We need to essentially calculate the duration so endTIme - startTime
        let total_Mins_In_Day_Until_Start = 0; //Basically Converts how many minutes there were up to that point in the day
        let total_Mins_In_Day_Until_End = 0;

        //Start time in Minutes - Essentually how many minutes in the day up to that point
        //Turning Input into minutes
        //We will turn hours into minutes and add it to minutes
        temp_hours = parseInt(this.activities[i].actualStartTime[0] + this.activities[i].actualStartTime[1]);
        temp_minutes = parseInt(this.activities[i].actualStartTime[3] + this.activities[i].actualStartTime[4]);

        total_Mins_In_Day_Until_Start = (temp_hours * 60) + temp_minutes;

        //Start time in Hours - Essentually how many minutes in the day up to that point
        temp_hours = parseInt(this.activities[i].actualEndTime[0] + this.activities[i].actualEndTime[1]);
        temp_minutes = parseInt(this.activities[i].actualEndTime[3] + this.activities[i].actualEndTime[4]);
        total_Mins_In_Day_Until_End = (temp_hours * 60) + temp_minutes;

        return ((total_Mins_In_Day_Until_End) - (total_Mins_In_Day_Until_Start))

    }
    #calculateExpectedDuration(i) {
        //values in integers as minutes
        //We will compare the expected timemanagment to the real time

        let temp_hours = 0;
        let temp_minutes = 0;

        //We need to essentially calculate the duration so endTIme - startTime
        let total_Mins_In_Day_Until_Start = 0; //Basically Converts how many minutes there were up to that point in the day
        let total_Mins_In_Day_Until_End = 0;

        //Start time in Minutes - Essentually how many minutes in the day up to that point
        //Turning Input into minutes
        //We will turn hours into minutes and add it to minutes
        temp_hours = parseInt(this.activities[i].desiredStartTime[0] + this.activities[i].desiredStartTime[1]);
        temp_minutes = parseInt(this.activities[i].desiredStartTime[3] + this.activities[i].desiredStartTime[4]);

        total_Mins_In_Day_Until_Start = (temp_hours * 60) + temp_minutes;

        //Start time in Hours - Essentually how many minutes in the day up to that point
        temp_hours = parseInt(this.activities[i].desiredEndTime[0] + this.activities[i].desiredEndTime[1]);
        temp_minutes = parseInt(this.activities[i].desiredEndTime[3] + this.activities[i].desiredEndTime[4]);
        total_Mins_In_Day_Until_End = (temp_hours * 60) + temp_minutes;

        return ((total_Mins_In_Day_Until_End) - (total_Mins_In_Day_Until_Start))

    }

    //Adjustment this is now worth 70%
    //Initially isUserTimeManagmentGood() was planned however I decided to decompose that problem into two sub-problems to be easier
    //I will keep this function private as only things within the class needs to calculate the score
    #timeDifferenceScoreCalculation(i) {
        let score = 0;
        //1. We need to Calculate Time Difference of the expected START and actual START (not start and end) like the duration calculations - 20%

        let actualStartTimeInMins = 0;
        let expectedStartTimeInMins = 0;

        //Start Difference

        //calculating Actual
        let temp_hours = parseInt(this.activities[i].actualStartTime[0] + this.activities[i].actualStartTime[1]);
        let temp_minutes = parseInt(this.activities[i].actualStartTime[3] + this.activities[i].actualStartTime[4]);
        actualStartTimeInMins = (temp_hours * 60) + temp_minutes;
        //calculating Expected
        temp_hours = parseInt(this.activities[i].desiredStartTime[0] + this.activities[i].desiredStartTime[1]);
        temp_minutes = parseInt(this.activities[i].desiredStartTime[3] + this.activities[i].desiredStartTime[4]);
        expectedStartTimeInMins = (temp_hours * 60) + temp_minutes;
        // x = ExpectedTimeMins - ActualTimeMins
        let startTimeDifference = expectedStartTimeInMins - actualStartTimeInMins

        //End Difference
        let actualEndTimeInMins = 0;
        let expectedEndTimeInMins = 0;

        //calculating Actual End
        temp_hours = parseInt(this.activities[i].actualEndTime[0] + this.activities[i].actualEndTime[1]);
        temp_minutes = parseInt(this.activities[i].actualEndTime[3] + this.activities[i].actualEndTime[4]);
        actualEndTimeInMins = (temp_hours * 60) + temp_minutes;
        //calculating Expected End
        temp_hours = parseInt(this.activities[i].desiredEndTime[0] + this.activities[i].desiredEndTime[1]);
        temp_minutes = parseInt(this.activities[i].desiredEndTime[3] + this.activities[i].desiredEndTime[4]);
        expectedEndTimeInMins = (temp_hours * 60) + temp_minutes;
        // x = ExpectedTimeMins - ActualTimeMins
        let endTimeDifference = actualEndTimeInMins - expectedEndTimeInMins



        //3. Logic - Then we must decide what is good, ok or bad using endTimeDifference and startTimeDifference
        //The time diff is the same so we might as well make it positive so if -10 --> 10 (Conversion as it makes life easier)
        //Turning Negative Duration into a Positive Number
        if (startTimeDifference < 0) {
            startTimeDifference = startTimeDifference * -1;
        }
        else if (endTimeDifference < 0) {
            endTimeDifference = endTimeDifference * -1;
        }
        //Testing
        //console.log("Time Difference of Expected and Actual End: " + endTimeDifference + " mins");
        //console.log("Time Difference of Expected and Actual Start: " + startTimeDifference + " mins");

        //I decided with time-constraints if the time difference from the expected is over 60mins = RED, 30mins = AMBER, 10mins ok
        //note the time diff could be both positive or negative but it doesnt matter

        //half
        //Score Calculation for End
        if (endTimeDifference <= 10) {
            score += 35;
        }
        else if (endTimeDifference <= 30) {
            score += 18;
        }
        else {
            score += 0;
        }

        //half
        //Score Calculation for Start ---> Both = 40
        if (startTimeDifference <= 10) {
            score += 35;
        }
        else if (startTimeDifference <= 30) {
            score += 18;
        }
        else {
            score += 0;
        }
        //I will return 5% Bad, 50% ok and 100% if good out of 30%. So 100% will be 40
        return (score);
    }

    //Made an Ajustment this is worth only 30%
    #minMaxPercentageCalculation(i) {
        //This will look at the duration of the expected and the actual
        //Then it will see if it went over the min percentage and max acceptable
        let score = 0;
        //Plan - Return a score out of 30
        //If (x < min) Then
            //It is good - score = 30
        //Else if (min < x < max) Then
            //It is ok but not great - score = 15
        //Else (this also is a way of handling any bad inputs if the protections fail)
            //Bad - score = 0
        let actual_duration = this.#calculateActualDuration(i);
        let expected_duration = this.#calculateExpectedDuration(i);

        //now we need to get the min and max from the inputs
        let maxPercentage = document.getElementById('max_diff').value;
        let minPercentage = document.getElementById('min_diff').value;
        minPercentage = 1 + minPercentage / 100;
        maxPercentage = 1 + maxPercentage / 100; //turning into decimal and we will need to do 1 - maxPercentage to get a multiplier like 0.95 to check both highs and lows

        //The order is a bit wierd but totally functional
        if (actual_duration <= expected_duration * minPercentage) {
            //Good
            score = 30;
        }
        else if (actual_duration >= expected_duration * maxPercentage) {
            //Bad
            score = 0;
        }
        else {
            //Ok
            score = 15;
        }

        return (score);
    }


    //************************This Section is to make the product functional and is more straight forward*****************************//

    //This Function will loop throught the Levels and judge if they are good, ok, bad and output to the Hue LightBulb via Agrigation
    #TurnTrafficLightsOn() {
        let avgScore = 0; 
        for (let i = 0; i < this.activities.length; i++) {
            avgScore += this.activities[i].Score;
        }
        avgScore = Math.floor(avgScore / this.activities.length);
        //I'm thinking anything equal/greater 7 is Good
        //Below 4 Bad and In between is Ok
        if (avgScore >= 70) {
            console.log("The Average of all Items is Good: ( x >= 70) : " + avgScore);

            //Changing the Body for Visual Feedback
            document.getElementById("header").style.background = "rgb(5,21,0)";
            document.getElementById("header").style.background = "radial-gradient(circle, rgba(5,21,0,1) 0%, rgba(9,53,8,1) 35%)";
            document.body.style.background = "rgb(27,107,0)";
            document.body.style.background = "radial-gradient(circle, rgba(27,107,0,1) 0%, rgba(1,66,1,1) 35%)";

            //Changing Lightbulb to Green
            Light.turn_On_All_Lights("green");

        }
        else if (avgScore >= 35) {
            console.log("The Average of all Items is Ok ( 70 > x >= 35) : " + avgScore);

            //Changing the Body for Visual Feedback
            document.getElementById("header").style.background = "rgb(78,33,2)";
            document.getElementById("header").style.background = "radial-gradient(circle, rgba(78,33,2,1) 0%, rgba(152,61,0,1) 35%)"
            document.body.style.background = "rgb(152,61,0)";
            document.body.style.background = "radial-gradient(circle, rgba(152,61,0,1) 0%, rgba(193,97,18,1) 35%)";

            //Changing the Lightbulb to Amber
            Light.turn_On_All_Lights("amber");
        }
        else { //Usually Bad is 30 or 0
            console.log("The Average of all Items is Bad:( 70 > 35 >= x) : " + avgScore);

            //Changing the Body for Visual Feedback
            document.getElementById("header").style.background = "rgb(114,26,26)"
            document.getElementById("header").style.background = "radial-gradient(circle, rgba(114,26,26,1) 0%, rgba(69,15,15,1) 35%)";
            document.body.style.background = "rgb(174,0,0)";
            document.body.style.background = "radial-gradient(circle, rgba(174,0,0,1) 0%, rgba(114,26,26,1) 35%)";

            //Changing Lightbulb to Red
            Light.turn_On_All_Lights("red");
        }
    }





    //This completly wipes all current and previous progress
    buttonNewPressed() {
        alert("Previous Activities have been cleared")
        this.activities = [];
        sessionStorage.setItem("previousActivities", JSON.stringify(this.activities));
        //Change Screen back to purple (Optional)
        document.getElementById("header").style.background = "rgb(31,14,67)";
        document.getElementById("header").style.background = "radial-gradient(circle, rgba(31,14,67,1) 0%, rgba(124,29,152,1) 100%)";
        document.body.style.background = "rgb(47,14,70)";
        document.body.style.background = "radial-gradient(circle, rgba(47,14,70,1) 2%, rgba(8,8,37,1) 100%);";
        //Turn Off all Lights
        Light.turn_Off_All_Lights();
        console.log(this.activities);

    }
    //This saves the activities to local storage
    buttonSavePressed() {
        alert("Your Activity has been saved")

        if (this.activities != 0) {
            localStorage.setItem('previousActivities', JSON.stringify(this.activities));
            alert("Saved");
        }
        else {
            alert("Error: The activity list is empty");
        }

    }
    //This loads the local storage if the user opens the page or refreshes
    buttonLoadPressed() {
        alert("Your Activities have been Loaded")
        this.activities = JSON.parse(localStorage.getItem("previousActivities"));
        sessionStorage.setItem("previousActivities", JSON.stringify(this.activities));

        this.#TurnTrafficLightsOn();
        console.log(this.activities);
    }
    changeUsername(new_username) {
        for (let i = 0; i < this.activities.length; i++) {
            this.activities[i].Username = new_username;
            sessionStorage.setItem("previousActivities", JSON.stringify(this.activities));
        }
        console.log("Username Changed in Session Storage for Live Session for diff divs to communicate");
    }
    displayCurrentJsonObject() {
        console.log(this.currentJsonObject);
    }
    display_all_JSON() {
        console.log(this.activities);
    }

}
