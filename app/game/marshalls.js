const marshalls = (defaultProps, defaultSets) => {
  let cabinet = new Cabinet
  let acts = actions()
  let planz = plans()

  const move = (to) => acts.doMove(to, cabinet)
  const action = (act, id) => acts.doAction(act, id, cabinet)

  cabinet.use({ props: defaultProps })
  cabinet.use({ sets: defaultSets })
  cabinet.use({ places: defaultSets })

  // Note: cabinet.use has bug when stowing arrays
  cabinet.use({
    decor: planz.initaliseProps(cabinet, {
      defaultActions: acts.defaultActions,
      action: action
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
