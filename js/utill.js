

function getEmptyCells() {
  var emptyCells = []
  for (var i = 1; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length - 1; j++) {
      emptyCells.push({ i, j })

    }
  }
  return emptyCells
}

function countMinesAround(rowIdx, colIdx) {
  var count = 0
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i > gBoard.length - 1) continue
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (j < 0 || j > gBoard[0].length - 1) continue
      if (i === rowIdx && j === colIdx) continue
      var cell = gBoard[i][j]
      if (cell.isMine) count++
    }
  }
  return count
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

function getClassName(location) {
  var cellClass = `cell-${location.i}-${location.j}`;
  return cellClass;
}

function renderCell(location, value) {
  var elCell = document.querySelector('.' + getClassName(location));
  elCell.innerHTML = value;
}



