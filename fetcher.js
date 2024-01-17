// Slice first to remove first 2 process.arg vals
const slicedArr = process.argv.splice(2);
const URL = slicedArr[0];
const filePath = slicedArr[1];

const fs = require('fs');
const request = require('request');

// function to get body of a page.
request(URL, (error, response, body) => {
  if (error) {
    // Print the error if one occurred
    console.log('error:', error);
  }
  if (response.statusCode !== 200) {
    // Print the response status code if an error. 200 Normal response
    console.log('statusCode:', response && response.statusCode);
    console.log(`Something wrong with your URL not outputting to file`);
    return;
  }
  fs.writeFile(filePath, body, (error) => {
    // if file path is wrong
    if (error) {
      console.log("File Path incorrect");
      console.log(error);
      return;
    }
    // Get the file size put output message
    fs.stat(filePath, (error, stats) => {
      if (error) {
        console.log(error);
      }
      console.log(`Downloaded and saved ${stats.size} bytes to ${filePath}`);
    });
  });
});
