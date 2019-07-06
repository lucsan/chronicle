console.log('%c--> Actions', 'color: green;')

const actions = () => {

  const defaultActions = (id, action) => {
    return {
      env: {
        pickUp: () => action('env->bod', id),
        //pickUp: () => dispatch({ action: 'env->bod', id: id}), //action('env->bod', id),
        look: () => action('look', id)
      },
      bod: {
        examine: () => action('look', id),
        bagIt: () => action('bod->inv', id),
        dropIt: () => action('bod->env', id)
      },
      inv: {
        grab: () => action('inv->bod', id),
        inspect: () => action('look', id)
      }
    }
  }

  const doAction = (act, id, cabinet) => {
    console.log('act', act, id, cabinet)
    if (act == 'env->bod') return changePropLocation('env', 'bod', id, cabinet)
    if (act == 'bod->env') return changePropLocation('bod', 'env', id, cabinet)
    if (act == 'bod->inv') return changePropLocation('bod', 'inv', id, cabinet)
    if (act == 'inv->bod') return changePropLocation('inv', 'bod', id, cabinet)
    if (act == 'look') {
      return dispatch({ action: 'look', code: id, msg: cabinet.draws.decor[id].desc })
    }
    if (act == 'combine') return combineProps(id, cabinet)

    doCustomAction(act, id, cabinet)
  }

  const doCustomAction = (act, id, cabinet) => {
    if (act == 'kick') return dispatch({ action: 'msg', code: id, msg: `You kicked 🦵 a ${id}` })
  }

  const doMove = (to, cabinet) => {
    const currentLocation = cabinet.draws.character.location
    let moves = cabinet.draws.character.moves
    let name = cabinet.draws.character.name
    console.log('act', to)
    cabinet.use({ character: { location: to, moves: ++moves }})
    loadProse(to, cabinet)
    cabinet.use({ saves: { [name]: { character: cabinet.draws.character } } })
    cabinet.use({ saves: { [name]: { [to]: to } } })
    saveGame(cabinet.draws)
    dispatch({ action: 'move', from: currentLocation, to: to, msg: 'char moved' })
  }

  const loadProse = (to, cabinet) => {
    const place = cabinet.draws.places[to]
    if (!place.proseScript || place.prose) return
    scriptsLoader([`app/data/places/${place.proseScript}.js`], () => {
      place.prose = Function(`return ${place.proseScript}_prose`)()
      dispatch({ action: 'update', type: 'prose', code: to, msg: 'prose found' })
    })
  }

  const changePropLocation = (from, to, id, cabinet) => {
    let loc = cabinet.draws.character.location

    if (from == 'env') from = loc
    if (to == 'env') to = loc
    let locs = cabinet.draws.decor[id].locs
      console.log(locs, from)
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

    let name = cabinet.draws.character.name
    cabinet.use({ saves: { [name]: { decor: cabinet.draws.decor } } } )
    saveGame(cabinet.draws)

    dispatch({ action: 'prop', from: from, to: to, code: id })
  }

  const combineProps = (id, cabinet) => {
    let proposedProp = cabinet.draws.decor[id]
    console.log(`you are attempting to combine ${proposedProp.code}`)
    console.log(`you need ${proposedProp.combines.needs}`)

    let dontHave = proposedProp.combines.needs.filter(n => {
      needed = cabinet.draws.decor[n]
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


// const customAction = (detail) => {
//   //actions
//   //detail.custom = true
//   //console.log('customAction', detail)
//   //const dispatch = (detail) => {
//     document.dispatchEvent(
//       new CustomEvent(
//         'chronicle_dispatch',
//         { detail: detail }
//       )
//     )
//   //}
// }
