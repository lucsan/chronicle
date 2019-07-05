describe('cabinet', () => {

  let cabinet = new Cabinet

  it('should have a new constructor', () => {
    let test = new Cabinet
    expect(typeof(test)).toBe('object')
  })

  it('should have a draws value', () => {
    expect(typeof(cabinet.draws)).toBe('object')
  })

  it('should have a use function', () => {
    expect(typeof(cabinet.use())).toBe('object')
  })

  it('should return draws contents if use() has no params', () => {
    let cabinet = new Cabinet
    expect(cabinet.use().player.name).toBe('default')
  })

  it('should update draws contents if use() is sent a matching object', () => {
    cabinet.use({ player: { name: 'barry' } })
    expect(cabinet.use().player.name).toBe('barry')
  })

  it('should return an object if past a string', () => {
    let cabinet = new Cabinet
    expect(cabinet.use('player').name).toBe('default')
  })

  it('should poulate a full object', () => {
    let cabinet = new Cabinet
    const text = 'you proded it'
    const propsPlansTest = {
      testItem: {
        actions: {
          env: {
            prod: text
          }
        }
      }
    }
    cabinet.use({ props: propsPlansTest })
    expect(cabinet.draws.props.testItem.actions.env.prod).toBe(text)
  })

})
