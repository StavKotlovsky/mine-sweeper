'use strict'


const MINE = '💣'
const FLAG = '🏴'


var gBoard
var gTimeInterval

var gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
  startTime: 0
}
var gLevel = { SIZE: 4, MINES: 2 }

function initGame() {
  gBoard = buildBoard()
  placeMines()
  setMinesNegsCount()
  renderBoard()

}

function buildBoard() {
  var board = []
  for (var i = 0; i < gLevel.SIZE; i++) {
    board.push([]);
    for (var j = 0; j < gLevel.SIZE; j++) {
      var cell = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false
      }
      board[i][j] = cell;
    }
  }
  return board
}

function renderBoard() {
  var strHTML = '';
  for (var i = 0; i < gBoard.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < gBoard[0].length; j++) {
      var cellClass = getClassName({ i, j })

      strHTML += `<td class="cell ${cellClass}" onclick="cellClicked(this, ${i}, ${j})" 
    oncontextmenu="markCell(event, this, ${i}, ${j})">`;
      strHTML += getCellContent(gBoard[i][j])
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

function setMinesNegsCount() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      var cell = gBoard[i][j]
      cell.minesAroundCount = countMinesAround(i, j)
    }
  }
}

function cellClicked(elCell, i, j) {

  if (!gGame.secsPassed) {
    gGame.isOn = true
    gGame.startTime = Date.now()
    gTimeInterval = setInterval(setTime, 100)
  }
  if (!gGame.isOn) return
  var cell = gBoard[i][j]
  if (cell.isMine) gameOver()
  if (cell.isShown) return
  cell.isShown = true
  gGame.shownCount++
  elCell.innerHTML = getCellContent(cell)
  expandShown(i, j)
}

function placeMines() {
  var notMineCells = getEmptyCells()
  for (var i = 0; i < gLevel.MINES; i++) {
    var randomIdx = getRandomInt(0, notMineCells.length)
    var location = notMineCells[randomIdx]
    gBoard[location.i][location.j].isMine = true
    notMineCells.splice(randomIdx, 1)
  }
}

function setTime() {
  var diff = Date.now() - gGame.startTime
  gGame.secsPassed = diff / 1000
  var elTime = document.querySelector('.timer')
  elTime.innerHTML = gGame.secsPassed
}

function markCell(event, elCell, i, j) {
  event.preventDefault();
  var cell = gBoard[i][j]
  cell.isMarked = true
  gGame.markedCount++
  elCell.innerHTML = FLAG
  gTimeInterval = setInterval(setTime, 100)
  gGame.startTime = Date.now()
}

function expandShown(rowIdx, colIdx) {
  var minesAroundCount = countMinesAround(rowIdx, colIdx)
  if (minesAroundCount) return
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i > gBoard.length - 1) continue
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (j < 0 || j > gBoard[0].length - 1) continue
      if (i === rowIdx && j === colIdx) continue
      var cell = gBoard[i][j]
      cell.isShown = true
      gGame.shownCount++
      renderCell({ i, j }, cell.minesAroundCount)
    }
  }
}

function resetGame() {
  clearInterval(gTimeInterval)
  gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    startTime: 0
  }
  var elTime = document.querySelector('.timer')
  elTime.innerHTML = '00:00'
}

function onLevelClick(size = 4, mines = 8) {
  gLevel.SIZE = size
  gLevel.MINES = mines
  resetGame()
  initGame()
}

function gameOver() {
  var elBtn = document.querySelector('.face')
  gGame.isOn = false
  elBtn.innerHTML = '🤯'

  resetGame()
}

function gameVictory() {
  gGame.isOn = false
  var elBtn = document.querySelector('.face')
  var totalCellCount = gLevel.SIZE * gLevel.SIZE
  if (gGame.markedCount === gLevel.MINES &&
    gGame.shownCount === totalCellCount - gLevel.MINES) {
    elBtn.innerHTML = '😍'
  }
  resetGame()
}


























