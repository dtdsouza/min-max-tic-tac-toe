class Node {
  constructor(board, father, whosPlay) {
    this.board = board
    this.father = father
    this.whosPlay = whosPlay
    this.childrem = []
    this.value = undefined
  }
}

module.exports = Node