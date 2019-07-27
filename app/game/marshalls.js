const marshalls = (defaultProps, defaultSets) => {
  let cabinet = new Cabinet
  let acts = actions()
  let planz = plans()

  const move = (to) => acts.doMove(to, cabinet)
  const action = (act, id) => acts.doAction(act, id, cabinet)

  cabinet.use({ props: defaultProps })
  cabinet.use({ sets: defaultSets })
  cabinet.use({ places: defaultSets })

  planz.loadProps(cabinet.draws.props)
  planz.loadSets(cabinet.draws.sets)

  cabinet.use({
    decor: planz.initaliseProps({
      defaultActions: acts.defaultActions,
      action: action,
      draws: cabinet.draws
    })
  })
    
  cabinet.use({ tools: { propsAtLoc: planz.propsAtLoc } })
  cabinet.use({ tools: { propsInBox: planz.propsInBox } })

  cabinet.use({ tools: { move: move } })
  cabinet.use({ tools: { saveGame: saveGame } } )
  cabinet.use({ tools: { loadGame: loadGame } } )

  cabinet.use({ tools: { dispatch: acts.dispatch } })

  return {
    cabinet,
    move,
    action
  }
}
