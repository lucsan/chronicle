console.log('%c--> loadGameSave', 'color:green')

const saveGame = (draws) => {
  const saveName = draws.character.name
  console.log('saves', draws.saves)
  localStorage.setItem(saveName, JSON.stringify(draws.saves))
}

const loadGame = (cabinet) => {
  const player = JSON.parse(localStorage.getItem('player'))
  const saves = JSON.parse(localStorage.getItem(player.character))

  if (saves != null && saves[player.character] != undefined) {
    cabinet.use({ character: { location: saves[player.character].character.location } })
    cabinet.use({ decor: saves[player.character].decor })
  }
}
