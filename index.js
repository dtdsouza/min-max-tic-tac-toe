const verifyWin = (board) => {
  const principalDiagonal = board[0][0] + board[1][1] + board[2][2]
  const secundaryDiagonal = board[2][0] + board[1][1] + board[0][2]

  if ([3,-3].includes(principalDiagonal)) return principalDiagonal/3

  if ([3,-3].includes(secundaryDiagonal)) return secundaryDiagonal/3

  for(let i = 0; i < 3; ++i){
    let rowCounter = 0
    let columnCounter = 0
    for(let j = 0; j < 3; ++j){
      rowCounter += board[i][j]
      columnCounter += board[j][i]
    }
    if ([3,-3].includes(rowCounter)) return rowCounter/3
    if ([3,-3].includes(columnCounter)) return columnCounter/3
  }
  return 0
}

const board = [
  [1,1,-1],
  [0,-1,-1],
  [-1,0,1]
]

console.log(verifyWin(board))