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
    if (!keyCheck(id, decor)) return dispatch({ action: 'remark', msg: `You need the ${decor[id].box.key} to open the ${id}` })

    delete decor[id].actions.env.unlock
    decor[id].actions.env.lock = () => custom({ action: 'lock', id: 'chest' })
    decor[id].actions.env.open = () => custom({ action: 'open', id: 'chest' })

    dispatch({ action: 'customUpdate', thing: 'not-prose' })
  }

  const keyCheck = (id, decor) => {
    const prop = decor[id]
    const box = prop.box
    if (!box.key) return true
    if (!box.locked) return true
    const keys = decor[box.key].locs.filter(l => {
      if (l == 'bod' || l == 'inv') return true
    })
    if (keys.length > 0) return true
    return false
  }

  const open = (boxId, cabinet) => {
    //cabinet.use({ openBox: boxId })
    cabinet.draws.openBox = boxId
    // add putInBox action here?
    dispatch({ action: 'customUpdate', box: boxId })
  }

  const putIn = () => {
    // maybe not putIn, maybe use open?

    // tells the system which box to put stuff in

    // add put in box action to items
  }




  // This is a custom action rather than a container action.
  const crush = () => {
    // The object is crushed (modify to crushedObject ?)
  }

  return {
    lock,
    unlock,
    open,
  }
}
