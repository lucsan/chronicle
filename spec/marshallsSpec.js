describe('marshalls', () => {
  const defaultProps = {}
  const defaultSets = {}

  let testProps = {
    test1: {
      desc: 'test prop one',
      locs: ['test', 'clearing', 'clearing'],
      pickUp: true,
      actions: {
        env: {
          lick: () => {}
        }
      }
    },
    test2: {},
    test3: {
      locs: ['test', 'bod']
    }
  }

  let testSets = {
    test1: {
      desc: 'test set one',
    },
    test2: {},
    test3: {}
  }

  let marshall = marshalls(testProps, testSets)

  it('should have a cabinet', () => {
    expect(typeof(marshall.cabinet)).toBe('object')
  })

  it('should move the character', () => {
    marshall.move('test1')
    expect(marshall.cabinet.draws.character.location).toBe('test1')
  })
})
