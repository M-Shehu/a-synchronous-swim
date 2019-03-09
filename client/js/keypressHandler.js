

var sendCommand = function(data, successCB, errorCB = null) {
  $.ajax({
      url: 'http://127.0.0.1:3000',
      type: 'POST',
      data: data,
      success: successCB,
      error: errorCB || function(error) {
        console.error('Syncronous Swim: Failed to swim', error);
      }
  });
}


$('body').on('keydown', (event) => {
  var arrowPress = event.key.match(/Arrow(Up|Down|Left|Right)/);
  if (arrowPress) {
    var direction = arrowPress[1];
    direction = direction.toLowerCase();
    sendCommand(direction, (data) => {
      console.log(data);
      SwimTeam.move(data);
    })
    
  }
});

console.log('Client is running in the browser!');
