const setsPlans = {
  // place {id name}: Description (with tokens)
  begining: {
    desc: 'A begining. Your character stands poised ready for a new adventure',
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
        desc: 'a path leads to the Creepy Woods',
        to: 'creepyWoods',
      },
      { to: 'treeHouse' },
      { to: 'teaHouse' },
      {to: 'lab', desc: 'the laboratory entrance'}
    ]
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
    exits: [{to: 'funkyHills'},],
  },
  treeHouse: {
    desc: 'an entire house, in a tree, albeit a one room house',
    proseScript: 'treeHouse',
    exits: [{to: 'clearing'}]
  },

  teaHouse: {
    desc: 'a tea house, well, more a hut than house',
    exits: [{to: 'clearing'}],
  },

  helicopter: {
    desc: 'a sleek and shinny helecopter',
    exits: [{to: 'testSite'}],
  },

  puzzleStation: {
    desc: 'You\'ve done a little exploring, now to progress the story further you must solve a riddle',
    exits: [{to: 'testSite'}],
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
