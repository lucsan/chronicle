console.log('%crunner running ->>', 'color: red')


// console.log('clearing localStorage')


// setup
let reset = true
if (reset) {
  localStorage.clear()
  localStorage.setItem('player', JSON.stringify({ name: 'Playe Rone', character: 'Charac Ter' }))
}


scriptsLoader(['app/config.js'], () => document.dispatchEvent(new Event('configLoaded')))

document.addEventListener('configLoaded', () => {
  scriptsLoader(config.autoload, () => document.dispatchEvent(new Event('scriptsLoaded')) )
})

let custom = () => {}

document.addEventListener('scriptsLoaded', () => {
  let css = 'color:green;'
  let css1 = 'font-weight:bold;'
  console.log('%c--> Scripts Loaded', css)

  console.log('%cMarshalling assets', css+css1)
  const marshall = marshalls(propsPlans, setsPlans)

  // scripted actions
  const customActions = (marshall, act) => {
    return (act) => marshall.action(act.action, act.id)
  }

  custom = customActions(marshall)

  //loadGame(marshall.cabinet)

  const stage = theater(headless(marshall.cabinet.draws))
  stage.build()

  //moves_test_saves(marshall)
  moves_one(marshall)

  console.log(marshall.cabinet)

})

const moves_test_saves = (marshall) => {
  let draws = marshall.cabinet.draws
  let decor = draws.decor

  marshall.move('clearing')
  marshall.move('creepyWoods')
}

const moves_one = (marshall) => {
  let draws = marshall.cabinet.draws
  let decor = draws.decor
  // list props at loc
  let pal = draws.tools.propsAtLoc('begining', decor)
  console.log(`you can see things ... ${pal}`)

  // runner stuff

  decor.welcomizer.actions.env.look()
  decor.welcomizer.actions.env.pickUp()

  console.log(decor.welcomizer.actions)

  marshall.move('clearing')

  marshall.cabinet.draws.decor.stick.actions.env.kick()

  marshall.move('creepyWoods')

  decor.lintStick.combines.needs = ['penny', 'lint', 'stickyTape', 'mingVase']
  marshall.action('combine', 'lintStick')
  decor.lintStick.combines.needs = ['stick', 'lint', 'stickyTape']

  marshall.action('env->bod','stick')
  marshall.action('combine', 'lintStick')

}
