//// WELCOME TO TIC TAC TOE JAVASCRIPT ////


//store in local storage
//http://stackoverflow.com/questions/3357553/how-to-store-an-array-in-localstorage
//https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify

// var names = [];
// names[0] = prompt("New member name?");
// localStorage.setItem("names", JSON.stringify(names));
//
// //...
// var storedNames = JSON.parse(localStorage.getItem("names"));


///////////////////////////



var gridSize = 3;

//Box ID Position
var x = 0;
var y = 0;

//Board Variables + local storage
var board = [];

//Winning Arrays
var winners = [];

function winningCombinations() {

  //Horizontal Rows
  winners = [];
  for (var c = 1; c <= gridSize; c++) {   // second number 0.x
    var winnerRow = [];
    for(var d = 1; d <= gridSize; d++) { // first number x.0 each time
      winnerRow.push(d + '.' + c);
    }
    winners.push(winnerRow);
  }

  //Vertical Rows
  for (var e = 1; e <= gridSize; e++) {
    var winnerColumn = [];
    for (var f = 1; f <= gridSize; f++) {
      winnerColumn.push(e + '.' + f);
    }
    winners.push(winnerColumn);
  }

  //Diagonals
  var leftDiagonal = [];
  var rightDiagonal = [];
  for(var g = 0; g <= (gridSize - 1); g++) {
    leftDiagonal.push( (g + 1) + '.' + (g + 1) );
    rightDiagonal.push( (gridSize - g) + '.' + ( g + 1 ) )
  }
  winners.push(leftDiagonal);
  winners.push(rightDiagonal);

}

winningCombinations();


//Who goes first? - Player 1 or Player 2
var player1 = true;

function whosTurn () {
  var randomDecimal = Math.random();
  var randomNumber = Math.round(randomDecimal);
  if (randomNumber === 1) {
    player1 = true;
  } else if (randomNumber === 0){
    player1 = false;
  }
}

whosTurn();


//Grid Build / Sizing / HTML
function buildGrid (gridSize) {
  var boxHolder = $('.canvas');
  for (var i = 1; i <= gridSize; i++) {
    for (var k = 1; k <= gridSize; k++) {
      var box = $('<div>').attr('id', (k + '.' + i)).addClass('box');
      box.appendTo(boxHolder);
    }
  }
  var boxSize = ((100/gridSize));
  $('.box').css({width: boxSize + '%', height: boxSize + '%' });
}

buildGrid(gridSize);


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

gridDOM();


//Box Style Changes on Click
$('.box').on('click', function (event) {
  if (player1 === true) {
      var divID = event.target.id;
      var divIDArray = getVectors(divID);
      board[y-1][x-1] = 'x';
      domToHtmlBoard();
      player1 = false;
  } else if (player1 === false) {
      var divID2 = event.target.id;
      getVectors(divID2);
      board[y-1][x-1] = 'o';
      domToHtmlBoard();
      player1 = true;
  }
});


//Get HTML Div Vectors/ID as Number
function getVectors (num) {
  x = Math.floor(num);
  y = parseFloat(num - Math.floor(num)).toFixed(1) * 10;
}


//Translate arrays to live board

function domToHtmlBoard () {

  for ( var g = 0; g <= (gridSize - 1); g++) {
    for ( var h = 0; h <= (gridSize - 1); h++) {
      if (board[g][h] === 'x') {
        var current = (g + 1) + '.' + (h + 1);
        $(document.getElementById(current)).css({'background-color': 'purple'});
        winValidator();
      } else if (board[g][h] === 'o'){
        var current2 = (g + 1) + '.' + (h + 1);
        $(document.getElementById(current2)).css({'background-color': 'black'});
        winValidator();
      }
    }
  }
}





//Scoring


//if all arrays have either an x or an o, then tie add this to an an if statement at the end for else
//
// for (var m = 0; m <= winners; m++) {
//   winners[m]
// }
//
//
//
//
//
// getVectors(1.1)
// //x and y variables
// indexOf(board[x][y]) === 'x' && indexOf(getVectors(1.1)) === 'o'
//
//
// take array 1
// get coordinates from each spot
// if all equal x ==>
// if all equal o ==>
// else ==>continue

function winValidator() {
  var successes = [];
  for (var m = 0; m <= gridSize-1; m++) {
    var coordinate = winners[0][m];
    var cX = Math.floor(coordinate);
    var cY = parseFloat(coordinate - Math.floor(coordinate)).toFixed(1) * 10;
    if (board[cX-1][cY-1] === 'x') {
      successes.push('x');
    } else if (board[cX-1][cY-1] === 'o') {
      successes.push('o');
    }
  }
  debugger
  var winOrNo = arraySame(successes);
  if (winOrNo = true) {
    alert('We have a winner');
    }






}

//Check Successes array is identical
function arraySame(successes) {
    for(var i = 1; i < successes.length; i++) {
      if(successes[0] !== successes[i]) {
        return false;
      }
    }
  return true;
}













//
