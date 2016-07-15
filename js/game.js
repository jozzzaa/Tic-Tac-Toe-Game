//// WELCOME TO TIC TAC TOE JAVASCRIPT ////


//Player Names
var player1a = '';
var player2a = '';


//Box ID Position
var x = '';
var y = '';


//Board Variables
var board = [];


//Winning Arrays
var winners = [];
function winningCombinations(gridSize) {

  //Horizontal Rows
  winners = [];
  for (var c = 0; c <= gridSize - 1; c++) {
    var winnerRow = [];
    for(var d = 0; d <= gridSize - 1; d++) {
      winnerRow.push(c + '.' + d);
    }
    winners.push(winnerRow);
  }

  //Vertical Rows
  for (var e = 0; e <= gridSize - 1; e++) {
    var winnerColumn = [];
    for (var f = 0; f <= gridSize - 1; f++) {
      winnerColumn.push(f + '.' + e);
    }
    winners.push(winnerColumn);
  }

  //Diagonals
  var leftDiagonal = [];
  var rightDiagonal = [];
  for(var g = 0; g <= (gridSize - 1); g++) {
    leftDiagonal.push( g + '.' + g );
    rightDiagonal.push( ((gridSize - 1) - g) + '.' + g );
  }
  winners.push(leftDiagonal);
  winners.push(rightDiagonal);

}


//Who goes first? - Player 1 or Player 2
var player1 = true;
function whosTurn () {
  var randomDecimal = Math.random();
  var randomNumber = Math.round(randomDecimal);
  if (randomNumber === 1) {
    player1 = true;
    $('#player2').css({ 'opacity': '0.7'});
  } else if (randomNumber === 0){
    player1 = false;
    $('#player1').css({ 'opacity': '0.7'});
  }
}

whosTurn();//Causing errors when moving buildGrid


//Grid Build / Sizing / HTML
function buildGrid (gridSize) {
  var boxHolder = $('.canvas');
  for (var k = 0; k <= gridSize - 1; k++) {
    for (var l = 0; l <= gridSize - 1; l++) {
      var box = $('<div>').attr('id', (k + '.' + l)).addClass('box');
      box.appendTo(boxHolder);
    }
  }
  var boxSize = ((100/gridSize));
  $('.box').css({width: boxSize + '%', height: boxSize + '%' });
}


//Grid Build DOM / Arrays
function gridDOM() {
  var shell = [];
  for (var a = 0; a < gridSize; a++) {
    var row = [];
    for (var b = 0; b < gridSize; b++) {
      row.push('');
    }
    shell.push(row);
  }
  board = shell;
}


//Translate arrays to live board
function domToHtmlBoard () {

  for ( var h = 0; h <= (gridSize - 1); h++) {
    for ( var g = 0; g <= (gridSize - 1); g++) {
      if (board[h][g] === 'x') {
        var current = h + '.' + g;
        $(document.getElementById(current)).css({'background-image': 'url("images/kisses.png")'});
        $(document.getElementById(current)).css({'background-color': '#016d01'});
        $(document.getElementById(current)).css({'background-size': '70% 70%'});
        $(document.getElementById(current)).css({'background-repeat': 'no-repeat'});
        $(document.getElementById(current)).css({'background-position': 'center'});
      } else if (board[h][g] === 'o'){
        var current2 = h + '.' + g;
        $(document.getElementById(current2)).css({'background-image': 'url("images/hugs.png")'});
        $(document.getElementById(current2)).css({'background-color': '#016d01'});
        $(document.getElementById(current2)).css({'background-size': '70% 70%'});
        $(document.getElementById(current2)).css({'background-repeat': 'no-repeat'});
        $(document.getElementById(current2)).css({'background-position': 'center'});
      }
    }
  }
}


//Play Now Button
var gridSize = '3';

$('.playNow').on('click', function() {

  gridSize = $('.boardSize').val();
  buildGrid(gridSize);
  gridDOM();

  if ( $('.Player1Name').val() === "") {
    player1a = "Player 1";
    $('#player1 > div > h3').html(player1a);
  } else {
    player1a = $('.Player1Name').val();
    $('#player1 > div > h3').html(player1a);
  }

  if ( $('.Player2Name').val() === "") {
    player2a = "Player 2";
    $('#player2 > div > h3').html(player2a);
  } else {
    player2a = $('.Player2Name').val();
    $('#player2 > div > h3').html(player2a);
  }

  $('.wrapperIntro').css({ 'display': 'none'});
  $('.canvas').css({ 'display': 'block'});
  $('.gameStats').css({ 'display': 'block'});


});

winningCombinations(gridSize);
gridDOM();
domToHtmlBoard();


//Box Style Changes on Click
$('.canvas').on('click', '.box', function (event) {
  if (player1 === true) {
      var divID = event.target.id;
      getVectors(divID);
      board[x][y] = 'x';
      domToHtmlBoard();
      $('#player1').css({ 'opacity': '0.7'});
      $('#player2').css({ 'opacity': '1'});
      player1 = false;

  } else if (player1 === false) {
      var divID2 = event.target.id;
      getVectors(divID2);
      board[x][y] = 'o';
      domToHtmlBoard();
      $('#player2').css({ 'opacity': '0.7'});
      $('#player1').css({ 'opacity': '1'});
      player1 = true;

  }

  if (checkWinnerX() === true) {
    $('.announcementHolderX').css({ 'transition': 'all 2s'});
    $('#xWins').html(player1a + " Wins with X's")
    $('.announcementHolderX').css({ 'display': 'block'});
    $('.announcementHolderX').css({ 'opacity': '1'});
  }

  if (checkWinnerO() === true) {
    $('.announcementHolder0').css({ 'transition': 'all 2s'});
    $('#oWins').html(player2a + " Wins with O's")
    $('.announcementHolder0').css({ 'display': 'block'});
    $('.announcementHolder0').css({ 'opacity': '1'});
  }

});


//Get HTML Div Vectors/ID as Number
function getVectors(num) {
    x = Math.floor(num);
    y = parseFloat(num - Math.floor(num)).toFixed(1) * 10;

    return [x,y];
}

function getVectors2(num) {
    var x = Math.floor(num);
    var y = parseFloat(num - Math.floor(num)).toFixed(1) * 10;

    return [x,y];
}


//Scoring
//Thank you Harry!
function checkWinnerX() {
    var win = false;
    winners.some(function(element, i){
        win = element.every(function(f3) {
            var coord = getVectors2(f3);
            if (board[coord[0]][coord[1]] === "x") {
              return true;
            }

        });
        return win;
    });
    return win;
}

function checkWinnerO() {
    var win2 = false;
    return winners.some(function(element2, i2){
          var a = element2.every(function(f2) {
            var coord2 = getVectors2(f2);
            if (board[coord2[0]][coord2[1]] === "o") {
              return true;
            } else {
              return false;
            }
        });
      return a;
    });
}


//Functionality to convey a draw
function drawMaybe() {
  for(var aa = 0; aa <= gridSize - 1; aa++) {

  }
}


//Reset Board / Refresh Page
$('body > img').on('click', function reset () {
  location.reload();
});
