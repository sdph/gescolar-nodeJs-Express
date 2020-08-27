const enderecos = require('../models/enderecos')


module.exports = app => {
    app.get('/enderecos', (req, res) => {
        enderecos.buscarTodos(res)
    })

    app.get('/enderecos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        enderecos.buscarPorId(id, res)
    })

    app.post('/enderecos', (req, res) => {
        const sala = req.body
        enderecos.adiciona(sala, res)
    })
    
    app.patch('/enderecos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body
        enderecos.alterar(id, valores, res)
    })

    app.delete('/enderecos/:id', (req, res) =>{
        const id = parseInt(req.params.id)
        enderecos.excluir(id, res)
    })
}