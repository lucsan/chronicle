describe('plans', () => {
  //let cabinet = new Cabinet
  let plan = plans()
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
    expect(typeof(plan)).toBe('object')
  })

  it('should have a props load function', () => {
    plan.loadProps(testObj)
    expect(plan.props).toBe(testObj)
  })

  xit('should load sets', () => {
    plan.loadSets(testObj)
    expect(plan.sets).toBe(testObj)
  })

  xit('should provide props codes', () => {
    plan.loadProps(testObj)
    expect(plan.codesProps().length > 1).toBe(true)
  })

  xit('should return list of props at a location', () => {
    let propsAtTest = plans.propsAtLoc('test', testObj)
    expect(propsAtTest[1]).toBe('test3')
  })

  xit('should initialise props (ie: defaults)', () => {
    //let m = marshalls(testObj, testObj)
    //console.log(m)

    plan.loadProps(testObj)
    let decor = plans.initaliseProps(defaultActions)
    expect(typeof(decor.test1.actions.env.lick)).toBe('function')
  })

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
