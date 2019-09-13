const setsPlans = {
  // place {id name}: Description (with tokens)
  begining: {
    desc: 'A begining. Your character stands poised ready for a new adventure. Click on 🤏 to pick up the welcomizer. Click on clearing to begin your journey.',
    proseScript: 'begining',
    exits: [
      {to: 'clearing', desc: 'Adventure awaits (click here) ...'},
    ]
  },

  clearing: {
    desc: 'a sun dappled clearing',
    label: 'a nice clearing',
    proseScript: 'clearing',
    author: 'lucsan',
    exits: [
      {
        desc: 'Path to the Creepy Woods',
        to: 'creepyWoods',
      },
    ]
  },

  aPath: {
    desc: 'a path leads off to the north',
    exits: [
      { to: 'creepyWoods' },
      { to: 'wetWaterRiver' },
    ]
  },

  wetWaterRiver: {
    desc: 'a bend in the river, the water definately looks like the wet type',
    exits: [
      { to: 'aPath' },
      { to: 'riverBoat' },
    ]
  },

  riverBoat: {
    desc: 'a river boat',
    exits: [
      { to: 'wetWaterRiver' },
      { to: 'drearyLane' },
    ]
  },

  drearyLane: {
    desc: 'a dreary lane wonders away from the river',
    exits: [
      { to: 'riverBoat' },
      { to: 'statelyManorLawns' },
      { to: 'statelyVillage' },
    ]
  },

  statelyManorLawns: {
    desc: 'a wide tree lined driveway leads across the lawns to the front of the manor. There is an alien spaceship parked on the grass',
    exits: [
      { to: 'alienSpaceShip' },
      { to: 'drearyLane' },
      { to: 'statelyManorFront' },
    ]
  },

  alienSpaceShip: {
    desc: 'a spaceship, it belongs to some aliens from outer space',
    exits: [{to: 'statelyManorLawns'}],
  },

  statelyVillage: {
    desc: 'the village of Stately',
    exits: [{to: 'drearyLane'}],
  },

  creepyWoods: {
    desc: 'some nice creepy woods',
    proseScript: 'creepyWoods',
    exits: [
      {
        desc: 'a Clearing can be seen through the trees',
        to: 'clearing',
      },
      {
        desc: 'a path leads out of the woods',
        to: 'aPath',
      },
      {
        desc: 'sunshine covered meadows lie in the distance',
        to: 'funkyHills'
      }
    ]
  },

  skyCity: {
    desc: 'A city in the sky',
  },

  lab: {
    desc: 'a low rent laboratory, with a cheep bench, an old bunsen burner and a test tube rack',
    proseScript: 'lab',
    exits: [
      {
        desc: 'the door to the Clearing',
        to: 'clearing',
      },
      { to: 'labShed'}
    ]
  },

  labShed: {
    desc: 'a shed round the back of the laboratory',
    exits: [
      { to: 'lab' },
      { to: 'clearing' }
    ],
  },

  funkyHills: {
    desc: 'low grassy hills undulate across a shallow plain, sheep gamble in the pastures and meadows, a windmill gently turns in the distance',
    exits: [
      {
        desc: 'The creepy woods becon with twisted twig',
        to: 'creepyWoods'
      },
      {to: 'bridgeOfSighs'}
    ]
  },

  bridgeOfSighs: {
    desc: 'an ornate bridge with a definate air of sorrow',
    exits: [
      { to: 'funkyHills' },
      { to: 'acornDale' },
    ],
  },

  acornDale: {
    desc: 'acorn dale',
    exits: [
      { to: 'bridgeOfSighs' },
      { to: 'treeHouse' },
    ],
  },

  treeHouse: {
    desc: 'an entire house, in a tree, albeit a one room house',
    proseScript: 'treeHouse',
    exits: [
      {to: 'acornDale' },
    ],
    doors: [
      { name: 'climb', locked: true, key: 'ropeLadder' }
    ],
  },

  teaHouse: {
    desc: 'a tea house, well, more a hut than house',
    exits: [{to: 'clearing'}],
  },

  fairytails: {
    desc: 'The big book of Fairy tails and smaller legends.',
    exits: [{to: 'clearing'}],
  },


  helicopter: {
    desc: 'a sleek and shinny helecopter',
    exits: [{to: 'testSite'}],
  },

  bannanaFactoryFrontEntrance: {
    desc: 'And you thought bannans grew on trees.',
    exits: [{to: 'testSite'}],
  },




}
