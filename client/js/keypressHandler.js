

var sendRequest = function(data, successCB, url = '', errorCB = null) {
  $.ajax({
      url: 'http://127.0.0.1:3000' + url,
      type: 'POST',
      data: data,
      contentType: false, 
      processData: false, 
      success: successCB,
      error: errorCB || function(error) {
        console.error('Syncronous Swim: Failed to swim', error);
      }
  });
}

$("#btnSubmit").on('click', (event) => {
  // event.preventDefault();
  var imageData = new FormData();
  var files = $("#fileUpload").get(0).files;

  if (files.length > 0) {
    imageData.append("backgroundImg", files[0]);
  }
  console.log(imageData);
  sendRequest(imageData, (data) => {
    console.log(data)
  }, '/background')
})

$('body').on('keydown', (event) => {
  var arrowPress = event.key.match(/Arrow(Up|Down|Left|Right)/);
  if (arrowPress) {
    var direction = arrowPress[1];
    direction = direction.toLowerCase();
    sendRequest(direction, (data) => {
      console.log(data);
      SwimTeam.move(data);
    })
    
  }
});

console.log('Client is running in the browser!');
