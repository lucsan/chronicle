const setsPlans = {

  begining: {
    author: 'lucsan',
    desc: 'Mystery awaits ...',
    label: 'Where the mystery begins',
    exits: {
      foulManor: { desc: 'Adventure awaits (click here) ...' }
    },
  },

  foulManor: {
    desc: 'Foul Manor',
    proseScript: 'foulManor',
    exits: { foulHall1: {} },
  },

  foulHall1: {
    desc: 'The hall',
    proseScript: 'foulHall1',
    exits: { foulManorLibrary: {} },
  },

  foulHall: {
    desc: 'The hall',
    //proseScript: 'foulHall1',
    exits: {
      foulManorLibrary: {},
      foulManorStudy: { desc: 'a door leads to the masters study' },
    }
  },

  foulManorLibrary: {
    desc: 'its a library',
    label: 'The Library',
    author: 'lucsan',
    proseScript: 'library',
    exits: { foulHall: {} },
  },

  foulManorStudy: {
    author: 'lucsan',
    desc: 'Its the masters study',
    label: 'The Study',
    proseScript: 'study',
    exits: { foulHall: {} },
  },

}
