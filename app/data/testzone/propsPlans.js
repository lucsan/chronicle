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
    locs: ['testSite', 'clearing', 'creepyWoods', 'inv'],
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

  hiddenBox: {
    desc: 'A box which is hidden until an act reveals it',
    locs: ['testSite']
  },

  monkeyNut: {
    pickUp: true,
    desc: 'Strange kind of key',
    locs: ['testSite']
  },

  lintStick: {
    desc: 'a mysterious lintstick, it has some pocket lint stuck to it. I wonder what this is for?',
    pickUp: true,
    combines: {
      needs: ['stick', 'lint', 'stickyTape'],
      destroys: ['stick', 'lint'],
      desc: 'you use a piece of sticky tape to adhere the lint to your stick. Yay, a lintstick, its more stick than lint and it has a sticky linty end',
    },
  },

  mintStick: {
    desc: 'a strange mintstick, it has a mint stuck on it. I wonder what this is for?',
    pickUp: true,
    combines: {
      needs: ['stick', 'mint'],
      destroys: ['stick', 'mint'],
      desc: 'you chew the mint for a bit, then squish it to the end of the stick, yay, a mint stick',
    },
  },

  mint: {
    desc: 'a mint',
    pickUp: true,
    locs: ['testSite'],
  },

  chest: {
    desc: 'a locked chest, maybe it contains a rubish sword',
    locs: ['testSite'],
    artist: 'lucsan',
    box: {
      locked: true,
      key: 'chestKey',
    },
  },

  chestKey: {
    desc: 'key for a chest',
    locs: ['stockRoom', 'testSite'],
    artist: 'lucsan',
    pickUp: true,
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
    locs: ['stockRoom'],
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
    locs: ['stockRoom', 'clearing']
  },

  helipass: {
    pickUp: true,
    locs: ['bod'],
  },

  helipassDispenser: {
    locs: ['stockRoom'],
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
    desc: 'a ming dynsaty delicate china vase, it dispenses unlimited sticks',
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
    locs: ['bod'],
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

  sausageLens: {
    desc: 'an improbable lens, made from sausage',
    pickUp: true,
    locs: ['testSite'],
    reveals: ['secretPassage', 'hiddenBox'],
  },

  glassOnion: {
    desc: 'like an onion onion, but made of glass',
    pickUp: true,
    locs: ['testSite'],
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
    locs: ['stockRoom'],
  },

  roboken: {
    desc: 'a robot with a chickens heart.',
    locs: ['stockRoom']
  },

  vexedSheep: {
    desc: 'a slightly vexed sheep with fluffy white fleece.',
    locs: ['funkyHills']
  },

  articulatedGoat: {
    desc: 'a goat, articulated at the knees.',
    locs: ['stockRoom']
  },

  oldMonk: {
    desc: 'a calm old monk called Ren-i quietly pushing his broom.',
    locs: ['teaHouse']
  },

}
