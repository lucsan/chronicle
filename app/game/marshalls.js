const marshalls = (defaultProps, defaultSets) => {
  let cabinet = new Cabinet
  let acts = actions()

  const move = (to) => acts.doMove(to, cabinet)
  const action = (act, id) => acts.doAction(act, id, cabinet)

  cabinet.use({ props: defaultProps })
  cabinet.use({ sets: defaultSets })

  plans.loadProps(cabinet.draws.props)
  cabinet.use({ decor: plans.initaliseProps(acts.defaultActions, action) })
  cabinet.use({ saves: { decor: cabinet.draws.decor } })

  plans.loadSets(cabinet.draws.sets)
  cabinet.use({ places: defaultSets })

  cabinet.use({ tools: { propsAtLoc: plans.propsAtLoc } })
  cabinet.use({ tools: { saveGame: saveGame } } )
  cabinet.use({ tools: { loadGame: loadGame } } )

  //cabinet.use({ tools: { customAction: acts.dispatch } })

  return {
    cabinet,
    move,
    action
  }
}
