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
    cabinet.draws.openBox = boxId
    dispatch({ action: 'customUpdate', box: boxId })
    dispatch({ action: 'remark', msg: `${boxId} opened` })
  }

  const unlockDoor = (info, cabinet) => {
    let doors = cabinet.draws.places[info.to].doors
    let i = 0
    for (i = 0; i < doors.length; i++) {
      if (doors[i].name == info.name) break;
    }
    let di = doors.indexOf(info.name)
    let key = cabinet.draws.decor[info.key]
    if (!key.locs.find(l => l == 'bod')) return
    doors[i].locked = false

    cabinet.use({ places: { [info.to]: { doors: doors } } })
    dispatch({ action: 'doorsUpdate', info: { place: info.to, door: info.name } })

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
      let item = props[n]
      let boxs = item.boxs
      const idx = boxs.indexOf(prop.code)
      boxs.splice(idx, 1)
      cabinet.draws.decor[n].boxs = boxs
    })
  }

  const dispense = (d, cabinet) => {
    const props = cabinet.draws.decor
    const prop = props[d]
    const pays = prop.pays
    const drops = pays.drops
    const paid = pays.paid
    const max = pays.max

    console.log('paid', paid, 'max', max)

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
    dispense
  }
}
