var turn;


$(function(){
  $('#start').click(function() {
    //start video
    var videoFile = 'vid/start.mp4';
    $('#videocontainer video source').attr('src', videoFile);
    $("#videocontainer video")[0].load();
  });

  $('#roll').click(function() {});
    if (turn === "player") {
      //player stuff
    }
});

// for the general UI
//
//
// for the rolling UI
// {value: 6 video_uri: "../vid/roll6.mp4", img: "../img/six.jpg"}, {temScore: 6}, {permScore: 40,  }
