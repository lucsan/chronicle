// Theater stage interface

const theater = (stage) => {

  const build = () => { stage.build() }

  document.addEventListener('chronicle_dispatch', (event) => {
    const d = event.detail

    if (d.action == 'look') { stage.look(d) }
    if (d.action == 'prop') { stage.prop(d) }
    if (d.action == 'move') { stage.move(d) }
    if (d.action == 'update') { stage.update(d) }
    if (d.action == 'combine') { stage.combine(d) }    
    //console.log(d)
  })

  return {
    build,
  }
}
