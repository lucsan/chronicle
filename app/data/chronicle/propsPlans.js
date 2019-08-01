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

  chestKey: {
    desc: 'key for a chest',
    locs: ['clearing'],
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
        ask: () => { custom({ action: 'remark', id: 'Click on 🤏 grab, to grab me out of the backpak.' }) },
      },
    },
  },

  gnome: {
    desc: "a nice gnome",
    locs: ['clearing'],
    actions: {
      env: {
        speak: () => { custom({ action: 'remark', id: 'ha ha ha, he he he, I\'m a little gnome and you can\'t catch me' }) },
        tickle: () => { custom({ action: 'remark', id: 'ha ha ha, he he he' }) },
      },
    },
  },

  lint: {
    desc: "some grey and fluffy lint",
    locs: ['inv'],
    actions: {
      bod: {
        examine: () => { propActions().msg(`its lint, like you get from your pocket.`) },
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
        give: () => console.log(`give to gnome`),
        tickling: () => console.log(`You tickle something with it`),
        poking: () => console.log(`you poke something with it`),
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
        rub: () => {  custom({ action: 'remark', id: '👋 you give it a little rub and its a tiny bit more shinny' })  },
      }
    },
  },

  littleMonster: {
    desc: 'Oooh how cute, a little monster',
    locs: ['creepyWoods'],
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
    locs: ['testSite', 'creepyWoods'],
    actions: {
      env: {
        pickUp: () => custom({ action: 'create', id: 'stick' })
      },
    },
  },

  washingSoda: {
    desc: 'A tin of sodium carbonate.',
    locs: ['testSite', 'lab'],
  },
  citricAcid: {
    desc: 'a bag of citric acid. It tastes kinda lemony',
    locs: ['testSite', 'lab'],
  },
  testTube: {
    desc: 'a test tube of dubious cleanliness.',
    locs: ['testSite', 'lab'],
  },
  chiborg: {
    desc: 'a chicken with a mechanical heart.',
    locs: ['testSite'],
  },
  roboken: {
    desc: 'a robot with a chickens heart.',
    locs: ['testSite', 'begining']
  },
  vexedSheep: {
    desc: 'a slightly vexed sheep with fluffy white fleece.',
    locs: ['testSite', 'funkyHills']
  },
  articulatedGoat: {
    desc: 'a goat, articulated at the knees.',
    locs: ['testSite']
  },
  oldMonk: {
    desc: 'a calm old monk called Ren-i quietly pushing his broom.',
    locs: ['teaHouse']
  }

}
