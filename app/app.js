console.log('%cApp running ->>', 'color:red;font-weight:bold;')

let marshall = null

const loadCommonScripts = () => {
  scriptsLoader(['app/config.js'], () => commonConfigLoaded())

}

const commonConfigLoaded = () => {
  scriptsLoader(commonConfig.autoload, () => loadVersionConfig() )
}

const loadVersionConfig = () => {
  scriptsLoader([`app/data/${story}/config.js`], () => loadVersionScripts())
}

const loadVersionScripts = () => {
  scriptsLoader(versionConfig.autoload, () => scriptsLoaded())
}

loadCommonScripts()


const setActions = (a) => {
  console.log('setactions', a)
}

const scriptsLoaded = () => {
  let css = 'color:green;'
  let css1 = 'font-weight:bold;'
  console.info('%c--> Scripts Loaded', css)

  console.info('%cMarshalling assets', css+css1)
  marshall = marshalls(propsPlans, setsPlans)


  localStorage.setItem('player', JSON.stringify({ name: 'Playe Rone', character: 'Charac Ter' }))
  console.log(marshall.cabinet)

  loadGame(marshall.cabinet)

  const stage = theater(royal(marshall.cabinet.draws))
  stage.build()

}

//console.log('m', marshall)

let custom = (info) => { marshall.action(info.action, info.id) }