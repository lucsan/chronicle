describe('Actions ', () => {

  let testObj = {
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

  let marshall = marshalls(testObj, testObj)

  it('should look at an item', (done) => {
    document.addEventListener('chronicle_dispatch', (e) => {
      if (e.detail.action == 'look') {
        expect(e.detail.msg).toEqual(testObj.test1.desc)
        done()
      }
    })
    marshall.cabinet.draws.decor.test1.actions.env.look()
  })

  // it('should change the location of an item', () => {
  //   marshall.cabinet.use({ character: { location: 'clearing' } })
  //   marshall.cabinet.draws.decor.test1.actions.env.pickUp('test1')
  //   expect(marshall.cabinet.draws.decor.test1.locs).toEqual(['test', 'clearing', 'bod'])
  // })

  it('should pick up an item', () => {
    marshall.cabinet.use({ character: { location: 'clearing' } })
    marshall.cabinet.draws.decor.test1.actions.env.pickUp()
    expect(marshall.cabinet.draws.decor.test1.locs).toEqual(['test', 'clearing', 'bod'])
  })

  it('should drop an item', () => {
    marshall.cabinet.use({ character: { location: 'clearing' } })
    marshall.cabinet.draws.decor.test3.actions.bod.dropIt()
    expect(marshall.cabinet.draws.decor.test3.locs).toEqual(['test', 'clearing'])
  })



})
