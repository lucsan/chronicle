describe('plans', () => {
  //let cabinet = new Cabinet
  let testObj = {
    test1: {
      desc: 'test prop one',
      locs: ['test'],
      pickUp: true,
      actions: {
        env: {
          lick: () => {}
        }
      }
    },
    test2: {},
    test3: {
      locs: ['test']
    }
  }

  it('should have a plans object', () => {
    expect(typeof(plans)).toBe('object')
  })

  it('should have a codes function', () => {
    let cs = plans.codes({ test: {}, test2: {}})
    expect(cs.length).toBe(2)
  })

  it('should have a props load function', () => {
    plans.loadProps(testObj)
    expect(plans.props).toBe(testObj)
  })

  it('should load sets', () => {
    plans.loadSets(testObj)
    expect(plans.sets).toBe(testObj)
  })

  it('should provide props codes', () => {
    plans.loadProps(testObj)
    expect(plans.codesProps().length > 1).toBe(true)
  })

  it('should return list of props at a location', () => {
    let propsAtTest = plans.propsAtLoc('test', testObj)
    expect(propsAtTest[1]).toBe('test3')
  })

  it('should initialise props (ie: defaults)', () => {
    //let m = marshalls(testObj, testObj)
    //console.log(m)

    plans.loadProps(testObj)
    let decor = plans.initaliseProps(defaultActions)
    expect(typeof(decor.test1.actions.env.lick)).toBe('function')
  })

  // it('should ', () => {
  //   let m = marshalls(testObj, testObj)
  //   plans.loadProps(testObj)
  //   let decor = plans.initaliseProps(m)
  //   expect(typeof(decor.test1.actions.env.lick)).toBe('function')
  //   expect('a').toBe('b')
  // })

//   it('should pickup', () => {
//
//     plans.loadProps(testObj)
//     let decor = plans.initaliseProps()
//     console.log(plans.props.test1.actions.env)
// console.log(decor)
//
//     plans.props.test1.actions.env.pickUp('test1')
//     plans.props.test1.actions.env.look('test1')
//
//     expect(typeof(plans.props.test1.actions.env.lick)).toBe('function')
//
//   })

})

const defaultActions = (id) => {
  return {
    env: {
      pickUp: (id) => action('move', id),
      look: () => action('look', id)
    },
    bod: {
      examine: () => {}
    },
    inv: {
      grab: () => {}
    }
  }
}
