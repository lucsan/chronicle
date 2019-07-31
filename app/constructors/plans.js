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

  const initaliseProps = (props, info) => {
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
      applyCombinesWith(prop, props)
    }
    return props
  }

  const applyCombinesWith = (prop, props) => {
    if (!prop.combines) return
    prop.combines.needs.map(code => {
      props[code].usedIn.push(prop.code)
    })
  }

  return {
    propsAtLoc,
    propsInBox,
    initaliseProps,
  }
}
