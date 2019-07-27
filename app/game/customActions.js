// these are container actions
const customActions = (dispatch) => {

  const lock = (id, cabinet) => {
    const decor = cabinet.draws.decor
    if (!keyCheck(id, decor)) return dispatch({ action: 'remark', msg: `You do not have ${decor[id].box.key}` })
    delete decor[id].actions.env.lock
    delete decor[id].actions.env.open
    decor[id].actions.env.unlock = () => custom({ action: 'unlock', id: 'chest' })
    dispatch({ action: 'customUpdate', thing: 'not-prose' })
  }

  const unlock = (id, cabinet) => {
    const decor = cabinet.draws.decor
    //console.log('custom actions unlocking')
    if (!keyCheck(id, decor)) return dispatch({ action: 'remark', msg: `You need the ${decor[id].box.key} to open the ${id}` })
    // change unlock to lock, add open (close?)

    delete decor[id].actions.env.unlock
    decor[id].actions.env.lock = () => custom({ action: 'lock', id: 'chest' })
    decor[id].actions.env.open = () => custom({ action: 'open', id: 'chest' })
    //console.log(decor[id])

    dispatch({ action: 'customUpdate', thing: 'not-prose' })
  }

  const keyCheck = (id, decor) => {
    const prop = decor[id]
    const box = prop.box
    if (!box.key) return true
    if (!box.locked) return true

    //const keyLocs = decor[box.key].locs
    //console.log('hasKey', decor[box.key].locs)
    const keys = decor[box.key].locs.filter(l => {
      if (l == 'bod' || l == 'inv') return true
    })

    if (keys.length > 0) return true

    return false
  }

  const open = (boxId, cabinet) => {
    console.log('custom actions opening')
    // find contents of box
    // for display in box div

    let contents = findPropBox(boxId, cabinet.draws.decor)


    //let contents = cabinet.draws.decor[id].contains
    //delete cabinet.draws.decor[id].actions.env.open
    //cabinet.draws.decor[id].open = true
    //cabinet.draws.decor[id].actions.env.close = () => dispatch({ action: 'customUpdate', id: id, act: 'close' })
    dispatch({ action: 'customUpdate', box: boxId })
  }

  const findPropBox = (boxId, decor) => {
    console.log('boxId', boxId)

    for (let p in decor) {
      if (decor[p].boxs == boxId) {
        console.log('found', decor[p].code)
      }
    }

    // let a = decor.map(p => {
    //   if (p.boxs) {
    //     p.boxs.map(b => {
    //       if (b == boxId) console.log('found', p.code)
    //     })
    //   }
    // })
  }

  // This is a custom action rather than a container action.
  const crush = () => {
    // The object is crushed (modify to crushedObject ?)
  }

  return {
    lock,
    unlock,
    open
  }
}
