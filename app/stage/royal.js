const royal = (draws) => {

  const dispatch = draws.tools.dispatch
  console.log(draws.tools.dispatch)

  const build = () => {
    el('banner', 'display', 'playerDetails').div('Player: ')
    el(undefined, 'display', 'characterDetails').div('Character: ')

    el(undefined, 'display', 'containers').div()
    el(undefined, 'display', 'respond').div()
    el(undefined, 'display', 'testArea').div()

    el('containers', 'boxes', 'boxes').div()
    el('containers', 'place', 'place').div()
    el('boxes', 'inventory', 'inv').div()
    el('boxes', 'body', 'bod').div()
  }

  const move = (d) => {
    const place = draws.places[d.to]
    document.getElementById('place').innerHTML = ''
    //console.log('royal', d, 'place', place)
    el('place', 'placeTitle').div(place.desc)
    if (place.prose) {
      pd = el('place', 'prose', 'prose').div().innerHTML = place.prose
    }
    placeExits(place)
  }

  const placeExits = (place) => {
    el('place', 'exits', 'exits').div()
    el('exits', 'title').div('Exits')
    place.exits.map(e => {
      el('exits', 'exit', e.to).div()
      //el(e.to, 'exit').button(camelToDesc(e.desc), () => {exitAction(e.to)})
      el(e.to, 'exit').button(e.desc, () => dispatch({ action: 'move', to: e.to }))
    })
  }

  const look = (d) => {}
  const prop = (d) => {}
  const update = (d) => {}
  const combine = (d) => {}
  const remark = (d) => {}

  return {
    build,
    move,
    look,
    prop,
    update,
    combine,
    remark
  }
}


const stageRoyal1 = (rigging) => {

  const build = () => {
    el('banner', 'display', 'playerDetails').div('Player: ')
    el(undefined, 'display', 'characterDetails').div('Character: ')

    el(undefined, 'display', 'containers').div()
    el(undefined, 'display', 'respond').div()
    //el(undefined, 'display', 'prose').div()
    el(undefined, 'display', 'testArea').div()

    el('containers', 'boxes', 'boxes').div()
    el('containers', 'place', 'place').div()
    el('boxes', 'inventory', 'inv').div()
    el('boxes', 'body', 'bod').div()

  }

  const inputPlayerName = (eventAction) => {
    el('playerDetails', undefined, 'playerForm').div('Player')
    el('playerForm', undefined, 'playerName').input()
    el('playerForm', 'buttonClass', 'playerNameOKButton' ).button( 'OK', eventAction)
  }

  const updatePlayer = () => {
    document.getElementById('playerDetails').innerHTML = `Player: ${rigging().player.name}`
  }

  const clearPlayerInput = () => { el().removeElement('playerForm') }

  const inputCharacterName = (eventAction) => {
    el('characterDetails', undefined, 'charForm').div('character')
    el('charForm', undefined, 'charName').input()
    el('charForm', 'buttonClass', 'charNameOKButton' ).button( 'OK', eventAction)
  }

  const clearCharacterInput = () => {el().removeElement('charForm') }

  const updateCharacter = () => {
    document.getElementById('characterDetails').innerHTML = ''
    el('characterDetails', undefined, 'name').div(`character: ${rigging().character.name}`)
    el('characterDetails', undefined, 'health').div(`health: ${rigging().character.health}`)
  }

  const characterMoved = () => {
    //console.log('cm', rigging());
    let placeId = rigging().character.location
    let place = rigging().places[placeId]
    document.getElementById('place').innerHTML = ''
    el('place', 'placeTitle').div(place.title)
    el('place', 'desc', 'placeDesc').div(place.desc)
    if (place.prose) {
      pd = el('place', 'prose', 'prose').div().innerHTML = place.prose
    }
    //if (!place.prose) console.log('no prose');
    el('place', 'environ', 'env').div()
    el('place', 'exits', 'exits').div()
    el('exits', 'title').div('Exits')
    doExits(place.exits, rigging().exitAction)
    movedPlace()
  }

  const doExits = (exits, exitAction) => {
    for (let e of exits) {
      el('exits', 'exit', e.to).div()
      if (!e.actions) {
        el(e.to, 'exit').button(camelToDesc(e.desc), () => {exitAction(e.to)})
      } else {
        doExitActions(e)
      }
    }
  }

  const doExitActions = (exit) => {
    el(exit.to, 'exitActions').div(camelToDesc(exit.desc))
    for (let i in exit.actions) {
      //exit.actions[i].desc
      el(exit.to, 'exitAction', `exitAction-${i}`).button(camelToTitle(i), exit.actions[i])
    }

  }

  const movedPlace = () => {
    let placeId = rigging().character.location
    let place = rigging().places[placeId]
    doBox('env', place.title, place.props)
  }

  const updatePlaceBox = () => {
    let placeId = rigging().character.location
    let place = rigging().places[placeId]
    document.getElementById('env').innerHTML = ''
    //el('place', 'env', 'env').div()
    doBox('env', place.title, place.props)
  }

  const updateBoxes = () => {
    let boxes = rigging().boxes
    document.getElementById('boxes').innerHTML = ''
    for (let boxId in boxes) { // each box (inv, bod, hand, head etc)
      el('boxes', boxId, boxId).div()
      let title = boxId
      if (title === 'inv') title = 'Backpack'
      if (title === 'bod') title = 'In Hand'
      doBox(boxId, title, boxes[boxId])
    }
  }

  const doBox = (boxId, title, propsInBox) => {
    if (boxId !== 'env') { el(boxId, 'title').div(title) }
    doProps(boxId, propsInBox)
  }

  const doProps = (boxId, propsInBox) => {
    for (let prop of propsInBox) {
      //document.getElementById(prop.id).innerHTML = ''
      el(boxId, undefined, prop.id).div()
      el(prop.id, 'propTitle').div(prop.title)
      doCombos(prop, boxId)
      doActions(prop, boxId)
    }
  }

  const doActions = (prop, boxId) => {
    let acts = prop.actions[boxId]
    for (let i in acts) {
      const title = camelToTitle(i)
      const emo = emojify(title)
      const legend = emo? `<span title="${title}" >${emo}</span>`: title;
      el(prop.id, 'action', `${i}-${prop.id}`).button(legend, acts[i])
    }
  }

  const doCombos = (prop, boxId) => {
    if (prop.usedIn.length > 0) {
      prop.usedIn.map( (i) => {
        el(prop.id, 'combine', `combine-${prop.id}`).button(`used in making <span class="clickable">${camelToTitle(i)}</span>`, () => {rigging().comboAction(i)})
      })
    }
  }

  const respond = (msg) => { document.getElementById('respond').innerHTML = msg }

  const propMoved = () => {
    updateBoxes()
    updatePlaceBox()
    //movedPlace()
  }

  return {
    build,
    inputPlayerName,
    clearPlayerInput,
    updatePlayer,
    inputCharacterName,
    clearCharacterInput,
    updateCharacter,
    characterMoved,
    propMoved,
    updateBoxes,
    respond
  }
}
