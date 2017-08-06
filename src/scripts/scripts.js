import initializeUI from './controller'
import favicon from './favicon'

export const aiTurn = new Event('aiTurn')
export const playerTurn = new Event('playerTurn')
export const gameOver = new Event('gameOver')

initializeUI()
favicon()
