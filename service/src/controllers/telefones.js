const telefones = require('../models/telefones')


module.exports = app => {
    app.get('/telefones', (req, res) => {
        telefones.buscarTodos(res)
    })

    app.get('/telefones/:id', (req, res) => {
        const id = parseInt(req.params.id)
        telefones.buscarPorId(id, res)
    })

    app.post('/telefones', (req, res) => {
        const sala = req.body
        telefones.adiciona(sala, res)
    })
    
    app.patch('/telefones/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body
        telefones.alterar(id, valores, res)
    })

    app.delete('/telefones/:id', (req, res) =>{
        const id = parseInt(req.params.id)
        telefones.excluir(id, res)
    })
}