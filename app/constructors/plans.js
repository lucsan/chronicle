console.log('--> plans')

const plans = () => {

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

  const initaliseProps = (cabinet, info) => {
    let props = cabinet.draws.props
    for (let id in props) {
      let prop = props[id]
      if (!prop.code) prop.code = id
      if (!prop.desc) prop.desc = id
      if (!prop.locs) prop.locs = []
      prop.usedIn = []
      info.defaultActions(id, info.action, cabinet.draws)
    }
    for (let id in props) {
      applyCombinesWith(props[id], cabinet.draws.props)
    }
    return props
  }

  const applyCombinesWith = (prop, props) => {
    if (!prop.combines) return
    prop.combines.needs.map(code => {
      props[code].usedIn.push(prop.code)
    })
  }

  const initaliseSets = (cabinet, info) => {
    let sets = cabinet.draws.sets
    for (let id in sets) {
      let set = sets[id]
      if (!set.code) set.code = id
    }
    return sets
  }

  return {
    propsAtLoc,
    propsInBox,
    initaliseProps,
    initaliseSets,
  }
}
