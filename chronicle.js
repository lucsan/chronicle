console.log('%cChronicle running ->>', 'color:red;font-weight:bold;')


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

  loadGame(marshall.cabinet)

  const stage = theater(royal(marshall.cabinet.draws))
  stage.build()

  marshall.move('begining')

  //moves_test_saves(marshall)
  //moves_one(marshall)

  console.log(marshall.cabinet)

})
