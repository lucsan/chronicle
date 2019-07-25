const royal = (draws) => {

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

  const build = () => {
    el('banner', 'display', 'playerDetails').div('Player: ')
    el(undefined, 'display', 'characterDetails').div('Character: ')

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

    el('things', 'things body', 'bod').div()
    el('things', 'things inventory', 'inv').div()

    //el('things', 'things inventory', 'inv').div()

    //respond = document.getElementById('respond')
    place()
  }

  const place = (d) => {
    const placeId = draws.character.location
    const place = draws.places[placeId]
    const propIds = draws.tools.propsAtLoc(placeId, draws.decor)

    document.getElementById('placeTitle').innerHTML = ctt(placeId)
    document.getElementById('placeDesc').innerHTML = ''
    if (place.desc) document.getElementById('placeDesc').innerHTML = place.desc

    document.getElementById('placeProse').innerHTML = ''
    if (place.prose) document.getElementById('placeProse').innerHTML = place.prose

    // console.log(placeId)
    // console.log(propIds)
    // console.log(draws)
    if (d) document.getElementById('respond').innerHTML = `Moved from ${ctt(d.from)} to ${ctt(d.to)}`

    //placeProps()
    //bodProps()
    //invProps()

    placeExits(place)
    propMoved()
    // doProps(draws.character.location)
    // doProps('bod')
    // doProps('inv')
  }

  const propMoved = () => {
    // placeProps()
    // bodProps()
    // invProps()
    doProps(draws.character.location)
    doProps('bod')
    doProps('inv')
  }

  const doProps = (loc) => {
    const propIds = draws.tools.propsAtLoc(loc, draws.decor)
    if (loc != 'bod' && loc != 'inv') loc = 'env'
    document.getElementById(loc).innerHTML = ''
    propIds.map(p => {
      let prop = draws.decor[p]
      el(loc, 'prop', `${loc}-${prop.code}`).div()
      el(`${loc}-${prop.code}`, 'title').div(ctt(prop.code))
      propsActions(prop, loc)
    })
  }

  // const placeProps = () => {
  //   const propIds = draws.tools.propsAtLoc(draws.character.location, draws.decor)
  //   document.getElementById('env').innerHTML = ''
  //   propIds.map(p => {
  //     let prop = draws.decor[p]
  //     el('env', 'prop', `env-${prop.code}`).div()
  //     el(`env-${prop.code}`, 'title').div(ctt(prop.code))
  //     propsActions(prop, 'env')
  //   })
  // }
  //
  // const bodProps = () => {
  //   const propIds = draws.tools.propsAtLoc('bod', draws.decor)
  //   document.getElementById('bod').innerHTML = ''
  //   propIds.map(p => {
  //     let prop = draws.decor[p]
  //     el('bod', 'prop', `bod-${prop.code}`).div()
  //     el(`bod-${prop.code}`, 'title').div(ctt(prop.code))
  //     propsActions(prop, 'bod')
  //   })
  // }
  //
  // const invProps = () => {
  //   const propIds = draws.tools.propsAtLoc('inv', draws.decor)
  //   document.getElementById('inv').innerHTML = ''
  //   propIds.map(p => {
  //     let prop = draws.decor[p]
  //     el('inv', 'prop', `inv-${prop.code}`).div()
  //     el(`inv-${prop.code}`, 'title').div(ctt(prop.code))
  //     propsActions(prop, 'inv')
  //   })
  // }

  const propsActions = (prop, container) => {
    const box = prop.actions[container]
    for (let i in box) {
      el(`${container}-${prop.code}`, 'action').button(actionEmos(i), box[i])
    }
    if (prop.usedIn.length > 0) {
      el(`${container}-${prop.code}`, 'action').button('combo', e => console.log('combo'))
    }

  }

  const placeExits = (place) => {
    document.getElementById('exits').innerHTML = ''
    el('exits', 'title').div('Exits')
    place.exits.map(e => {
      el('exits', 'exit', e.to).div()
      el(e.to, 'exit').button(ctt(e.to), () => draws.tools.move(e.to))
    })
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
    document.getElementById('respond').innerHTML = lookText + '</details>'
    console.log(`👁‍🗨 ${d.code}`, prop)
    //testArea.innerHTML = 'barry'
  }

  const respond = () => {}


  return {
    build,
    update,
    look,
    move: place,
    prop: propMoved
  }
}
