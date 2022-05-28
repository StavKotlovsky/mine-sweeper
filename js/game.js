'use strict'


const MINE = '💣'
const FLAG = '🏴'
const LIVES = '💗'
const HINTS = '💡💡💡'


var gBoard
var gTimeInterval
var gLives
var gIsHints = false


var gLevel = { SIZE: 4, MINES: 2 }
var gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
  startTime: 0,

}

function initGame() {
  resetGame()
  gBoard = buildBoard()
  placeMines()
  setMinesNegsCount()
  renderLives()
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
      // var currCell = gBoard[i][j]
      var cellClass = getClassName({ i, j })
      // if (currCell.isShown) {
      //   var cell = (!currCell.isMine) ? currCell.minesAroundCount : MINE
      // }
      strHTML += `<td class="cell ${cellClass}" onclick="cellClicked(this, ${i}, ${j})" 
    oncontextmenu="markCell(event, this, ${i}, ${j})">`;
      strHTML += getCellContent(gBoard[i][j])
      strHTML += '</td>'
    }
    strHTML += '</tr>';
  }
  var elBoard = document.querySelector('tbody.board');
  elBoard.innerHTML = strHTML;
  var elHint = document.querySelector('.hints span')
  elHint.innerHTML = HINTS

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
  startTime()
  if (!gGame.isOn) return
  var cell = gBoard[i][j]
  if (cell.isMine) {
    gLives--
    renderLives()
    if (!gLives) return gameOver()
    elCell.innerHTML = MINE
    setTimeout(() => {
      elCell.innerHTML = ''
    }, 1000)
    return
  }
  if (cell.isMarked) return
  cell.isShown = true
  gGame.shownCount++
  elCell.innerHTML = getCellContent(cell)
  expandShown(i, j)
  checkVictory()

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
  startTime()
  if (!gGame.isOn) return
  var cell = gBoard[i][j]
  if (cell.isShown)
    return

  if (cell.isMarked === true) {
    cell.isMarked = false
    elCell.innerHTML = ''
    gGame.markedCount--
  } else {
    cell.isMarked = true
    gGame.markedCount++
    elCell.innerHTML = FLAG
  }
  checkVictory()
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
      if (cell.isMarked) continue
      if (!cell.isShown) {
        cell.isShown = true
        gGame.shownCount++
      }
      renderCell({ i, j }, cell.minesAroundCount)
    }
  }
}

function resetGame() {
  gGame.isOn = false
  clearInterval(gTimeInterval)
  gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    startTime: 0
  }
  gLives = 3
  gIsHints = 3
  var elTime = document.querySelector('.timer')
  elTime.innerHTML = '00:00'
  var elFace = document.querySelector('.face')
  elFace.innerHTML = '😁'

}

function startTime() {
  if (!gGame.secsPassed) {
    gGame.isOn = true
    gGame.startTime = Date.now()
    gTimeInterval = setInterval(setTime, 100)
  }
}

function onLevelClick(size = 4, mines = 8) {
  gLevel.SIZE = size
  gLevel.MINES = mines
  resetGame()
  initGame()
}

function gameOver() {
  gGame.startTime = 0
  var elBtn = document.querySelector('.face')
  gGame.isOn = false
  elBtn.innerHTML = 'You ' + '🤯' + ' lose!'
  clearInterval(gTimeInterval)
  console.log('game over')
}

function checkVictory() {
  var totalCellCount = gLevel.SIZE * gLevel.SIZE
  if (gGame.markedCount === gLevel.MINES &&
    gGame.shownCount === totalCellCount - gLevel.MINES) {
    var elBtn = document.querySelector('.face')
    elBtn.innerHTML = 'Victory ' + '😎' + ' !!!'
    gGame.isOn = false
    clearInterval(gTimeInterval)
    console.log('yowwww winnn');
  }
}

function renderLives() {
  var elFace = document.querySelector('.face')
  if (gLives === 2) {
    elFace.innerHTML = 'Be ' + '&#128559;' + ' careful'
  }
  if (gLives === 1) {
    elFace.innerHTML = '&#128544;'
  }
  var elLives = document.querySelector('.lives')
  elLives.innerText = ''
  for (var i = 0; i < gLives; i++) {
    elLives.innerText += LIVES
  }
}

function checkHints(elCell, i, j) {

}




























