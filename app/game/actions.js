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
      for (act in defaults[box]) {
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

  }

  const doAction = (act, id, cabinet) => {
    console.log('act', act, id, cabinet)
    if (act == 'env->bod') return changePropLocation('env', 'bod', id, cabinet)
    if (act == 'bod->env') return changePropLocation('bod', 'env', id, cabinet)
    if (act == 'bod->inv') return changePropLocation('bod', 'inv', id, cabinet)
    if (act == 'inv->bod') return changePropLocation('inv', 'bod', id, cabinet)
    if (act == 'box->bod') return changePropLocation('box', 'bod', id, cabinet)
    if (act == 'bod->box') return changePropLocation('bod', 'box', id, cabinet)
    if (act == 'look') return dispatch({ action: 'look', code: id })
    if (act == 'combine') return combineProps(id, cabinet)
    if (act == 'remark') return dispatch({ action: 'remark', msg: id })

    doBoxAction(act, id, cabinet)
  }

  const doBoxAction = (act, id, cabinet) => {

  //  console.log('action', act, id, cabinet)

    if (act == 'lock') return customActions(dispatch).lock(id, cabinet)
    if (act == 'unlock') return customActions(dispatch).unlock(id, cabinet)
    if (act == 'open') return customActions(dispatch).open(id, cabinet)
    if (act == 'unlockDoor') return customActions(dispatch).unlockDoor(id, cabinet)

    console.log('Action not found ', act, id)

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
    dispatch({ action: 'move', from: currentLocation, to: to, msg: 'char moved' })
  }

  const loadProse = (to, cabinet) => {
    const place = cabinet.draws.places[to]
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

    let f = false
    locs = locs.map(l => {
      if (l != from) return l
      if (f == true) return l
      f = true
    })
    locs = locs.filter(l => l != undefined)
    locs.push(to)
    cabinet.use({ decor: { [id]: { locs: locs } } })

    updateSave(cabinet)
    saveGame(cabinet.draws)
    // from to probably not needed here
    dispatch({ action: 'prop', from: from, to: to, code: id })
  }

  const moveToBox = (id, cabinet) => {
    if (cabinet.draws.openBox == '') return
    if(!cabinet.draws.decor[id].boxs) cabinet.use({ decor: { [id]: { boxs: [] } } })

    const boxs = cabinet.draws.decor[id].boxs
    const locs = cabinet.draws.decor[id].locs

    const newLocs = locs.filter(b => { return b != 'bod' })
    boxs.push(cabinet.draws.openBox)

    cabinet.use({ decor: { [id]: { locs: newLocs } } })
    cabinet.use({ decor: { [id]: { boxs: boxs } } })

    //console.log('moveToBox', id, cabinet, 'openBox', cabinet.draws.openBox)
    dispatch({ action: 'prop', box: cabinet.draws.openBox })
  }

  const moveFromBox = (id, cabinet) => {

    const boxs = cabinet.draws.decor[id].boxs
    if (!boxs.find(b => b == cabinet.draws.openBox)) return

    let a = boxs.filter(b => {
      return b != cabinet.draws.openBox
    })
    cabinet.draws.decor[id].boxs = a
    cabinet.draws.decor[id].locs.push('bod')

    //console.log('movefrombox', id, cabinet.draws.decor[id].boxs, cabinet.draws.openBox)
    dispatch({ action: 'prop', box: cabinet.draws.openBox })

  }

  const updateSave = (cabinet) => {
    const name = cabinet.draws.character.name
    cabinet.use({ saves: { [name]: { character: cabinet.draws.character } } })
    cabinet.use({ saves: { [name]: { decor: cabinet.draws.decor } } } )
  }

  const combineProps = (id, cabinet) => {
    let proposedProp = cabinet.draws.decor[id]
    console.log(`you are attempting to combine ${proposedProp.code}`)
    console.log(`you need ${proposedProp.combines.needs}`)

    let dontHave = proposedProp.combines.needs.filter(n => {
      let needed = cabinet.draws.decor[n]
      if (!needed.locs.find(l => l == 'bod' || l == 'inv')) return needed.code
    })

    if (dontHave.length > 0) {
      proposedProp.combines.missing = dontHave
      console.log(`you are short `, dontHave)
      dispatch({ action: 'combine', status: 'failure', code: id, msg: `You needed ${dontHave}` })
      return
    }

    console.log(`Yay you have it all, you can make ${id}`)

    proposedProp.combines.needs.map(i => {
      let used = cabinet.draws.decor[i]
      let f = false
      let b = used.locs.map(l => {
        if (l == 'bod' || l == 'inv') f = true
        if (f) {
          f = false
          return null
        }
        return l
      })
      let c = b.filter(l => l != null)
      used.locs = c
    })

    proposedProp.locs.push('bod')

    console.log(cabinet.draws.decor['lintStick'])
    dispatch({ action: 'combine', status: 'success', code: id, msg: `You created ${id}` })

  }

  const dispatch = (detail) => {
    document.dispatchEvent(
      new CustomEvent(
        'chronicle_dispatch',
        { detail: detail }
      )
    )
  }

  return {
    doMove,
    doAction,
    dispatch,
    defaultActions
  }
}
