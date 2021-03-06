// Theater stage interface

const theater = (stage) => {

  const build = () => { stage.build() }

  document.addEventListener('chronicle_dispatch', (event) => {
    const d = event.detail
    //console.log('theater', d)

    if (d.action == 'look') return stage.look(d)
    if (d.action == 'prop') return stage.prop(d)
    if (d.action == 'move') return stage.move(d)
    if (d.action == 'update') return stage.update(d)
    if (d.action == 'combine') return stage.combine(d)
    if (d.action == 'remark') return stage.remark(d)
    if (d.action == 'customUpdate') return stage.customUpdate(d)
    if (d.action == 'doorsUpdate') return stage.doorsUpdate(d)

    // Custom actions

    // console.log('custom command', d)
    // //if (d.action == 'msg') return stage.remark(d)
    //
    // if (d.action == 'custom') {
    //   //return stage[]
    //   console.log('d.act', d.act)
    //   //return d.act()
    //   return d.act()
    // }
    //
    // const unlock = () => { console.log('unlocking') }



  })



  return {
    build
  }
}
