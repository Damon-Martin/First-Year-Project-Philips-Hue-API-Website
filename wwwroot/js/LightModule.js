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

export class Lights {
    constructor(url) {
        //all light bulbs
        this.url = url;
        if (this.url.slice(-1) != "/" && this.url.length != 0) {
            this.url += "/";
        }

        //default is all light bulbs url
        //string handling will select the lightbulb desired
        this.selectedLightsURL = url;

        //lists will hold the object of the grabbed JSON Data needed to POST to SERVER via API
        //this.selectedLightsState = {};
        //this.all_Lights_State = {};

        //variables initialized and be used for later
        this.lightNumber = 1; //default is lightbulb 1 but can be changed

        //This Section will be default coulour values for the HUE API to output
        this.colourHueRed = 1; //red
        this.colourHueAmber = 12750; //orange/amber
        this.colourHueGreen = 27306; //green

    }
    //Must be Run to initialize the lights
    get_All_Light_States() {
        //Essentially a HTTP get command and stores passed data into an object or returns an error
        var httpRequest = new XMLHttpRequest();
        httpRequest.open("GET", this.url, true);
        httpRequest.onload = function (e) {
            if (httpRequest.readyState === 4) {
                if (httpRequest.status === 200) {
                    this.all_Lights_State = JSON.parse(httpRequest.responseText);
                    console.log(this.all_Lights_State);
                }
                else {
                    console.error(httpRequest.statusText);
                }
            }
        };

        httpRequest.onerror = function (e) {
            console.error("Error: " + httpRequest.statusText);
        };

        httpRequest.send(null);

    }


    //@Param 
    //lightnumber = [integer] the light to be changed
    //colour = [string] this will hold red, amber or green or they can ignore optional paramater and have no colour
    //to call turn_On_Selected_Light_State(lightNumber,colour) or turn_On_Selected_Light_State(lightNumber) are both acceptable
    turn_On_Selected_Light_State(lightNumber, colour) {

        //IP_ADDRESS/lights/*LIGHTNUMBER*/state/
        this.selectedLightsURL = this.url + lightNumber + "/state";

        var httpRequest = new XMLHttpRequest();
        httpRequest.open("PUT", this.selectedLightsURL);

        httpRequest.setRequestHeader("Content-Type", "application/json");

        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === 4) {
                console.log(httpRequest.status);
                console.log(httpRequest.responseText);
            }
        };


        //Selecting colour
        if (colour == "red") {
            var data = JSON.stringify({ "on": true, "hue": this.colourHueRed, "bri": 255 });
            httpRequest.send(data);
        }

        else if (colour == "amber") {
            var data = JSON.stringify({ "on": true, "hue": this.colourHueAmber, "bri": 255  });
            httpRequest.send(data);
        }
        else if (colour == "green") {
            var data = JSON.stringify({ "on": true, "hue": this.colourHueGreen, "bri": 255  });
            httpRequest.send(data);
        }
        else {
            //If the user doesn't care about the colur of the lightbulb they can ignore the colour param or enter gibirish and it will just turn on
            var data = JSON.stringify({ "on": true });
            httpRequest.send(data);
        }



    }

    turn_Off_Selected_Light_State(lightNumber) {

        //IP_ADDRESS/lights/*LIGHTNUMBER*/state/
        this.selectedLightsURL = this.url + lightNumber + "/state";

        var httpRequest = new XMLHttpRequest();
        httpRequest.open("PUT", this.selectedLightsURL);

        httpRequest.setRequestHeader("Content-Type", "application/json");

        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === 4) {
                console.log(httpRequest.status);
                console.log(httpRequest.responseText);
            }
        };

        var data = JSON.stringify({ "on": false });

        httpRequest.send(data);

    }

    turn_On_All_Lights(colour) {
        //Essentially just the turn on function with the iteration as the light state
        for (let i = 1; i <= 6; i++) {
            //IP_ADDRESS/lights/*LIGHTNUMBER(iteration)*/state/
            this.selectedLightsURL = this.url + i + "/state";

            var httpRequest = new XMLHttpRequest();
            httpRequest.open("PUT", this.selectedLightsURL);

            httpRequest.setRequestHeader("Content-Type", "application/json");

            httpRequest.onreadystatechange = function () {
                if (httpRequest.readyState === 4) {
                    console.log(httpRequest.status);
                    console.log("All Lights Turned on!");
                }
            };


            //Selecting colour
            if (colour == "red") {
                var data = JSON.stringify({ "on": true, "hue": this.colourHueRed });
                httpRequest.send(data);
            }

            else if (colour == "amber") {
                var data = JSON.stringify({ "on": true, "hue": this.colourHueAmber });
                httpRequest.send(data);
            }
            else if (colour == "green") {
                var data = JSON.stringify({ "on": true, "hue": this.colourHueGreen });
                httpRequest.send(data);
            }
            else {
                //If the user doesn't care about the colur of the lightbulb they can ignore the colour param or enter gibirish and it will just turn on
                var data = JSON.stringify({ "on": true });
                httpRequest.send(data);
            }


        }
    }

    turn_Off_All_Lights() {
        //Essentially just the turn off function with the iteration as the light state
        for (let i = 1; i <= 6; i++) {
            //IP_ADDRESS/lights/*LIGHTNUMBER*/state/
            this.selectedLightsURL = this.url + i + "/state";

            var httpRequest = new XMLHttpRequest();
            httpRequest.open("PUT", this.selectedLightsURL);

            httpRequest.setRequestHeader("Content-Type", "application/json");

            httpRequest.onreadystatechange = function () {
                if (httpRequest.readyState === 4) {
                    console.log(httpRequest.status);
                    console.log("All Lights Turned Off");
                }
            };

            var data = JSON.stringify({ "on": false });

            httpRequest.send(data);
        }
    }

}