const request = require("request");
require("dotenv").config();
var http = require("http"); // Import Node.js core module

const apiKey = process.env.API_KEY;
console.log(apiKey);

var server = http.createServer(function (req, res) {
  //create web server

  // set response header
  res.writeHead(200, { "Content-Type": "text/html" });

  let formPage = `<div class="container">
        <fieldset>
          <form action="/" method="post">
            <input name="city" type="text" id="ghost_input" placeholder="Enter a City" required>
            <input type="submit" class="ghost-button" value="Get Weather">
          </form>
          </fieldset>
      </div>`;
  // set response content
  res.write(formPage);

  let body = "";
  req.on("data", function (chunk) {
    // take input value from DOM
    body += chunk;
    console.log(body);
    let city = body.split("=")[1];
    console.log(city);

    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;
    request(url, function (err, response, body) {
      //console.log(response.body);
      if (err) {
        console.log("error:", error);
      } else {
        //console.log('body:', body);
        let weather = JSON.parse(body);
        let message = `It's ${weather.current.temperature} degrees in ${weather.location.name}!`;
        console.log(message);
        res.end(message); // send result to DOM
      }
    });
  });
});

server.listen(5000); //6 - listen for any incoming requests

console.log("Node.js web server at port 5000 is running..");



//const apiKey = process.env.API_KEY;
//console.log(apiKey)
//const city = "london";

//const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;
//request(url, function (err, response, body) {
//    //console.log(response.body);
//    if(err){
//        console.log('error:', error);
//    } else {
//        //console.log('body:', body);
//        let weather = JSON.parse(body);
//        let message = `It's ${weather.current.temperature} degrees in ${weather.location.name}!`;
//        console.log(message);
//  }
//});