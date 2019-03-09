const fs = require('fs');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQueue = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = './background.jpg';
////////////////////////////////////////////////////////
var validMessages = ['left', 'right', 'up', 'down'];

var random = (array) => {
  return array[Math.floor(Math.random()* (array.length))]
}

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.writeHead(200, headers);
  
  if (req.method === 'POST') {
    var messageFromClient = "";
    req.on('data', function(chunk) {
      messageFromClient += chunk;
    });
    req.on('end', function () {
      console.log('POSTed: ' + messageFromClient);
      res.end(messageFromClient);
    });
  }

  if (req.method === 'GET') {
    res.write(random(validMessages).toString());
    res.end();
  }
  
  if (req.method === 'OPTIONS') {
    res.end();
  }
};
exports.validMessages = validMessages;