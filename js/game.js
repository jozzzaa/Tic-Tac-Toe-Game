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
  for (var c = 0; c <= gridSize + 1; c++) {   // second number 0.x
    var winnerRow = [];
    for(var d = 0; d <= gridSize + 1; d++) { // first number x.0 each time
      winnerRow.push(d + '.' + c);
    }
    winners.push(winnerRow);
  }

  //Vertical Rows
  for (var e = 0; e <= gridSize + 1; e++) {
    var winnerColumn = [];
    for (var f = 0; f <= gridSize + 1; f++) {
      winnerColumn.push(e + '.' + f);
    }
    winners.push(winnerColumn);
  }

  //Diagonals
  var leftDiagonal = [];
  var rightDiagonal = [];
  for(var g = 0; g <= (gridSize - 1); g++) {
    leftDiagonal.push( g + '.' + g );
    rightDiagonal.push( ((gridSize - 1) - g) + '.' + g )
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
    $('#player2').css({ 'opacity': '0.7'});
  } else if (randomNumber === 0){
    player1 = false;
    $('#player1').css({ 'opacity': '0.7'});
  }
}

whosTurn();


//Grid Build / Sizing / HTML
function buildGrid (gridSize) {
  var boxHolder = $('.canvas');
  for (var k = 0; k <= gridSize - 1; k++) {
    for (var i = 0; i <= gridSize - 1; i++) {
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
});


//Get HTML Div Vectors/ID as Number
function getVectors (num) {
  x = Math.floor(num);
  y = parseFloat(num - Math.floor(num)).toFixed(1) * 10;
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
        // winValidator();
      } else if (board[h][g] === 'o'){
        var current2 = h + '.' + g;
        $(document.getElementById(current2)).css({'background-image': 'url("images/hugs.png")'});
        $(document.getElementById(current2)).css({'background-color': '#016d01'});
        $(document.getElementById(current2)).css({'background-size': '70% 70%'});
        $(document.getElementById(current2)).css({'background-repeat': 'no-repeat'});
        $(document.getElementById(current2)).css({'background-position': 'center'});
        // winValidator();
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
//
// function winValidator() {
//   var successes = [];
//   for (var n = 0; n <= gridSize - 1; n++) {
//     for (var m = 0; m <= gridSize - 1; m++) {
//       var coordinate = winners[m][n];
//       var cY = Math.floor(coordinate);
//       var cX = parseFloat(coordinate - Math.floor(coordinate)).toFixed(1) * 10;
//       if (board[cY][cX] === 'x') {
//         successes.push('x');
//       } else if (board[cY][cX] === 'o') {
//         successes.push('o');
//       }
//       console.log(coordinate);
//       console.log(cX);
//       console.log(cY);
//       console.log(successes);
//       // debugger
//     }
//     var winOrNo = arraySame(successes);
//     console.log(winOrNo);
//     if (winOrNo = true) {
//       console.log('We have a winner');
//     } else {
//       successes = [];
//     }
//   }
// }


//Check Successes array is identical
function arraySame(successes) {
    for(var i = 1; i < successes.length; i++) {
      if(successes[0] !== successes[i]) {
        return false;
      }
    }
  return true;
}





function winValidator() {

  // 00 01 02
  // 10 11 12
  // 20 21 22


  // //horizontal
  // //column doesnt grow, row grows
  // if board[0][0] === x && board[0][1] === x && board[0][2] === x
  // if board[1][0] === x && board[1][1] === x && board[1][2] === x
  // if board[2][0] === x && board[2][1] === x && board[2][2] === x



  for (n = 0; n <= gridSize - 1; n++) {
    for (var m = 0; m <= gridSize - 1; m++) {
      if ( board[n][m] === 'x' ) {

      } else if (board[n][m] === 'o') {

      }
      if (countXH === 2) {
      console.log('x wins');
    } else if (countOH === 2) {
      console.log('y wins');
      }
    }
  }



  // //Vertical
  // //column grow by 1, row doesnt grow
  // if board[0][0] === x && board[1][0] === x && board[2][0] === x
  // if board[0][1] === x && board[1][1] === x && board[2][1] === x
  // if board[0][2] === x && board[1][2] === x && board[2][2] === x

  countXV = 0;
  countYV = 0;

  for (o = 0; o <= gridSize - 1; o++) {
    for (var p = 0; p <= gridSize - 1; p++) {
      if ( board[o][p] === 'x' ) {
        countXH = p + 1;
      } else if (board[o][p] === 'o') {
        countYH = p + 1;
      }
      if (countXV === 2) {
      console.log('x wins');
    } else if (countYV === 2) {
      console.log('y wins');
      }
    }
  }














  // //Diagonals
  // //both grow evenly
  // if board[0][0] === x && board[1][1] === x && board[2][2] === x
  // //both grow opposite
  // if board[0][2] === x && board[1][1] === x && board[2][0] === x
  //


}




//
