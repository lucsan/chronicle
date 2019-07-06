const royal = (draws) => {
  //const draws = marshall.cabinet.draws

  const dispatch = draws.tools.dispatch

  let respond = null

  //console.log(draws.tools.dispatch)

  const build = () => {
    el('banner', 'display', 'playerDetails').div('Player: ')
    el(undefined, 'display', 'characterDetails').div('Character: ')

    el(undefined, 'display', 'containers').div()
    el(undefined, 'display', 'testArea').div()

    el('containers', 'place container', 'place').div()
    el('containers', 'display respond', 'respond').div()
    el('containers', 'things container', 'things').div()

    el('place', 'place title placeTitle', 'placeTitle').div()
    el('place', 'place prose', 'placeProse').div()
    el('place', 'place exits', 'exits').div()
    el('things', 'things place placeProps', 'env').div()
    el('things', 'things body', 'bod').div()
    el('things', 'things inventory', 'inv').div()

    respond = document.getElementById('respond')
  }


  const move = (d) => {
    const place = draws.places[d.to]
    document.getElementById('placeTitle').innerHTML = place.desc
    document.getElementById('placeProse').innerHTML = ''
    if (place.prose) document.getElementById('placeProse').innerHTML = place.prose

    placeExits(place)
    placeProps(d.to, 'env')
    placeProps('bod', 'bod')
    placeProps('inv', 'inv')
  }

  const prop = (d) => {
    console.log(`You took 🤜 ${d.code} ${draws.decor[d.code].desc} from ${d.from} to ${d.to} `)

    let placeId = null
    if ( d.from != 'bod' && d.from != 'inv' ) placeId = d.from
    if ( d.to != 'bod' && d.to != 'inv' ) placeId = d.to

    if (placeId) placeProps(placeId, 'env')
    placeProps('inv', 'inv')
    placeProps('bod', 'bod')
  }


  const placeProps = (placeId, container) => {
    const propIds = draws.tools.propsAtLoc(placeId, draws.decor)
    if (document.getElementById(container)) document.getElementById(container).innerHTML = ''
    let title = `🌐${placeId}`
    if (container == 'inv') title = '🎒backpack'
    if (container == 'bod') title = '🤲In Hand'
    el(container, 'title').div(title)
    propIds.map(p => {
      let prop = draws.decor[p]
      el(container, 'prop', prop.code).div()
      el(prop.code, 'title').div(prop.code)
      propsActions(prop, container)
    })
  }

  const propsActions = (prop, container) => {
    const box = prop.actions[container]
    for (let i in box) {
      el(prop.code, 'action').button(actionEmos(i), box[i])
    }
  }

  const actionEmos = (actionName) => {
    if (actionName == 'pickUp') return '<span title="Pick me up" >🤏</span>'
    if (actionName == 'grab') return '<span title="Take me out of the bag" >🤏</span>'
    if (actionName == 'bagIt') return '<span title="pop into the bag" >🎒</span>'
    if (actionName == 'look') return '<span title="lookey see" >👁‍🗨</span>'
    if (actionName == 'inspect') return '<span title="peeky peek" >🔎</span>'
    if (actionName == 'examine') return '<span title="examine closely" >🔬</span>'
    if (actionName == 'dropIt') return '<span title="drop me" >👐</span>'

    return actionName
  }





  const placeExits = (place) => {
    document.getElementById('exits').innerHTML = ''
    el('exits', 'title').div('Exits')
    place.exits.map(e => {
      el('exits', 'exit', e.to).div()
      el(e.to, 'exit').button(e.desc?e.desc:e.to, () => draws.tools.move(e.to))

    })
  }

  const look = (d) => {
    console.log(`👁‍🗨 ${d.code} ${d.id}`, d)
    respond.innerHTML = `Its a ${d.code} ${d.id}`
  }

  const update = (d) => {
    if (d.type == 'prose') {
      document.getElementById('placeProse').innerHTML = draws.places[d.code].prose
      console.log('🎀' + draws.places[d.code].prose)

    }
  }
  const combine = (d) => { console.log(d) }
  const remark = (d) => { console.log(`%c${d.msg}`, 'color:green;font-weight:bold;') }

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


// ---------==================================================================------------------------



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


// const envPropActions = (prop) => {
//   for (let a in prop.actions.env) {
//     //console.log(typeof(prop.actions.env[a]), a)
//     console.log(a, prop.actions.env[a])
//     //let f = typeof(prop.actions.env[a]) === 'function'?prop.actions.env[a]:() => dispatch({ action: a, id: prop.code })
//     //console.log(f)
//     // if (typeof(prop.actions.env[a]) === 'function') {
//     //   el(prop.code, 'prop').button(a, prop.actions.env[a])
//     // } else {
//       //el(prop.code, 'prop').button(a, () => dispatch({ action: a, id: prop.code }))
//       el(prop.code, 'action').button(a, prop.actions.env[a])
//     // }
//
//   }
// }


// const placeProps = (place, d) => {
//   const propIds = draws.tools.propsAtLoc(d.to, draws.decor)
//   propIds.map(p => {
//     let prop = draws.decor[p]
//     // el('place', 'prop', 'props').div()
//     // el('props', 'title').div('Exits')
//     el('place', 'prop', prop.code).div(prop.code)
//     propsActions(prop)
//
//   })
//   //console.log(propIds)
// }
