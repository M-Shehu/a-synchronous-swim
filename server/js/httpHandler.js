const fs = require('fs');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQueue = require('./messageQueue');
const httpHandler = require('./httpHandler');
const path = require('path');
// Path for the background image ///////////////////////
module.exports.backgroundImageFile = './background.jpg';
////////////////////////////////////////////////////////
var validMessages = ['left', 'right', 'up', 'down'];

var random = (array) => {
  return array[Math.floor(Math.random() * (array.length))]
}

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.writeHead(200, headers);
  
  

  if (req.method === 'POST') {
    if(req.url === "/background") {
      console.log('Backgrounded Uploaded to server');
      res.end('Upload Successful');
    } else {
      var messageFromClient = "";
      req.on('data', function(chunk) {
        messageFromClient += chunk;
      });
      req.on('end', function () {
        console.log('POSTed: ' + messageFromClient);
        res.end(messageFromClient);
      });
    }
  }

  if (req.method === 'GET') {
    if(req.url === "/background") {
      var filePath = path.join(__dirname, "./background.jpg");
      fs.readFile(filePath, function(error, content) {
        if(error) {
          res.writeHead(404,headers);
          res.end("ERROR File does not exist");
        } else {
          res.writeHead(200, headers);
          console.log('Background Image Sent!')
          res.end(content); 
        }
      })
    } else {
      res.write(random(validMessages).toString());
      res.end();
    }
  }
  
  if (req.method === 'OPTIONS') {
    res.end();
  }

  next();

};
exports.validMessages = validMessages;