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
    dispatch({ action: 'customUpdate', box: boxId })
    dispatch({ action: 'remark', msg: `${boxId} opened` })
  }



  const unlockDoor = (info, cabinet) => {
    //let doors = cabinet.draws.places[info.to].doors.find(d => d.name == info.name)
    let doors = cabinet.draws.places[info.to].doors


    let i = 0
    for (i = 0; i < doors.length; i++) {
      if (doors[i].name == info.name) break;
    }
    let di = doors.indexOf(info.name)
    let key = cabinet.draws.decor[info.key]
    if (!key.locs.find(l => l == 'bod')) return

    //console.log('aaaaaaa',doors[0])

    doors[i].locked = false


    cabinet.use({ places: { [info.to]: { doors: doors } } })

  //  console.log(cabinet.draws.places[info.to])

    dispatch({ action: 'doorsUpdate', info: { place: info.to, door: info.name } })

    //console.log('unlockdoor', info, 'key', key, 'doors', cabinet.draws.places[info.to].doors)

    //let place = cabinet.draws.places


  }

  const paymentRequired = (prop, props) => {
    if (!prop.pays.criteria) return false
    if (prop.pays.criteria.list.length < 1) return false
    const need = prop.pays.criteria.list

    const list = need.filter(n => {
      const p = props[n]
      if (p.boxs == undefined
        || p.boxs.length < 1
        || p.boxs.indexOf(prop.code) < 0) return n
    })
    return list.length < 1? false: list
  }


  const dispense = (d, cabinet) => {
    const props = cabinet.draws.decor
    const prop = props[d]
    const pays = prop.pays
    const drops = pays.drops
    const pr = paymentRequired(prop, props)
    if (pr) return dispatch({ action: 'remark', msg: `You need to put ${pr} in` })



    drops.map(pid => {
      let drop = cabinet.draws.decor[pid]
      if (!drop.boxs) drop.boxs = []
      drop.boxs.push(d)
    })



    console.log('dispencing', d)
    //console.log(cabinet.draws.decor[pid])
    console.log(prop)
    console.log(prop.pays)
    console.log(prop.pays.drops)
    console.log(cabinet)


    // create a new payout object and put in dispenser.

    //const drops =

    // increment pays

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
