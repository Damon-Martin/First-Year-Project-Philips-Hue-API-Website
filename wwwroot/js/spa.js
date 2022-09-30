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

$(document).ready(function () {

    $('#indexPanel').click(function () {
        $('#rightContentPannel').load('indexPanel.html');
    });

    $('#information').click(function () {
        $('#rightContentPannel').load('information.html');
    });

    $('#stats').click(function () {
        $('#rightContentPannel').load('stats.html');
    });

    $('#improvements').click(function () {
        $('#rightContentPannel').load('improvements.html');
    });

    $('#GDPR').click(function () {
        $('#rightContentPannel').load('GdprPolicy.html');
    });
});
