const setsPlans = {

  begining: {
    author: 'lucsan',
    desc: 'Mystery awaits ...',
    label: 'Where the mystery begins',
    exits: [
      {
        to: 'foulManor',
        desc: 'Adventure awaits (click here) ...'
      },
    ]
  },

  foulManor: {
    desc: 'Foul Manor',
    proseScript: 'foulManor',
    exits: [{ to: 'foulHall1' }]
  },

  foulHall1: {
    desc: 'The hall',
    proseScript: 'foulHall1',
    exits: [{ to: 'foulManorLibrary' }]
  },

  foulHall: {
    desc: 'The hall',
    //proseScript: 'foulHall1',
    exits: [{ to: 'foulManorLibrary' }, { to: 'foulManorStudy', desc: 'a door leads to the masters study' }]
  },

  foulManorLibrary: {
    desc: 'its a library',
    label: 'The Library',
    author: 'lucsan',
    proseScript: 'library',
    exits: [{to: 'foulHall'}]
  },

  foulManorStudy: {
    author: 'lucsan',
    desc: 'Its the masters study',
    label: 'The Study',
    proseScript: 'study',
    exits: [
      {
        to: 'foulHall',
      }
    ],

  }
}
