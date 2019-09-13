xdescribe('expr', () => {

  it('', () => {

    const props = initalisePropsExpr(cabinet.draws, {
      defaultActions: () => {},
      action: () => {}
    })

    console.log('tp', props)

    use({ decor: props })

    console.log('ptd', cabinet.draws.decor)
    //expect('a').toBe('b')
  })


})

const cabinet = {}
cabinet.draws = {}
cabinet.draws.props = {
  test1: {  },
  test2: { combines: { needs: ['test1', 'test3'] } },
  test3: {  },
  test4: { combines: { needs: ['test3', 'test1', 'test5'] } },
  test5: {  },
}

// const defaultActions = () => {}
//
// const action = () => {}

const use = (v) => {
  console.log(typeof(v))
  return injector(v, cabinet.draws)

}

const injector = (fragment, subject) => {
  let keys = Object.keys(fragment)
  keys.map(k => {
    if (typeof(fragment[k]) === 'object' && !Array.isArray(fragment[k])) {
      if (subject[k] === undefined) subject[k] = {}
      return injector(fragment[k], subject[k])
    } else {

      subject[k] = fragment[k]
      console.log('sf', subject[k], fragment[k])      
    }
  })
  return subject
}

const initalisePropsExpr = (draws, info) => {
  let props = draws.props
  for (let id in props) {
    let prop = props[id]
    if (prop.code == undefined) prop.code = id
    if (prop.desc == undefined) prop.desc = id
    if (prop.locs == undefined) prop.locs = []
    prop.usedIn = []
    info.defaultActions(id, info.action, draws)
  }

  for (let id in props) {
    applyCombinesWith(props[id], props)
  }
  console.log('ip', props)
  return props
}

const applyCombinesWith = (prop, props) => {
  if (!prop.combines) return
  prop.combines.needs.map(code => {
    props[code].usedIn.push(prop.code)
  })
}
