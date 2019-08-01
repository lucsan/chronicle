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
  stick: {
    desc: '🌲 a nice stick',
    locs: ['testSite', 'clearing', 'creepyWoods'],
    artist: 'lucsan',
    pickUp: true,
    actions: {
      // TODO synonyms for pick up? remove, get, take.
      env: {
        kick: () => { custom({ action: 'kick', id: 'stick', msg: 'ouch' }) },
        prod: () => {}
      },
      inv: {
        destroy: () => {},
      },
      bod: {
        hit: () => { custom({ action: 'msg', id: 'stick', msg: 'you hit the stick' }) },
        poke: () => { console.log(`you poke`) },
        swish: () => { custom({ action: () => { msg: 'You swish the stick' }, id: 'stick' })  },
      },
    },
    properties: {
      attack: 2,
      defense: 0,
      weight: 2,
      poking: true,
    },
  },

  chest: {
    desc: 'a locked chest, maybe it contains a rubish sword',
    locs: ['testSite'],
    artist: 'lucsan',
    box: {
      locked: true,
      key: 'chestKey',
      //contains: ['rubishSword'],
    },
    // isBox: true,
    // locked: true,
    // key: 'chestKey',
    // contains: ['rubishSword'],
    // actions: {
    //   env: {
    //     unlock: () => { custom({ action: 'unlock', id: 'chest' }) }
    //   }
    // }
  },

  cardBox: {
    desc: 'a cardboard box',
    locs: ['testSite'],
    artist: 'lucsan',
    pickUp: true,
    box: {},
    actions: {
      // env: {
      //   open: () => { custom({ action: 'open', id: 'cardBox' }) }
      // },
      bod: {
        open: () => { custom({ action: 'open', id: 'cardBox' }) },
        crush: () => {custom({ action: 'crush', id: 'cardBox' })},
      },
    }
  },

  ninePennyBowl: {
    desc: 'A bowl which should have nine shinny new pennies in it. but dosent.',
    locs: ['testSite'],
    box: {
      open: true,
      //contains: ['shinnyPennyOne'],
    },
    // If has nine pennies in it then condition met
    // what happens?

  },

  shinnyPennyOne: {
    pickUp: true,
    desc: 'A shinny penny',
    boxs: ['ninePennyBowl', 'chest', 'cardBox'],
    locs: ['testSite', 'clearing']
  },

  helipass: {
    pickUp: true,
    locs: ['bod'],
  },

  helipassDispenser: {
    locs: ['testSite'],
    box: { open: true },
    pays: {
      //criteria: { list: [], inOrder: false },
      drops: ['helipass'],
      action: 'none', // mutates, combines,
      paid: 0,
      max: 2,
    },
  },

  betterSwordDispenser: {
    locs: ['testSite'],
    box: { open: true },
    pays: {
      criteria: { list: ['rubishSword'], inOrder: false },
      drops: ['betterSword'],
      action: 'mutate',
      //destroy: true, // mutates, combines,
      paid: 0,
      max: 1,
    },
  },

  mingVase: {
    desc: 'a ming dynsaty delicate china vase, it dispences unlimited sticks',
    locs: ['testSite'],
    pays: {
      drops: ['stick'],
      paid: 0,
      max: 100,
    }

  },



  gnome: {
    desc: "a nice gnome",
    locs: ['testSite'],
    actions: {
      env: {
        speak: () => { custom({ action: 'lines', id: 'random' }) },
        tickle: () => { custom({ action: 'remark', id: 'ha ha ha, he he he, I\'m a little gnome and you can\'t catch me'}) },
      },
    },
    lines: [
      { id: '1', line: 'line one' },
      { id: '2', line: 'line two' },
      { id: '3', line: 'line three' },
    ],
  },

  rubishSword: {
    pickUp: true,
    desc: 'Its a sword, well almost, still... its trying its best',
    locs: ['testSite'],
    boxs: ['chest'],
  },

  betterSword: {
    pickUp: true,
    desc: 'Its a better sword',
  },

  cheeseWax: {
    pickUp: true,
    desc: 'The wax wrapper from a small cheese wheel',
    boxs: ['chest'],
  },

  oldSoverign: {
    desc: 'A dull old soverign piece',
    boxs: ['ninePennyBowl']
  },

  chestKey: {
    desc: 'key for a chest',
    locs: ['testSite', 'clearing'],
    artist: 'lucsan',
    pickUp: true,
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
        ask: () => { custom({ action: 'remark', id: 'Click on 🎒bag it, to put me in the backpack. Click on 👐drop to drop me.' }) },
      },
      inv: {
        ask: () => { custom({ action: 'remark', id: 'Click on ' }) },
      },
    },
  },

  lint: {
    desc: "some grey and fluffy lint",
    locs: ['inv'],
    actions: {
      bod: {
        //examine: () => { propActions().msg(`its lint, like you get from your pocket.`) },
        sniff: () => { propActions().msg(`you sniff your lint, it smells vaugly of dust, and pocket.`) },
        throw: () => { propActions().drop('lint') },
      },
    },
  },

  stickyTape: {
    desc: 'a roll of stickytape. Its a tape, which is sticky',
    locs: ['inv'],
    properties: {
      sticking: true,
    },
  },

  lintStick: {
    desc: 'a mysterious lintstick, it has some pocket lint stuck to it. I wonder what this is for?',
    pickUp: true,
    actions: {
      inv: {
        //give: () => console.log(`give to gnome`),
        //tickling: () => console.log(`You tickle something with it`),
        //poking: () => console.log(`you poke something with it`),
      },
    },
    properties: {
      attack: 2,
      defense: 0,
      health: 10,
    },
    combines: {
      needs: ['stick', 'lint', 'stickyTape'],
      destroys: ['stick', 'lint'],
      desc: 'you use a piece of sticky tape to adhere the lint to your stick. Yay, a lintstick, its more stick than lint and it has a sticky linty end',
    },
  },

  penny: {
    desc: 'A shinny penny.'
  },

  badge: {
    desc: 'A little copper button badge, it says `Adventurer #1`.',
    locs: ['bod'],
    pickUp: true,
    actions: {
      bod: {
        rub: () => { propActions().msg('you give it a little rub and its a tiny bit more shinny') },
      }
    },
  },

  littleMonster: {
    desc: 'Oooh how cute, a little monster',
    locs: ['testSite'],
    actions: {
      env: {
        //hit: () => console.log(`monster is hit`)
      },
    },
    strikes: true, // can retaliate
    properties: {
      attack: 3,
      defense: 2,
      health: 4,
      drops: ['penny'],
    },
  },

  washingSoda: {
    desc: 'A tin of sodium carbonate.',
    locs: ['lab'],
  },
  citricAcid: {
    desc: 'a bag of citric acid. It tastes kinda lemony',
    locs: ['lab'],
  },
  testTube: {
    desc: 'a test tube of dubious cleanliness.',
    locs: ['lab'],
  },
  chiborg: {
    desc: 'a chicken with a mechanical heart.',
    locs: ['testSite'],
  },
  roboken: {
    desc: 'a robot with a chickens heart.',
    locs: []
  },
  vexedSheep: {
    desc: 'a slightly vexed sheep with fluffy white fleece.',
    locs: ['funkyHills']
  },
  articulatedGoat: {
    desc: 'a goat, articulated at the knees.',
    locs: []
  },
  oldMonk: {
    desc: 'a calm old monk called Ren-i quietly pushing his broom.',
    locs: ['teaHouse']
  }

}
