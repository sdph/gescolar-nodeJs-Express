const pessoas = require('../models/pessoas')


module.exports = app => {
    app.get('/pessoas', (req, res) => {
        pessoas.buscarTodos(res)
    })

    app.get('/pessoas/:id', (req, res) => {
        const id = parseInt(req.params.id)
        pessoas.buscarPorId(id, res)
    })

    app.post('/pessoas', (req, res) => {
        const sala = req.body
        pessoas.adiciona(sala, res)
    })
    
    app.patch('/pessoas/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body
        pessoas.alterar(id, valores, res)
    })

    app.delete('/pessoas/:id', (req, res) =>{
        const id = parseInt(req.params.id)
        pessoas.excluir(id, res)
    })
}