var turn = true;
var imageFile;

//// turn
function Turn(context) {
  this.player = context;
  this.tempScore = 33;
}

Turn.prototype.roll = function() {
  var die = dieValues[Math.floor( Math.random() * 6)];

  console.log(die);
  this.tempScore += die.value;
  // alert(this.tempScore);
  return die;
}


////player
function Player(name) {
  this.name = name;
}

Player.prototype.turn = function() {
  return new Turn(this);
}



///////


var playerOne = new Player("player one");
var playerTwo = new Player("player two");

var currentPlayer;
var currentTurn;

function turnOver() {
  if (turn) {
    turn = false;
   return currentPlayer = playerOne;
  }else{
    turn = true;
  return currentPlayer = playerTwo;
  }
}

function newTurn() {
  return currentTurn = currentPlayer.turn();
}


///die object stuff
var dieValues = [
  {value: 1, video: "vid/roll1.mp4", image: "img/one.png"},
  {value: 2, video: "vid/roll2.mp4", image: "img/two.jpg"},
  {value: 3, video: "vid/roll3.mp4", image: "img/three.jpg"},
  {value: 4, video: "vid/roll4.mp4", image: "img/four.jpg"},
  {value: 5, video: "vid/roll5.mp4", image: "img/five.jpg"},
  {value: 6, video: "vid/roll6.mp4", image: "img/six.jpg"}
];

//////

$(function(){
  turnOver();
  newTurn();

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

    var die = currentTurn.roll();
    var videoFile = die.video;
    $('#videocontainer video source').attr('src', videoFile);
    $("#videocontainer video")[0].load();
    $('#vid').one('ended', function() {
      var videoFile = 'vid/blank.mp4';
      $('#videocontainer video source').attr('src', videoFile);
      $("#videocontainer video")[0].load();
    });
    imageFile = die.image;
    $('#pastrolls').append('<img src="' + imageFile + '" alt="thrown die" class="thrown"/>');
  });

  $('#hold').click(function() {
    newTurn();
    // alert(currentTurn.player.name);
    turnOver();
  });

});

// for the general UI
//
//
// for the rolling UI
// {value: 6 video_uri: "../vid/roll6.mp4", img: "../img/six.jpg"}, {temScore: 6}, {permScore: 40,  }
