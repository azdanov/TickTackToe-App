export default function favicon () {
  const favIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAFoAgMAAAAHi4lGAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AQYAAscTUjtFgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAACVBMVEUAAAAAAAD///+D3c/SAAAAAXRSTlMAQObYZgAAAAFiS0dEAmYLfGQAAACgSURBVHja7dqhDQAgEATBb4LSrv9WcEhISEDArP1k7JurmtSS7F4XodFoNBqNRqPRaDQajUaj0Wg0Go1Go9FoNBqNRqPRaDQajb5D51hoNBr9Ie3LoNFoNBqNRqPRaDQajUaj0Wg0Go1Go9FoNBqNRqPRaPTIxgyNRqPtVNFoNBqNRqPRaDQajUaj0Wg0Go1Go9FoNBqNRqPRaDQajX6J7hbpSGekCzBLAAAAAElFTkSuQmCC'

  const docHead = document.getElementsByTagName('head')[0]
  const newLink = document.createElement('link')
  newLink.rel = 'shortcut icon'
  newLink.href = favIcon
  docHead.appendChild(newLink)
}
