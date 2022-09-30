# Hue Time-Managment Project
First Year Project - Student ID: 10729705

<h2>Project Description</h2>
<b>This Single-Paged Application will calculate your time-managment by entering your activities from your current schedual using a form and tell you if it is good, ok or bad using a Hue Light Bulb and changing the Background to Red, Amber or Green using a Traffic Light System. The User can Save their progress and Load their progress even if the browser closed from a previous session using a JSON file layedout in the specification. The Single Paged Application will Calculate your Time-Managment Score and Level and represent your activity specifics dynamically in a table.</b>

<h2>Technologies Used: REQ = Requirements | FUNC = Functionality Only| OPT = Optional/Advanced Functionality</h2> 

<p float="left">
  <img src="https://user-images.githubusercontent.com/91668778/165806656-22d00c8d-8b2c-4189-9274-978398d9d270.png" width ="64"/>
  <img src="https://user-images.githubusercontent.com/91668778/165801401-650e1751-edfe-421a-9937-06c476441a10.png"/>
  <img src="https://user-images.githubusercontent.com/91668778/165805620-58cbf447-f34b-4be6-86ca-accb3ee88242.png" width ="64"/>
</p>

• JQUERY (REQ)- Used for AJAX capabilities used to create my Single Paged Application </br>
• XHR API (REQ)- Used to Communicate with the Hue Lightbulb </br>
• localStorage API (REQ)- Used for Saving System. The User can close the browser and reload all previous activities if desired. </br>
• sessionStorage API (FUNC) - This is used for the Current Session Only. I used this as a way for different DIVs to communicate.</br>
• innerHTML - Dynamic Table Loading using Native JS </br>
• javaScript Native CSS modification - Changing Backgrounds Etc... Dynamically if good, ok or bad </br>

<h2>Features</h2>
• Hue Lights Turning on Depending on If Your Time-Managment is Good </br>
• Background Changes Colour to Red, Amber or green from Purple (initial state)
<p float="left">
  <img src="https://user-images.githubusercontent.com/91668778/165815344-00015b97-afa9-4747-95f0-7e0aa49edca4.png" width ="240"/>
  <img src="https://user-images.githubusercontent.com/91668778/165815927-b307452e-f613-4e9e-9ffe-bd1841e79d3f.png" width ="240"/>
  <img src="https://user-images.githubusercontent.com/91668778/165815572-e6466e01-1013-4846-bc49-638a444a7a67.png" width ="240"/>
  <img src="https://user-images.githubusercontent.com/91668778/165816457-928ca97a-0b24-4aaa-8ad6-e04178cb2042.png" width ="240"/>
</p>
• Saved data loaded in or Current Activity added via form Dynamically Loads in Table
<img src="https://user-images.githubusercontent.com/91668778/165817080-97a1c7d1-c00f-4d83-abef-6d0aa015e171.png" width ="240"/>

• User Activity and Data Calculated Saved and Stored into localStorage 
(Note: I was informed we could add data entries as long as the key JSON in Req is there and kept their data type. Which I had met it's requirement.
<p float="left">
  <img src="https://user-images.githubusercontent.com/91668778/165817434-66416138-3b54-4588-9ac7-1cdda70a3259.png" width ="800"/>
</p>

<h2>Features To Come/Further Improvements</h2>
• Further Data Analysis using tools to Graphically graph user Time-Managment such as Pie Charts
• Improvement Suggestions - Using Statistics such as regression or even further Artificial Intelligence studying the Users Activity



<h3>References & Useful Resources</h3>
</br>
Commons.wikimedia.org. 2022. File:JavaScript-logo.png - Wikimedia Commons. [online] Available at: <https://commons.wikimedia.org/wiki/File:JavaScript-logo.png> [Accessed 28 April 2022].</br>
Commons.wikimedia.org. 2022. File:CSS3 logo.svg - Wikimedia Commons. [online] Available at: <https://commons.wikimedia.org/wiki/File:CSS3_logo.svg> [Accessed 28 April 2022].</br>
Commons.wikimedia.org. 2022. File:HTML5 logo and wordmark.svg - Wikimedia Commons. [online] Available at: <https://commons.wikimedia.org/wiki/File:HTML5_logo_and_wordmark.svg> [Accessed 28 April 2022].
