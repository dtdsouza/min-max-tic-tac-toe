const Node = require('./Node')

let counter = 1
let counter2 = 0

const verifyWin = (board) => {
  const principalDiagonal = board[0][0] + board[1][1] + board[2][2]
  const secundaryDiagonal = board[2][0] + board[1][1] + board[0][2]

  if ([3, -3].includes(principalDiagonal)) return principalDiagonal / 3

  if ([3, -3].includes(secundaryDiagonal)) return secundaryDiagonal / 3

  for (let i = 0; i < 3; ++i) {
    let rowCounter = 0
    let columnCounter = 0
    for (let j = 0; j < 3; ++j) {
      rowCounter += board[i][j]
      columnCounter += board[j][i]
    }
    if ([3, -3].includes(rowCounter)) return rowCounter / 3
    if ([3, -3].includes(columnCounter)) return columnCounter / 3
  }
  return 0
}

const duplicateBoard = (board) => {
  const newBoard = [ [0,0,0],[0,0,0],[0,0,0] ]

  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      newBoard[i][j] = board[i][j]
    }
  }

  return newBoard
}

const generateTree = (node) => {
  const isFinal = verifyWin(node.board)
  if ([1, -1].includes(isFinal)) {
    node.value = isFinal
    return node.value
  }

  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      if (node.board[i][j] === 0) {
        const newBoard = duplicateBoard(node.board)
        newBoard[i][j] = node.whosPlay
        const child = new Node(newBoard, node, node.whosPlay * -1)
        node.childrem.push(child)
        ++counter
        generateTree(child)
      }
    }
  }
}

const generateMinMaxValues = (node) => {
  counter2++
  if ( node.value ) {
    return node.value
  }
  
  const miniMax = []

  node.childrem.forEach((child) => {
    if ( child.value === node.whosPlay ){
      node.value = node.whosPlay
      return node.value
    } else {
      miniMax.push(generateMinMaxValues(child))
    }
  })

  if(node.whosPlay === 1){
    node.value = Math.max(...miniMax)
  } else {
    node.value = Math.min(...miniMax)
  }
  
  return 0
}

const main = () => {
  const board = [ [0,0,0],[0,0,0],[0,0,0] ]

  const root = new Node(board, null, 1)

  generateTree(root)

  generateMinMaxValues(root)

  console.log('Quantidade de Estados do tabuleiro abertos: ', counter)
  console.log('Quantidade de Estados acessados pelo minimax: ', counter2)
  console.log('Valor minimax da raiz da arvore: ', root.value)
}

main()