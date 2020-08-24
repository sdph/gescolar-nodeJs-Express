const turnos = require('../models/turnos')

module.exports = app =>{
    app.get('/turnos', ( req, res) => {
        turnos.buscarTodos(res)
    })

    app.get('/turnos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        turnos.buscarPorId(id, res)
    })

    app.post('/turnos', (req, res) => {
        const turno = req.body
        turnos.adiciona(turno, res)
    })

    app.patch('/turnos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        turnos.alterar(id, valores, res)
    })

    app.delete('/turnos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        turnos.excluir(id, res)
    })


}
