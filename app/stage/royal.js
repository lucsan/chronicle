const royal = (draws) => {

  const propsAtLoc = (loc) => { return draws.tools.propsAtLoc(loc, draws.decor) }
  const propsInBox = (box) => { return draws.tools.propsInBox(box, draws.decor) }

  const actionEmos = (actionName) => {
    if (actionName == 'pickUp' || actionName == 'take') return '<span title="Pick me up" >🤏</span>'
    if (actionName == 'grab') return '<span title="Take me out of the bag" >🤏</span>'
    if (actionName == 'bagIt') return '<span title="pop into the bag" >🎒</span>'
    if (actionName == 'look') return '<span title="lookey see" >👁‍🗨</span>'
    if (actionName == 'inspect' || actionName == 'view') return '<span title="peeky peek" >🔎</span>'
    if (actionName == 'examine') return '<span title="examine closely" >🔬</span>'
    if (actionName == 'dropIt') return '<span title="drop me" >👐</span>'
    if (actionName == 'boxIt') return '<span title="put me in the box" >🎁</span>'
    if (actionName == 'combine') return '<span title="Craft things" >🔧</span>'
    if (actionName == 'open') return '<span title="open me" >🖐</span>'
    if (actionName == 'dispense') return '<span title="dispense things" >📮</span>'
    if (actionName == 'unlock') return '<span title="unlock this" >🔓</span>'
    if (actionName == 'lock') return '<span title="unlock this" >🔐</span>'
    if (actionName == 'reveal') return '<span title="reveal any secrets" >💡</span>'

    if (actionName == 'ask') return '<span title="ask me" >👂</span>'
    if (actionName == 'rub') return '<span title="rub me" >👋</span>'
    if (actionName == 'sniff') return '<span title="have a wiff">👃</span>'

    return actionName
  }

  const build = () => {
    el('banner', 'display', 'playerDetails').div('Player: ')
    el(undefined, 'display', 'characterDetails').div('Character: ')
    el(undefined, 'display', 'restart').button('Restart', () => { localStorage.clear() } )

    el(undefined, 'display', 'containers').div()
    el(undefined, 'display', 'testArea').div()

    el('containers', 'place container', 'place').div()
    el('containers', 'display respond', 'respond').div()
    el('containers', 'things container', 'things').div()

    el('place', 'place title placeTitle', 'placeTitle').div()
    el('place', 'place desc placeDesc', 'placeDesc').div()
    el('place', 'place prose', 'placeProse').div()
    el('place', 'things place placeProps', 'env').div()
    el('place', 'place exits', 'exits').div()

    el('things', 'things combo', 'combo').div()
    el('things', 'things box', 'box').div()
    el('things', 'things body', 'bod').div()
    el('things', 'things inventory', 'inv').div()

    place()
  }

  const place = (d) => {
    const placeId = draws.character.location
    const place = draws.places[placeId]

    if (!place) return console.error(`Issue with non existent place, '${placeId}', check versionConfig charStart.`)

    document.getElementById('box').innerHTML = ''
    document.getElementById('combo').innerHTML = ''

    document.getElementById('placeTitle').innerHTML = ctt(placeId)
    document.getElementById('placeDesc').innerHTML = ''
    if (place.desc) document.getElementById('placeDesc').innerHTML = place.desc

    document.getElementById('placeProse').innerHTML = ''
    if (place.prose) document.getElementById('placeProse').innerHTML = place.prose

    if (d && d.from != undefined) document.getElementById('respond').innerHTML = `Moved from ${ctt(d.from)} to ${ctt(d.to)}`

    placeExits(place)
    propMoved(d)
  }

  const propMoved = (d) => {
    document.getElementById('combo').innerHTML = ''
    doProps(draws.character.location)
    doProps('bod')
    doProps('inv')
    doBoxes(d)
    doHidden(d)
  }

  const reveal = (prop) => {
    doHidden({ code: prop.code })
  }

  const doHidden = (d) => {
    if (!d) return
    let exits = draws.places[draws.character.location].exits
    for (const e in exits) {
      let exit = exits[e]
      if (exit.reveal == d.code) {
        el().removeElement(e)
        makeDoor(e, draws.character.location, exit)
      }
    }
  }

  const doBoxes = (d) => {
    if (!d || !d.box) return
    let inBox = propsInBox(d.box)
    document.getElementById('box').innerHTML = ''
    el('box', 'title').div(`🎁 ${ctt(d.box)}`)
    inBox.map(pid => {
      const prop = draws.decor[pid]
      el('box', 'box prop', `box-${prop.code}`).div()
      el( `box-${prop.code}`, 'box title').div(ctt(prop.code))
      propsActions(prop, 'box')
    })
  }

  const doProps = (loc) => {
    const propIds = propsAtLoc(loc)
    if (loc != 'bod' && loc != 'inv' && loc != 'box') loc = 'env'
    document.getElementById(loc).innerHTML = ''
    if (loc == 'inv') el('inv', 'container-title').div('🎒 backpack')
    if (loc == 'bod') el('bod', 'container-title').div('🤲 in hand')
    propIds.map(p => {
      let prop = draws.decor[p]
      el(loc, 'prop', `${loc}-${prop.code}`).div()
      el(`${loc}-${prop.code}`, 'title').div(ctt(prop.code))
      propsActions(prop, loc)
    })
  }

  const propsActions = (prop, container) => {
    const box = prop.actions[container]
    for (let i in box) {
      if (i == 'boxIt' && draws.openBox == '') continue
      el(`${container}-${prop.code}`, `action ${i}`).button(actionEmos(i), box[i])
    }
    // Combo button
    if (prop.usedIn.length > 0 && (container == 'inv' || container == 'bod') ) {
      el(`${container}-${prop.code}`, 'action combo').button(actionEmos('combine'), () => listCombos(prop))
    }

    // reveal hidden exit/object
    if (prop.reveals.length > 0  && (container == 'inv' || container == 'bod')) {
      el(`${container}-${prop.code}`, 'action reveal').button(actionEmos('reveal'), () => reveal(prop))
    }
  }

  const listCombos = (prop) => {
    el().removeElement('combi')
    el('combo', 'combo', 'combi').div()
    el('combi', 'combo title').div('🔧 Combine ' + prop.code)
    prop.usedIn.map(p => {
      const needs = draws.decor[p].combines.needs
      el('combi', 'combo item').div(p + ' needs ' + needs)
      el('combi', 'combo button').button(`Make ${p}`, () => custom({ action: 'combine', id: p }))
    })
  }

  const placeExits = (place) => {

    if (!place.exits && !place.doors) return console.error('Warning, no exits (or doors) provided for ', place) 
    document.getElementById('exits').innerHTML = ''
    el('exits', 'container-title').div('Exits')
    for (let to in place.exits) {
      makeExit( to, place.code, place.exits[to])
    }
  }

  const makeExit = (to, from, exit) => {    
    if (exit.door) {
      makeDoor(to, from, exit)
      return
    }

    el('exits', 'exit', to).div()
    el(to, 'exit').button(exit.label? exit.label: ctt(to), () => draws.tools.move(to))

  }

  const makeDoor = (to, from, exit) => {
    if (exit.reveal && exit.hidden) { return }    

    if (!exit.locked) {
      el('exits', 'exit', to).button(exit.label? exit.label: ctt(to), () => draws.tools.move(to))
      return
    }

    el('exits', 'exit', to).div(exit.label? exit.label: ctt(to)) 

    if (exit.key) {
      el(to, 'exit').button(actionEmos('unlock'), () => custom({ action: 'unlockDoor', id: { to, from } }))
    }
  }

  const update = (d) => {
    if (d.type == 'prose') {
      document.getElementById('placeProse').innerHTML = draws.places[d.code].prose
      //console.log('🎀' + draws.places[d.code].prose)
    }
  }

  const look = (d) => {
    const prop = draws.decor[d.code]
    let lookText = '<details>'
    lookText += '<summary>' + prop.desc + '</summary>'

    if (prop.usedIn.length > 0) {
      lookText += '<div>Used in: ' + prop.usedIn.join(',') + '<div>'
    }
    if (prop.isBox) {
      let txt = prop.contains.length < 1? 'Probably nothing': 'looks interesting'
      lookText += '<div>Contains: ' + txt + '<div>'
    }
    document.getElementById('respond').innerHTML = lookText + '</details>'
    //console.log(`👁‍🗨 ${d.code}`, prop)
  }

  const respond = (d) => { document.getElementById('respond').innerHTML = d.msg }

  const doorsUpdate = () => {
    let place = draws.places[draws.character.location]
    placeExits(place)
  }

  return {
    build,
    update,
    customUpdate: propMoved,
    doorsUpdate,
    look,
    move: place,
    prop: propMoved,
    remark: respond
  }
}
