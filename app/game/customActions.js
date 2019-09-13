console.log('%c--> customActions', 'color: green;')
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
    if (!keyCheck(id, decor)) return dispatch({ action: 'remark', msg: `You need the ${ctt(decor[id].box.key)} to open the ${ctt(id)}` })
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
    cabinet.draws.openBox = boxId
    dispatch({ action: 'customUpdate', box: boxId })
    dispatch({ action: 'remark', msg: `${boxId} opened` })
  }

  const unlockDoor = (info, cabinet) => {
    const { to, from } = info
    let doors = cabinet.draws.places[from].doors
    let door = doors[to]
    
    if (!door) return dispatch({ action: 'remark', msg: `${from} ${to} does not have any instructions.` })
    if (!door.locked) return

    const key = cabinet.draws.decor[door.key]

    if (!key) return dispatch({ action: 'remark', msg: `Prop ${door.key} doesnt exist (see propsPlans).` })
    if (!key.locs.find(l => l == 'bod' || l == 'inv')) return dispatch({ action: 'remark', msg: `You need a ${ctt(door.key)} to unlock this`})

    cabinet.use({ places: { [from]: { doors: { [to]: { locked: false } } } } })
    dispatch({ action: 'remark', msg: `You unlocked ${ctt(to)} with a ${ctt(door.key)}` })
    dispatch({ action: 'doorsUpdate', info: { from, to } })
  }

  const enter = (info, cabinet, doMove) => {
    const { from, to } = info
     
    doMove(to, cabinet)
    //console.log(info)
    
  }

  const paymentRequired = (prop) => {
    if (!prop.pays.criteria) return false
    if (prop.pays.criteria.list.length < 1) return false
    return true
  }

  const missingPayment = (prop, props) => {
    const need = prop.pays.criteria.list
    const list = need.filter(n => {
      const p = props[n]
      if (p.boxs == undefined
        || p.boxs.length < 1
        || p.boxs.indexOf(prop.code) < 0) return n
    })
    return list.length < 1? false: list
  }

  const takePayment = (prop, props, cabinet) => {
    const need = prop.pays.criteria.list
    need.map(n => {
      const boxs = props[n].boxs
      cabinet.draws.decor[n].boxs = slide(prop.code, boxs)
    })
  }

  const dispense = (d, cabinet) => {
    cabinet.draws.openBox = d
    const props = cabinet.draws.decor
    const prop = props[d]
    const pays = prop.pays
    const drops = pays.drops
    const paid = pays.paid
    const max = pays.max

    if (paid >= max) { return dispatch({ action: 'remark', msg: `${d} can't pay out again.` }) }

    if (paymentRequired(prop)) {
      const mp = missingPayment(prop, props)
      if (mp) {
        return dispatch({ action: 'remark', msg: `You need to put ${mp} in` })
      } else {
        takePayment(prop, props, cabinet)
      }
    }

    drops.map(pid => {
      let drop = cabinet.draws.decor[pid]
      if (!drop.boxs) drop.boxs = []
      drop.boxs.push(d)
    })

    cabinet.draws.decor[d].pays.paid++
    dispatch({ action: 'customUpdate', box: d })
    dispatch({ action: 'remark', msg: `${d} dispensed` })
  }


  // This is a custom action rather than a container action.
  const crush = () => {
    // The object is crushed (modify to crushedObject ?)
  }

  return {
    lock,
    unlock,
    open,
    unlockDoor,
    enter,
    dispense,
  }
}
