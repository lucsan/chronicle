const marshalls = (defaultProps, defaultSets) => {
  let cabinet = new Cabinet
  let acts = actions()

  const move = (to) => acts.doMove(to, cabinet)
  const action = (act, id) => {
    console.log('mart', act, id)
    acts.doAction(act, id, cabinet)
  }
  const custom = (act, id, special) => {
    acts.doCustom(act, id, special, cabinet)
  }

  cabinet.use({ props: defaultProps })
  cabinet.use({ sets: defaultSets })

  plans.loadProps(cabinet.draws.props)
  cabinet.use({ decor: plans.initaliseProps(acts.defaultActions, action) })
  cabinet.use({ saves: { decor: cabinet.draws.decor } })

  plans.loadSets(cabinet.draws.sets)
  cabinet.use({ places: defaultSets })

  cabinet.use({ tools: { propsAtLoc: plans.propsAtLoc } })
  cabinet.use({ tools: { move: move } })
  cabinet.use({ tools: { saveGame: saveGame } } )
  cabinet.use({ tools: { loadGame: loadGame } } )

  cabinet.use({ tools: { dispatch: acts.dispatch } })

  return {
    cabinet,
    move,
    action,
    //custom
  }
}
