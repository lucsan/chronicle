const propsPlans = {
  stick: {
    desc: '🌲 a nice stick',
    locs: ['clearing', 'creepyWoods'],
    artist: 'lucsan',
    pickUp: true,
  },

  chest: {
    desc: 'a locked chest, maybe it contains a rubish sword',
    locs: ['clearing'],
    artist: 'lucsan',
    box: { locked: true, key: 'chestKey' },
  },

  rubishSword: {
    desc: 'Its a sword, well almost, still... its trying its best',
    locs: [],
    boxs: ['chest']
  },

  ropeLadder: {
    desc: 'a ladder, it\'s a bit ropey',
    locs: [],
    boxs: []
  },

  chestKey: {
    desc: 'key for a chest',
    locs: ['clearing'],
    artist: 'lucsan',
    pickUp: true,
  },

  welcomizer: {
    desc: 'a welcomizer, its here to help',
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

  lint: {
    artist: 'lucsan',
    desc: "some grey and fluffy lint, like you get from your pocket",
    pickUp: true,
    locs: ['bod'],
    actions: {
      bod: {
        sniff: () => { custom({ action: 'remark', id: `you sniff your lint, it smells vaugly of dust, and pocket.` }) },
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
    combines: {
      needs: ['stick', 'lint', 'stickyTape'],
      destroys: ['stick', 'lint'],
      desc: 'you use a piece of sticky tape to adhere the lint to your stick. Yay, a lintstick, its more stick than lint and it has a sticky linty end',
    },
  },

  phoneBox: {
    desc: 'bright red traditional English phone box',
    box: { },
    locs: ['bridgeOfSighs'],
  },

  penny: {
    desc: 'a shinny penny',
    boxs: ['phoneBox']
  },

  badge: {
    desc: 'A little copper button badge, it says `Adventurer #1`.',
    locs: ['bod'],
    pickUp: true,
    actions: {
      bod: {
        rub: () => {  custom({ action: 'remark', id: '👋 you give it a little rub and its a tiny bit more shinny' })  },
      }
    },
  },

  littleMonster: {
    desc: 'Oooh how cute, a little monster',
    locs: [],
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

  mingVase: {
    desc: 'a ming dynsaty delicate china vase, it dispences unlimited sticks',
    locs: [],
    actions: {
      env: {
        pickUp: () => custom({ action: 'create', id: 'stick' })
      },
    },
  },

  gnome: {
    desc: "a nice gnome",
    locs: [],
    actions: {
      env: {
        speak: () => { custom({ action: 'remark', id: 'ha ha ha, he he he, I\'m a little gnome and you can\'t catch me' }) },
        tickle: () => { custom({ action: 'remark', id: 'ha ha ha, he he he' }) },
      },
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
    locs: [],
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
