console.log('%c--> Actions', 'color: green;')

const actions = () => {

  const defaultActions = (id, action, draws) => {
    let defaults = {
      env: {
        look: () => action('look', id),
      },
      bod: {
        examine: () => action('look', id),
        bagIt: () => action('bod->inv', id),
        dropIt: () => action('bod->env', id),
        boxIt: () => action('bod->box', id)
      },
      inv: {
        grab: () => action('inv->bod', id),
        inspect: () => action('look', id)
      },
      box: {
        take: () => action('box->bod', id),
        view: () => action('look', id)
      }
    }

    let prop = draws.props[id]

    if (!prop.actions) prop.actions = {}

    for (let box in defaults) {
      if (!prop.actions[box]) prop.actions[box] = {}
      for (let act in defaults[box]) {
        if (!prop.actions[box][act]) prop.actions[box][act] = defaults[box][act]
      }
    }

    if (prop.pickUp) prop.actions.env.pickUp = () => action('env->bod', id)
    if (prop.box) {
      if (prop.box.key) {
        prop.actions.env.unlock = () => { action('unlock', id) }
      } else {
        if (!prop.actions.env.open) prop.actions.env.open = () => { action('open', id) }
      }
    }
    if (prop.pays) {
      prop.actions.env.dispense = () => { action('dispense', id) }
    }

  }

  const doAction = (act, id, cabinet) => {
    // console.log('act', act, id, cabinet)
    if (act == 'env->bod') return changePropLocation('env', 'bod', id, cabinet)
    if (act == 'bod->env') return changePropLocation('bod', 'env', id, cabinet)
    if (act == 'bod->inv') return changePropLocation('bod', 'inv', id, cabinet)
    if (act == 'inv->bod') return changePropLocation('inv', 'bod', id, cabinet)
    if (act == 'box->bod') return changePropLocation('box', 'bod', id, cabinet)
    if (act == 'bod->box') return changePropLocation('bod', 'box', id, cabinet)
    if (act == 'combine') return combine(id, cabinet)
    if (act == 'look') return dispatch({ action: 'look', code: id })
    if (act == 'remark') return dispatch({ action: 'remark', msg: id })

    doBoxAction(act, id, cabinet)
  }

  // TODO: rename doCustomAction
  const doBoxAction = (act, id, cabinet) => {

    // console.log('action', act, id, cabinet)

    if (act == 'lock') return customActions(dispatch).lock(id, cabinet)
    if (act == 'unlock') return customActions(dispatch).unlock(id, cabinet)
    if (act == 'open') return customActions(dispatch).open(id, cabinet)

    if (act == 'dispense') return customActions(dispatch).dispense(id, cabinet)

    if (act == 'unlockDoor') return customActions(dispatch).unlockDoor(id, cabinet)
    //if (act == 'enter') return customActions(dispatch).enter(id, cabinet, 'test' )
    if (act == 'enter') return customActions(dispatch).enter(id, cabinet, doMove )
    //doMove(id.to, cabinet)   

    console.error('Action not found ', act, id)

  }

  const doMove = (to, cabinet) => {
    cabinet.draws.openBox = ''
    loadProse(to, cabinet)
    const currentLocation = cabinet.draws.character.location
    let moves = cabinet.draws.character.moves
    cabinet.use({ character: { location: to, moves: ++moves }})

    let name = cabinet.draws.character.name
    cabinet.use({ saves: { [name]: { [to]: to } } })
    updateSave(cabinet)

    saveGame(cabinet.draws)
    dispatch({ action: 'move', from: currentLocation, to, msg: 'char moved' })
  }

  const loadProse = (to, cabinet) => {
    const place = cabinet.draws.places[to]
    if (!place) return dispatch({ action: 'remark', msg: `no set for ${to} check setsPlans to see if it exists.` })
    if (!place.proseScript || place.prose) return
    scriptsLoader([`app/data/${versionConfig.version}/places/${place.proseScript}.js`], () => {
      place.prose = Function(`return ${place.proseScript}_prose`)()
      dispatch({ action: 'update', type: 'prose', code: to, msg: 'prose found' })
    })
  }

  const changePropLocation = (from, to, id, cabinet) => {
    if (from == 'box') return moveFromBox(id, cabinet)
    if (to == 'box') return moveToBox(id, cabinet)

    let loc = cabinet.draws.character.location

    if (from == 'env') from = loc
    if (to == 'env') to = loc
    let locs = cabinet.draws.decor[id].locs
    if (!locs.find(l => l == from)) return

    locs = slide(from, locs)
    locs.push(to)
    cabinet.use({ decor: { [id]: { locs: locs } } })

    updateSave(cabinet)
    saveGame(cabinet.draws)
    dispatch({ action: 'prop', from: from, to: to, code: id })
    let msg = ''
    if (from != 'inv' && from != 'bod') msg = `you picked up the ${ctt(id)}`
    if (to != 'inv' && to != 'bod') msg = `you dropped the ${ctt(id)} at ${ctt(to)}`

    remark(msg)
  }



  const moveToBox = (id, cabinet) => {
    if (cabinet.draws.openBox == '') return
    if(!cabinet.draws.decor[id].boxs) cabinet.use({ decor: { [id]: { boxs: [] } } })

    const boxs = cabinet.draws.decor[id].boxs
    const locs = cabinet.draws.decor[id].locs

    const newLocs = slide('bod', locs)
    boxs.push(cabinet.draws.openBox)
    cabinet.use({ decor: { [id]: { locs: newLocs } } })
    cabinet.use({ decor: { [id]: { boxs: boxs } } })

    dispatch({ action: 'prop', box: cabinet.draws.openBox })
    dispatch({ action: 'remark', msg: `You put ${id} in ${cabinet.draws.openBox}` })
  }


  const moveFromBox = (id, cabinet) => {
    const boxs = cabinet.draws.decor[id].boxs
    const boxId = cabinet.draws.openBox
    if (!boxs.find(b => b == cabinet.draws.openBox)) return

    let a = boxs.filter(b => {
      return b != cabinet.draws.openBox
    })

    const newBoxs = slide(boxId, boxs)
    cabinet.draws.decor[id].boxs = newBoxs

    cabinet.draws.decor[id].locs.push('bod')

    //console.log('movefrombox', id, cabinet.draws.decor[id].boxs, cabinet.draws.openBox)
    dispatch({ action: 'prop', box: cabinet.draws.openBox })
    dispatch({ action: 'remark', msg: `You got a ${ctt(id)} from the ${ctt(boxId)}` })
  }



  const updateSave = (cabinet) => {
    const name = cabinet.draws.character.name
    cabinet.use({ saves: { [name]: { character: cabinet.draws.character } } })
    cabinet.use({ saves: { [name]: { decor: cabinet.draws.decor } } } )
  }

  const combine = (id, cabinet) => {
    console.log('make', id)
    combinate(id, cabinet)
  }

  const combinate = (newPropId, cabinet) => {
    console.log('combining for ' + newPropId)
    let needs = cabinet.draws.decor[newPropId].combines.needs
    console.log('needs', needs)
    let has = findInBags(needs, cabinet)
    let hasText = has.map(n => ctt(n)).join(', ')
    if (has.length < 1) hasText = 'nothing'
    const needsNotMetMsg = `you need ${needs.map(n => ctt(n)).join(', ')} you have ${hasText} for ${ctt(newPropId)}`
    if (has.length < needs.length) return dispatch({ action: 'remark', msg: needsNotMetMsg })

    makeCombine(newPropId, cabinet)
    dispatch({ action: 'prop', box: '' })
    dispatch({ action: 'remark', msg: `Made ${ctt(newPropId)}`})

  }

  const makeCombine = (newPropId, cabinet) => {
    const needs = cabinet.draws.decor[newPropId].combines.needs
    removeFromBags(needs, cabinet)
    console.log(needs.map(n => { return `${cabinet.draws.decor[n].code} ${cabinet.draws.decor[n].locs}` }))
    cabinet.draws.decor[newPropId].locs.push('bod')
  }

  const destroys = (pid, needs, cabinet) => {
    const destroy = needs
    return destroy
  }

  const removeFromBags = (list, cabinet) => {
    list.map(i => {
      const prop = cabinet.draws.decor[i]
      if (prop.locs.indexOf('inv') > -1) return prop.locs = slide('inv', prop.locs)
      if (prop.locs.indexOf('bod') > -1) return prop.locs = slide('bod', prop.locs)

    })
  }



  const findInBags = (list, cabinet) => {
    let inBag = []
    list.map(i => {
      const prop = cabinet.draws.decor[i]
      if (prop.locs.indexOf('inv') > -1
      || prop.locs.indexOf('bod') > -1) {
        inBag.push(i)
      }
    })
    return inBag
  }


  const dispatch = (detail) => {
    document.dispatchEvent(
      new CustomEvent(
        'chronicle_dispatch',
        { detail: detail }
      )
    )
  }

  const remark = (msg) => dispatch({ action: 'remark', msg: msg })


  return {
    doMove,
    doAction,
    dispatch,
    defaultActions
  }
}
