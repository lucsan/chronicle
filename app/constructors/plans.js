console.log('--> plans')

const plans = () => {
  let props = {}
  let sets = {}

  const codes = (obj) => {
    let a = []
    for (let c in obj) { a.push(c) }
    return a
  }

  const propsAtLoc = (loc, decor) => {
    let codes = Object.keys(decor)
    let ids = []
    codes.map(c => {
      if (decor[c].locs) {
        decor[c].locs.map(l => {
          if ( l == loc) ids.push(c)
        })
      }
    })
    return ids
  }

  const propsInBox = (loc, decor) => {
    let codes = Object.keys(decor)
    let ids = []
    codes.map(c => {
      if (decor[c].boxs) {
        decor[c].boxs.map(l => {
          if ( l == loc) ids.push(c)
        })
      }
    })
    return ids
  }

  const initaliseProps = (info) => {
    // action, draws
    //const info = {}
    for (let id in props) {
      let prop = props[id]
      if (prop.code == undefined) prop.code = id
      if (prop.desc == undefined) prop.desc = id
      if (prop.locs == undefined) prop.locs = []
      prop.usedIn = []
      info.defaultActions(id, info.action, info.draws)
    }
    for (let id in props) {
      let prop = props[id]
      applyCombinesWith(prop)
    }
    return props
  }

  const applyCombinesWith = (prop) => {
    if (!prop.combines) return
    prop.combines.needs.map(code => {
      props[code].usedIn.push(prop.code)
    })
  }

  // const applyDefaultActions = (prop, actions) => {
  //   if (prop.actions === undefined) {
  //     prop.actions = actions
  //     if (!prop.pickUp) delete prop.actions.env.pickUp
  //     return
  //   }
  //   for (let bag in actions) {
  //     if (prop.actions[bag] === undefined) prop.actions[bag] = actions[bag]
  //     for (let act in actions[bag]) {
  //       if (act == 'pickUp' && !prop.pickUp) continue
  //       if (prop.actions[bag][act] === undefined) prop.actions[bag][act] = actions[bag][act]
  //     }
  //   }
  // }

  return {
    loadProps: (data) => { props = data },
    loadSets: (data) => { sets = data },
    codesProps: () => { codes(props) },
    codesSets: () => { codes(sets) },
    propsAtLoc,
    propsInBox,
    initaliseProps,

  }
}
