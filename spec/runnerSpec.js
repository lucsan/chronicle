describe('Runs vareous action of the program', () => {

  const marshall = marshalls(propsPlans, setsPlans)
  let draws = marshall.cabinet.draws
  let decor = draws.decor

  it('should', () => {
    stage = theater(headless(draws))
    stage.build()

    //console.log(marshall)
    expect('a').toBe('b')
  })
})
