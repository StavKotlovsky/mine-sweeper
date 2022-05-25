// function createMat() {
//   var mat = []
//   for (var i = 0; i < 4; i++) {
//     var row = []
//     for (var j = 0; j < 4; j++) {
//       row.push('')
//     }
//     mat.push(row)
//   }
//   return mat
// }


// function renderBoard(board) {
//   var strHTML = '<table border="0"><tbody>';
//   for (var i = 0; i < board.length; i++) {
//     strHTML += '<tr>';
//     for (var j = 0; j < board[0].length; j++) {
//       var cell = board[i][j];
//       var className = 'cell cell-' + i + '-' + j;
//       strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
//     }
//     strHTML += '</tr>'
//   }
//   strHTML += '</tbody></table>';
//   var elBoard = document.querySelector('table.board');
//   elBoard.innerHTML = strHTML;
// }


function getEmptyCells() {
  var emptyCells = []
  for (var i = 1; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length - 1; j++) {
      var cell = gBoard[i][j]
      if (cell === EMPTY) {
        emptyCells.push({ i, j })
      }
    }
  }
  return emptyCells
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function playSound() {
  var sound = new Audio('sound/bite.mp3')
  sound.play()
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
  elCell.innerHTML = value;
}



