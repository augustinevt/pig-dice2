var turn = true;

function Player(name) {
  this.name = name;
}

Player.prototype.roll = function() {
  return this.name;
}


var playerOne = new Player("player one");
var playerTwo = new Player("player two");

var currentPlayer;

function turnOver() {
  if (turn) {
    turn = false;
   return currentPlayer = playerOne;
  }else{
    turn = true;
  return currentPlayer = playerTwo;
  }
}



//////

$(function(){
  turnOver();
  $('#start').click(function() {
    //start video
    var videoFile = 'vid/start.mp4';
    $('#videocontainer video source').attr('src', videoFile);
    $("#videocontainer video")[0].load();
    $('#vid').one('ended', function() {
      var videoFile = 'vid/blank.mp4';
      $('#videocontainer video source').attr('src', videoFile);
      $("#videocontainer video")[0].load();
    });
  });

  $('#roll').click(function() {
    alert(currentPlayer.roll());
  });

  $('#hold').click(function() {
    turnOver();
  });

});

// for the general UI
//
//
// for the rolling UI
// {value: 6 video_uri: "../vid/roll6.mp4", img: "../img/six.jpg"}, {temScore: 6}, {permScore: 40,  }
