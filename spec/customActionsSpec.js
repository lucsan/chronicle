const saveGame = (d) => { console.log(`mock save attempt`, d) }
const loadGame = () => {}

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
  helipass: {},
  lemon: { locs: ['bod'] },
  fridge: { locs: [] },
  keyNoLocs: {  },
  test3: {
    locs: ['test', 'bod']
  }

}

let testSets = {
  helicopter: {
    desc: 'a sleek and shinny helecopter',
    exits: { testSite: {} },
    doors: {
      lockedSite: { locked: true, key: 'lemon' },
      lockedSiteNoKeyHeld: { locked: true, key: 'fridge' },
      lockedSiteNoKeyObject: {locked: true, key: 'noSuchProp'},
      lockedSiteNoKeyDeclaired: { locked: true },
      noKeySite: {},
      testSite: { label: 'Disembark to 💥Test Site' }
    },
  },
  lockedSite: {},
  lockedSiteNoKeyDeclaired: {},
  noKeySite: {},
  testSite: { desc: 'testsite' }
}

const dispatch = (d) => {}

let marshall = marshalls(testProps, testSets)
let custActs = customActions(dispatch)



describe('customActions', () => {

  describe('set doors locks', () => {

    it('should prevent access if you dont have the key and the door is locked', () => {
      const info = { 
        from: 'helicopter',         
        to: 'lockedSiteNoKeyHeld',
      }     
      custActs.unlockDoor(info, marshall.cabinet)
      expect(marshall.cabinet.draws.places.helicopter.doors.lockedSiteNoKeyHeld.locked).toBe(true)
    })

    it('should send a message if you dont have the key and the door is locked', () => {
      const info = { 
        from: 'helicopter',         
        to: 'lockedSiteNoKeyHeld',
      }   
      customActions((d) => {
        expect(d.msg).toBe(`You need a Fridge to unlock this`)
      }).unlockDoor(info, marshall.cabinet)
    })

    it('should unlock a door if you have the key', () => {
      const info = {
        from: 'helicopter',         
        to: 'lockedSite',
      }
      marshall.cabinet.use({ places: { helicopter: { doors: { lockedSite: { locked: true } } } } })
      custActs.unlockDoor(info, marshall.cabinet)
      expect(marshall.cabinet.draws.places.helicopter.doors.lockedSite.locked).toBe(false)
    })

    it('should send a message you have unlocked a door with the key', () => {
      const info = {
        from: 'helicopter',         
        to: 'lockedSite',
      }
      marshall.cabinet.use({ places: { helicopter: { doors: { lockedSite: { locked: true } } } } })
      customActions((d) => {
        if (d.action == 'remark') expect(d.msg).toBe('You unlocked Locked Site with a Lemon')
      }).unlockDoor(info, marshall.cabinet)
      
    })

    it('should send a message if the key object doesn`t exist', () => {
      const info = {
        from: 'helicopter',         
        to: 'lockedSiteNoKeyObject',
      }
      customActions((d) => {
        if (d.action == 'remark') expect(d.msg).toBe('Prop noSuchProp doesnt exist (see propsPlans).')
      }).unlockDoor(info, marshall.cabinet)
    })

    describe('sets doors open (enter)', () => {
      it('should move character to selected room', () => {
        const info = {
          from: 'testSite',
          to: 'helecopter'
        }
        marshall.cabinet.use({ character: { location: info.from } })
        custActs.enter(info, marshall.cabinet, actions().doMove)
        expect(marshall.cabinet.draws.character.location).toBe(info.to)
      })

      xit('should signal a character move', () => {

        expect(1).toBe(2)
      })

      xit('should not open if its locked', () => {
        expect(1).toBe(2)
      })
    })

  })


})