/** 
# Author .......: Baris Caglar
# Description ..: This script reads a CSV file, parses it into an array, automatically opens any links provided, and then closes everything.
# Version     ..: 1.0
# Exit Script ..: Ctrl + C
# Dependencies .: open, csv-parse, prompt-sync 
# Date .........: 25/2/2023
*/

// Install Requirement Packages
// npm install {package name}

/**
 * Add below code to tampermonkey
(function() {
    'use strict';
    documemt.querySelector("").click()  // define buttons action here
    setTimeout(closeWait, 3000);
    function closeWait(){
    console.log("closing window")
    window.close()
    }
})();
 
 */

let fileexit = false;
while (!fileexit) {
// sigint: true allows user to exit to program with Ctrl+C
let prompt = require('prompt-sync')({sigint: true});
var filename = prompt('Enter CSV filename: ');

// define the fs variable and assign it the fs object
var fs = require("fs");

    if (fs.existsSync(filename)) {
      //file exists
      fileexit = true;
    }else{
      console.log("File not exist")
    }
  }
// extract the parse method from the object returned by the require() method into the parse variable
const { parse } = require("csv-parse");

// call createReadStream() method from the fs module to read csv file
fs.createReadStream(filename)
    // delimiter comma and read from second line
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {

        let my_array = row
        const open = require('open');

        // get length of array
        let arrayLength = my_array.length;
        for (let i = 0; i < arrayLength; i++) {
        console.log(my_array[i]);
        //open("https://webaddress/"+my_array[i], '_blank', {app: 'google chrome'});
        }
    })
    .on("error", function (error) {
        console.log(error.message);
    })
    .on("end", function () {
        console.log("Finished");
    });
  
