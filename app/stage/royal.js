const royal = (draws) => {

  const propsAtLoc = (loc) => { return draws.tools.propsAtLoc(loc, draws.decor) }
  const propsInBox = (box) => { return draws.tools.propsInBox(box, draws.decor) }

  const actionEmos = (actionName) => {
    if (actionName == 'pickUp') return '<span title="Pick me up" >🤏</span>'
    if (actionName == 'grab') return '<span title="Take me out of the bag" >🤏</span>'
    if (actionName == 'bagIt') return '<span title="pop into the bag" >🎒</span>'
    if (actionName == 'look') return '<span title="lookey see" >👁‍🗨</span>'
    if (actionName == 'inspect') return '<span title="peeky peek" >🔎</span>'
    if (actionName == 'examine') return '<span title="examine closely" >🔬</span>'
    if (actionName == 'dropIt') return '<span title="drop me" >👐</span>'
    if (actionName == 'boxIt') return '<span title="put me in the box" >🎁</span>'

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

    el('things', 'things box', 'box').div()
    el('things', 'things body', 'bod').div()
    el('things', 'things inventory', 'inv').div()

    place()
  }

  const place = (d) => {
    const placeId = draws.character.location
    const place = draws.places[placeId]

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
    doProps(draws.character.location)
    doProps('bod')
    doProps('inv')
    doBoxes(d)
  }

  const doBoxes = (d) => {
    if (!d || !d.box) return
    let inBox = propsInBox(d.box)
    document.getElementById('box').innerHTML = ''
    inBox.map(pid => {
      const prop = draws.decor[pid]
      el('box', 'box prop', `box-${prop.code}`).div()
      el( `box-${prop.code}`, 'box title').div(prop.code)
      propsActions(prop, 'box')
    })
  }

  const doProps = (loc) => {
    const propIds = propsAtLoc(loc)
    if (loc != 'bod' && loc != 'inv' && loc != 'box') loc = 'env'
    document.getElementById(loc).innerHTML = ''
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
    if (prop.usedIn.length > 0) {
      el(`${container}-${prop.code}`, 'action i').button('combo', e => console.log('combo'))
    }
  }

  const placeExits = (place) => {
    document.getElementById('exits').innerHTML = ''
    el('exits', 'title').div('Exits')
    place.exits.map(e => {
      const exit = draws.places[e.to]
      //console.log(exit)

      if (exit.doors) {
        makeDoor(e, exit)
      } else {
        makeExit(e)
      }

      //e.actions? exitActions(e, place): makeExit(e)


    })
  }

  const makeDoor = (e, exit) => {
    //console.log(e, exit)
    exit.doors.map(d => {
      //console.log(d)
      if (d.locked) {
        el('exits', 'exit', e.to).div(e.to)
        el(e.to, 'exit').button('unlock', () => custom({ action: 'unlockDoor', id: { name: d.name, to: e.to, key: d.key } }))
      } else {
        el('exits', 'exit', e.to).div(e.to)
        el(e.to, 'exit').button('open', () => draws.tools.move(e.to))
      }

    })
  }

  const makeExit = (e) => {
    el('exits', 'exit', e.to).div()
    el(e.to, 'exit').button(ctt(e.to), () => draws.tools.move(e.to))
  }

  const update = (d) => {
    if (d.type == 'prose') {
      document.getElementById('placeProse').innerHTML = draws.places[d.code].prose
      console.log('🎀' + draws.places[d.code].prose)

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
    console.log(`👁‍🗨 ${d.code}`, prop)
  }

  const respond = (d) => {
    console.log('respond', d.msg)
    document.getElementById('respond').innerHTML = d.msg
  }

  const doorsUpdate = (d) => {
    let place = draws.places[draws.character.location]
    placeExits(place)
  }

  // const customUpdate = (d) => {
  //   place(d)
  // }


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
