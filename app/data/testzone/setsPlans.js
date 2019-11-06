const setsPlans = {
  // place {id name}: Description (with tokens)
  testSite: {
    desc: 'hazardous items test area',
    exits: {
      helicopter: true,
      begining: true,
      puzzleStation: true,
      room1: { 
        label: 'The Room', 
        door: true,
        locked: true,
      },  // locked: false
      stockRoom: { door: true, label: '🚧 Stock Room', locked: true, key: 'monkeyNut' } ,
      secretPassage: { door: true, locked: true, key: 'glassOnion', hidden: true, reveal: 'sausageLens' },
    },
  },

  helicopter: {
    desc: 'a sleek and shinny helecopter',
    exits: { 
      testSite: { door: true, label: 'disembark' }
    },
  },

  secretPassage: {
    hidden: true,
    desc: 'a secret passage, not to be revealed till its discovered',
    exits: {
      testSite: { locked: false },
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
    exits: { stockRoom: {} },
  },

  room1: {
    desc: 'The Room (1)',
    label: 'The Room',
    exits: { room2: { label: '', } },
  },

  room2: {
    desc: 'The Room (2)',
    exits: { room3: { label: '', } },
  },

  room3: {
    desc: 'The Room (3)',
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
