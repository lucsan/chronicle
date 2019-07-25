console.log('--> plans')

let plans = {
  props: {},
  sets: {},
  codes: (obj) => {
    let a = []
    for (let c in obj) { a.push(c) }
    return a
  },
  find: (c, objs) => { return objs[c] },
}

plans.loadProps = (data) => plans.props = data
plans.loadSets = (data) => plans.sets = data

plans.codesProps = () => plans.codes(plans.props)
plans.codesSets = () => plans.codes(plans.sets)

plans.propsAtLoc = (loc, decor) => {
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

// plans.propsAtLoc = (loc, decor) => {
//   let codes = Object.keys(decor)
//   return codes.filter(c => {
//     if (decor[c].locs) return decor[c].locs.find(l => l == loc)
//   })
// }

plans.initaliseProps = (defaultActions, action) => {
  for (let id in plans.props) {
    let prop = plans.props[id]
    if (prop.code == undefined) prop.code = id
    if (prop.desc == undefined) prop.desc = id
    if (prop.locs == undefined) prop.locs = []
    prop.usedIn = []
    applyDefaultActions(prop, defaultActions(id, action))
  }
  for (let id in plans.props) {
    let prop = plans.props[id]
    applyCombinesWith(prop)
  }
  return plans.props
}

const applyCombinesWith = (prop) => {
  if (!prop.combines) return
  prop.combines.needs.map(code => {
    plans.props[code].usedIn.push(prop.code)
  })
}

const applyDefaultActions = (prop, actions) => {
  if (prop.actions === undefined) {
    prop.actions = actions
    if (!prop.pickUp) delete prop.actions.env.pickUp
    return
  }
  for (let bag in actions) {
    if (prop.actions[bag] === undefined) prop.actions[bag] = actions[bag]
    for (let act in actions[bag]) {
      if (act == 'pickUp' && !prop.pickUp) continue
      if (prop.actions[bag][act] === undefined) prop.actions[bag][act] = actions[bag][act]
    }
  }
}
