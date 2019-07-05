console.log('--> Cabinet')
let Cabinet = function() {

  let draws = {
    player: { name: 'Playe Rone', character: 'Charac Ter' },
    character: {
      name: 'Charac Ter',
      location: config.charStart,
      moves: 0
    },
    props: {},
    decor: {},
    sets: {},
    places: {},
    tools: {},
    saves: {}
  }

  const use = (v) => {
    if (v === undefined) return { ...draws }
    if (typeof(v) === 'string') return { ...draws[v] }
    if (typeof(v) == 'object') return injector(v, draws)
    return 'error unknown values type'
  }

  const injector = (fragment, subject) => {
    let keys = Object.keys(fragment)
    keys.map(k => {
      if (typeof(fragment[k]) === 'object' && !Array.isArray(fragment[k])) {
        if (subject[k] === undefined) subject[k] = {}
        return injector(fragment[k], subject[k])
      } else {
        subject[k] = fragment[k]
      }
    })
    return subject
  }

  return {
    draws: {...draws},
    use
  }
}
