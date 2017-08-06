import random from 'lodash-es/random'
import {aiTurn, playerTurn, gameOver} from './scripts'

const table = document.querySelector('table')
const cells = document.querySelectorAll('td')

const game = {
  board: [],
  turn: 0,
  initializeBoard () {
    game.board = []
    for (let i = 0; i < cells.length; i++) {
      game.board[i] = cells[i].dataset.state
    }
  },
  gameOver (winner) {
    table.dataset.winner = winner
    game.turn = 0
    table.dispatchEvent(gameOver)
  },
  playerTurn (event) {
    const cell = event.target

    if (cell.dataset.state !== 'E') {
      return
    }

    cell.dataset.state = 'P'
    game.board[cell.dataset.i] = 'P'

    cell.dispatchEvent(playerTurn)
    if (game.checkBoard()) {
      game.gameOver('P')
      return
    }
    ++game.turn
    game.aiTurn()
    if (game.turn === game.board.length) {
      game.gameOver('D')
    }
  },
  aiTurn () {
    function simpleTurn () {
      let foundCell = false
      let i
      while (!foundCell && game.turn < game.board.length) {
        i = random(game.board.length)

        if (game.board[i] === 'E') {
          ++game.turn
          foundCell = true
          game.board[i] = 'C'
          cells[i].dataset.state = 'C'
          cells[i].dispatchEvent(aiTurn)
        }
      }
    }

    simpleTurn()
    if (game.checkBoard()) {
      game.gameOver('C')
    }
  },
  checkBoard () {
    // check rows
    for (let i = 0; i <= 6; i = i + 3) {
      if (game.board[i] !== 'E' && game.board[i] === game.board[i + 1] && game.board[i + 1] === game.board[i + 2]) {
        return true
      }
    }

    // check columns
    for (let i = 0; i <= 2; i++) {
      if (game.board[i] !== 'E' && game.board[i] === game.board[i + 3] && game.board[i + 3] === game.board[i + 6]) {
        return true
      }
    }

    // check diagonals
    for (let i = 0, j = 4; i <= 2; i = i + 2, j = j - 2) {
      if (game.board[i] !== 'E' && game.board[i] === game.board[i + j] && game.board[i + j] === game.board[i + 2 * j]) {
        return true
      }
    }
    return false
  }
}

export default game
