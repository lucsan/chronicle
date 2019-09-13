const setsPlans = {
  // place {id name}: Description (with tokens)
  testSite: {
    desc: 'hazardous items test area',
    exits: {
      helicopter: true,
      begining: true,
      puzzleStation: true,
    },
    doors: {
      // helicopter:  { locked: true, key: 'helipass' },
      stockRoom: { label: '🗄 Stock Room', locked: true, key: 'monkeyNut' },
      secretPassage: { locked: true, key: 'GlassOnion', hidden: true, reveal: 'sausageLens' },
      treeHouse: { locked: false },
    }

  },

  helicopter: {
    desc: 'a sleek and shinny helecopter',
    exits: { testSite: {} },
    doors: {
      testSite: { label: 'disembark' }
    },
  },

  secretPassage: {
    hidden: true,
    desc: 'a secret passage, not to be revealed till its discovered',
    doors: {
      testSite: {  },
      cheeseWheel: {  },
    }
  },

  testChest: {
    desc: 'Set as chest (container)',
    exits: [
      {to: 'testSite', desc: 'close the chest'}
    ]
  },

  stockRoom: {
    desc: 'Where old props go to gather dust',
    exits: { testSite: { desc: 'Test Zone' }, },
  },

  treeHouse: {
    desc: 'an entire house, in a tree, albeit a one room house',
    proseScript: 'treeHouse',
    exits: { testSite: {} },
  },

  teaHouse: {
    desc: 'a tea house, well, more a hut than house',
    exits: [{to: 'clearing'}],
  },

  puzzleStation: {
    desc: 'You\'ve done a little exploring, now to progress the story further you must solve a riddle',
    exits: { testSite: {} },
  },

  bannanaFactoryFrontEntrance: {
    desc: 'And you thought bannans grew on trees.',
    exits: [{to: 'testSite'}],
  },

  alienSpaceShip: {
    desc: 'A spaceship, it belongs to some aliens from outer space.',
    exits: [{to: 'testSite'}],
  }


}
