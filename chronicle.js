console.log('%cChronicle running ->>', 'color:red;font-weight:bold;')


scriptsLoader(['app/config.js'], () => configLoaded())
const configLoaded = () => {
  scriptsLoader(config.autoload, () => scriptsLoaded() )
}

//scriptsLoader(['app/config.js'], () => document.dispatchEvent(new Event('configLoaded')))
  //scriptsLoader(config.autoload, () => document.dispatchEvent(new Event('scriptsLoaded')) )
// document.addEventListener('configLoaded', () => {
//   scriptsLoader(config.autoload, () => document.dispatchEvent(new Event('scriptsLoaded')) )
// })

const scriptsLoaded = () => {
  let css = 'color:green;'
  let css1 = 'font-weight:bold;'
  console.info('%c--> Scripts Loaded', css)

  console.info('%cMarshalling assets', css+css1)
  const marshall = marshalls(propsPlans, setsPlans)

  // scripted actions
  const customActions = (marshall, act) => {
    return (act) => {
    console.log('chra',act)
      marshall.action(act.action, act.id)
    }
  }

  custom = customActions(marshall)

  localStorage.setItem('player', JSON.stringify({ name: 'Playe Rone', character: 'Charac Ter' }))
  loadGame(marshall.cabinet)

  const stage = theater(royal(marshall.cabinet.draws))
  stage.build()

  //marshall.move(marshall.cabinet.draws.character.location)

  //moves_test_saves(marshall)
  //moves_one(marshall)

  //console.log(marshall.cabinet)
}


let custom = () => {}

// document.addEventListener('scriptsLoaded', () => {
//   let css = 'color:green;'
//   let css1 = 'font-weight:bold;'
//   console.info('%c--> Scripts Loaded', css)
//
//   console.info('%cMarshalling assets', css+css1)
//   const marshall = marshalls(propsPlans, setsPlans)
//
//   // scripted actions
//   const customActions = (marshall, act) => {
//     return (act) => {
//     console.log('chra',act)
//       marshall.action(act.action, act.id)
//     }
//   }
//
//   custom = customActions(marshall)
//
//   localStorage.setItem('player', JSON.stringify({ name: 'Playe Rone', character: 'Charac Ter' }))
//   loadGame(marshall.cabinet)
//
//   const stage = theater(royal(marshall.cabinet.draws))
//   stage.build()
//
//   marshall.move(marshall.cabinet.draws.character.location)
//
//   //moves_test_saves(marshall)
//   //moves_one(marshall)
//
//   console.log(marshall.cabinet)
//
// })
