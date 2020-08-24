const salas = require('../models/salas')
const turnos = require('../models/turnos')

module.exports = app => {
    app.get('/salas', (req, res) => {
        turnos.buscarTodos(res)
    })

    app.get('/salas/:id', (req, res) => {
        const id = parseInt(req.params.id)
        salas.buscarPorId(id, res)
    })

    app.post('/salas', (req, res) => {
        const sala = req.body
        salas.adiciona(sala, res)
    })
    
    app.patch('/salas/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body
        salas.alterar(id, valores, res)
    })

    app.delete('/salas/:id', (req, res) =>{
        const id = parseInt(req.params.id)
        salas.excluir(id, res)
    })
}