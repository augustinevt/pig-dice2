var turn = true;
var imageFile;
var videoHasFinished = true;
var sparkleArray = [];


function Sparkle(x,y,id) {
  this.x = x;
  this.y = y;
  this.id = id;
}

function makeManySparkles(density, width, height) {
  for(i=0; i < density; i++) {
    var y = Math.random() * width;
    var x = Math.random() * height;
    sparkleArray.push(new Sparkle(x,y,i));
  }
}





//// turn
function Turn(context) {
  this.player = context;
  this.tempScore = 0;
  this.pigDie = false;
  this.win = false;
}

Turn.prototype.roll = function() {
  var die = dieValues[Math.floor( Math.random() * 6)];
  console.log(die);
  this.tempScore += die.value;
  if (die.value === 1) {
    this.pigDie = true;
  }
  if (this.player.permScore + this.tempScore > 100) {
    this.win = true;
  }
  return die;
}

Turn.prototype.hold = function() {
  this.player.permScore +=  this.tempScore
}


////player
function Player(name) {
  this.name = name;
  this.permScore = 0;
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
  $('#pastrolls').empty();
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

  $('#roll, #vid').click(function() {
    if (videoHasFinished) {
      videoHasFinished = false;
      var die = currentTurn.roll();
      $('#videocontainer video source').attr('src', die.video);
      $("#videocontainer video")[0].load();
      $('#vid').one('ended', function() {
        var videoFile = 'vid/blank.mp4';
        $('#videocontainer video source').attr('src', videoFile);
        $("#videocontainer video")[0].load();
        videoHasFinished = true;
      });
      $('#pastrolls').append('<img src="' + die.image + '" alt="thrown die showing ' + die.value + '" class="thrown hiddendie"/>');
      $(".hiddendie").delay(1500).fadeIn(4000);

      ///

      if (currentTurn.pigDie) {
        turnOver();
        newTurn();
        $('#scoredisplay div h2').toggleClass('yourturn');
      } else if (currentTurn.win) {
        currentTurn.hold();
        $('#playerscore').text(playerOne.permScore);
        $('#computerscore').text(playerTwo.permScore);
        alert('you win!')
        var width = $('.sparkle-container').width();
      var height = $('.sparkle-container').height();
        makeManySparkles(1000, width, height );
        sparkleArray.forEach(function(sparkle) {
          $('.sparkle-container').append("<div class='sparkle' id='sparkle"+sparkle.id+"'></div>");
          $('#sparkle' + sparkle.id).css({'top': sparkle.x, 'left': sparkle.y});
          $('#sparkle' + sparkle.id).fadeIn( (Math.random() * 5000) + 2000).fadeOut( Math.random() * 1500);
        });
        // makeManySparkles(1000, width, height );
        // sparkleArray.forEach(function(sparkle) {
        //   $('.sparkle-container').append("<div class='sparkle' id='sparkle"+sparkle.id+"'></div>");
        //   $('#sparkle' + sparkle.id).css({'top': sparkle.x, 'left': sparkle.y});
        //   $('#sparkle' + sparkle.id).fadeIn( Math.random() * 5000).fadeOut( Math.random() * 15000);
        // });
        // makeManySparkles(1000, width, height );
        // sparkleArray.forEach(function(sparkle) {
        //   $('.sparkle-container').append("<div class='sparkle' id='sparkle"+sparkle.id+"'></div>");
        //   $('#sparkle' + sparkle.id).css({'top': sparkle.x, 'left': sparkle.y});
        //   $('#sparkle' + sparkle.id).fadeIn( Math.random() * 5000).fadeOut( Math.random() * 15000);
        // });
        // makeManySparkles(1000, width, height );
        // sparkleArray.forEach(function(sparkle) {
        //   $('.sparkle-container').append("<div class='sparkle' id='sparkle"+sparkle.id+"'></div>");
        //   $('#sparkle' + sparkle.id).css({'top': sparkle.x, 'left': sparkle.y});
        //   $('#sparkle' + sparkle.id).fadeIn( Math.random() * 1000).fadeOut( Math.random() * 1000);
        // });
        sparkleArray = [];
      }
    }
  });

  $('#hold').click(function() {
    currentTurn.hold();
    $('#scoredisplay div h2').toggleClass('yourturn');
    $('#playerscore').text(playerOne.permScore);
    $('#computerscore').text(playerTwo.permScore);

    turnOver();
    newTurn();
    // alert(currentTurn.player.name);

  });

  // $('#videocontainer').css('height', $("video").height());

});

// for the general UI
//
//
// for the rolling UI
// {value: 6 video_uri: "../vid/roll6.mp4", img: "../img/six.jpg"}, {temScore: 6}, {permScore: 40,  }
