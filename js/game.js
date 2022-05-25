'use strict'



const MINE = '💣'


var gBoard
function initGame() {
  gBoard = buildBoard()
  renderBoard(gBoard)

}

function buildBoard() {
  var SIZE = 4
  var board = []
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      var cell = {
        minesAroundCount: 2,
        isShown: true,
        isMine: false,
        isMarked: true
      }
      board[i][j] = cell;
    }
  }
  board[2][1].isMine = true
  board[3][2].isMine = true
  return board
}

function renderBoard(board) {
  var strHTML = '';
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < board[0].length; j++) {
      var cellClass = getClassName({ i: i, j: j })
      // console.log(cellClass);

      strHTML += `<td class="cell"${cellClass} onclick="cellClicked(this)">`;
      strHTML += getCellContent(board[i][j])
      strHTML += '</td>'
    }
    strHTML += '</tr>';
  }
  var elBoard = document.querySelector('tbody.board');
  elBoard.innerHTML = strHTML;
}

function getCellContent(cell) {
  if (!cell.isShown) return ''
  if (cell.isMine) return MINE
  return cell.minesAroundCount
}

function setMinesNegsCount(board) {


}

function cellClicked() {


}




















function getClassName(location) {
  var cellClass = `cell-${location.i}-${location.j}`;
  return cellClass;
}