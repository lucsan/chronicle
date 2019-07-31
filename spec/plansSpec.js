describe('plans', () => {
  //let cabinet = new Cabinet
  let planz = plans()
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
    expect(typeof(planz)).toBe('object')
  })


  it('should initialise props (ie: defaults)', () => {
    let decor = planz.initaliseProps(testObj, {
      defaultActions: defaultActions,
      action: () => {},
      draws: []
    })

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
