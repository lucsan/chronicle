const setsPlans = {

  begining: {
    author: 'lucsan',
    desc: 'A mystery awaits ...',
    label: 'Where the mystery begins',
    exits: [
      {
        to: 'foulManorLibrary',
        desc: 'Adventure awaits (click here) ...'
      },
    ]
  },

  foulManorLibrary: {
    desc: 'its a library',
    label: 'The Library',
    author: 'lucsan',
    proseScript: 'library',
    exits: [
      {
        desc: 'a door leads to the masters study',
        to: 'mastersStudy',
      },
    ]
  },

  mastersStudy: {
    author: 'lucsan',
    desc: 'Its the masters study',
    label: 'The Study',
    proseScript: 'study',
    exits: [
      {
        to: 'foulManorLibrary',
      }
    ],

  }
}
