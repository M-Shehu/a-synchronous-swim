
var sendCommand = function(successCB, errorCB = null) {
    $.ajax({
        url: 'http://127.0.0.1:3000',
        type: 'GET',
        success: successCB,
        error: errorCB || function(error) {
          console.error('chatterbox: Failed to fetch messages', error);
        }
    });
}

export default sendCommand;