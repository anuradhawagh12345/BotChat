var express = require('express');
var app = express();
var http = require("https");
var jsonObj=null;
var body;
var session_id;  
var http = require("https");

// Creating REST Post request parameters
var options = {
  "method": "POST",
  "hostname": "9xcwz56crk.execute-api.us-west-2.amazonaws.com",
  "port": null,
  "path": "/beta/",
  "headers": {
    "content-type": "application/json",
    "cache-control": "no-cache",
    "postman-token": "4ae98789-e0e5-76bf-fc32-e9f6caf7c87f"
  }
};

//Allow cross origin access...added heread in request
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// /data URL - gets called from chatBotFinal.html
app.use('/data', function(req, res){

  session_id = req.param('id');
  console.log(session_id);
	
	//This function is used to hold req.send(body) data untill and unless https request process completed.
	//i.e. synchronizing 
	getI(session_id, function(body){
		res.send(body);
	})
 
});


var getI = function(session_id,callback){
	
	//Note - Need to convert session id into integer
	var jsonStr = {"sessionId" : parseInt(session_id)};
	console.log(jsonStr);
	
		var getData = http.request(options, function (res) {
						var chunks = [];

						res.on("data", function (chunk) {
							chunks.push(chunk);
						});

						  res.on("end", function () {
							 body= Buffer.concat(chunks);
							jsonObj = JSON.parse(body.toString());
							console.log(jsonObj);
							callback(jsonObj);
						  });
						  
		});
getData.write(JSON.stringify(jsonStr));
getData.end();
}

app.listen(4000);
console.log("Server is running");