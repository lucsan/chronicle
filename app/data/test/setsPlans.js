const setsPlans = {
  // place {id name}: Description (with tokens)
  test: {
    desc: 'Test place',
    exits: [
      {to: 'clearing', desc: 'Adventure awaits (click here) ...'},
    ]
  },

  room: {
    desc: 'A room',
    exits: {
      trunk: { }
    }
  },

  trunk: {
    desc: 'Trunk full of props',
    proseScript: 'trunk',
    exits: {
      room : {
        desc: 'To the room',
        actions: {
          enter: () => {},
        },
      },
    },
    doors: {
      open: { locked: true, key: 'bigBook' }
    },
  },

}
