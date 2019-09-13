const propsPlans = {
default: {
    artist: '',
    desc: '',
    loc: '',
    locs: [],
    pickUp: false,
    isBox: false,
    hit: true, // can hit things with it
    strikes: false, // retaliates
  },


  welcomizer: {
    desc: 'A welcomizer, its here to help',
    locs: ['begining'],
    pickUp: true,
    actions: {
      env: {
        ask: () => { custom({ action: 'remark', id: 'Click on 🤏 pickUp to pick me up, click on 👁‍🗨 look, to inspect me.' }) }
      },
      bod: {
        ask: () => { custom({ action: 'remark', id: 'Click on 🎒bag it, to put me in the backpack. Click on 👐 drop to drop me.' }) },
      },
      inv: {
        ask: () => { custom({ action: 'remark', id: 'Click on 🤏 grab, to grab me out of the backpak.' }) },
      },
    },
  },


  badge: {
    desc: 'A little copper button badge, it says `Detective #1`.',
    label: '📛 Badge',
    locs: ['foulManorLibrary'],
    pickUp: true,
  },

  nineShinnyPenniesBowl: {
    artist: 'lucsan',
    desc: 'A beautiful bowl with a dragon on it. It should have nine shinny pennies in it, but it doesn\'t.',
    box: {
      open: true
    },
    locs: ['foulManorLibrary'],
  },

  shinnyPennyOne: {
    pickUp: true,
    desc: 'A bright shinny penny',
    boxs: ['nineShinnyPenniesBowl']
  },

}
