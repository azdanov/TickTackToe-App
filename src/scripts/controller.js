import game from './game'

export default function initializeUI () {
  const table = document.querySelector('table')
  const info = document.getElementById('info')
  const score = document.getElementById('score')
  const choices = document.querySelectorAll('#choice span')
  const cells = document.querySelectorAll('td')

  for (let choice of choices) {
    choice.addEventListener('click', (event) => {
      table.dataset.player = event.currentTarget.dataset.choice
      table.dataset.ai = event.currentTarget.dataset.choice === 'cross' ? 'circle' : 'cross'
      choice.parentNode.setAttribute('hidden', '')
      initBoard()
    })
  }

  const resetBoard = () => {
    delete table.dataset.winner

    for (let cell of cells) {
      cell.dataset.state = 'E'
      cell.classList = ''
    }

    info.setAttribute('hidden', '')
    score.setAttribute('hidden', '')
    initBoard()
  }

  const addIcon = (event) => {
    if (event.type === 'playerTurn' || event.type === 'mouseover') {
      event.currentTarget.classList.add(`icon-${table.dataset.player}`)
    } else if (event.type === 'aiTurn') {
      event.currentTarget.classList.add(`icon-${table.dataset.ai}`)
    }
  }

  const removeIcon = (event) => {
    event.currentTarget.classList.remove(`icon-${table.dataset.player}`)
  }

  const updateScore = (winner) => {
    const computerScore = document.getElementById('computer-score')
    const playerScore = document.getElementById('player-score')
    if (winner === 'Player') {
      playerScore.textContent = parseInt(playerScore.textContent, 10) + 1
    } else if (winner === 'Computer') {
      computerScore.textContent = parseInt(computerScore.textContent, 10) + 1
    }
  }

  const gameOver = () => {
    for (let cell of cells) {
      cell.removeEventListener('click', game.playerTurn)
      cell.removeEventListener('mouseout', removeIcon)
      cell.removeEventListener('mouseover', addIcon)
    }

    let winner
    if (table.dataset.winner === 'P') {
      winner = 'Player'
    } else if (table.dataset.winner === 'C') {
      winner = 'Computer'
    } else {
      winner = 'Draw'
    }

    info.innerHTML = `${winner === 'Draw' ? 'It\'s a draw..' : `${winner} won!`}</p>`
    info.removeAttribute('hidden')
    score.removeAttribute('hidden')
    updateScore(winner)
    window.setTimeout(resetBoard, 4000)
  }

  const initBoard = () => {
    table.removeAttribute('hidden')

    game.initializeBoard()

    const markCell = (event) => {
      event.currentTarget.removeEventListener('mouseout', removeIcon)
      event.currentTarget.removeEventListener('mouseover', addIcon)
      addIcon(event)
    }

    for (let cell of cells) {
      cell.addEventListener('mouseover', addIcon)
      cell.addEventListener('mouseout', removeIcon)
      cell.addEventListener('playerTurn', markCell)
      cell.addEventListener('aiTurn', markCell)
      cell.addEventListener('click', game.playerTurn)
    }
    table.addEventListener('gameOver', gameOver)
  }
}
