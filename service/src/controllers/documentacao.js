const documentacao = require('../models/documentacao')


module.exports = app => {
    app.get('/documentacao', (req, res) => {
        documentacao.buscarTodos(res)
    })

    app.get('/documentacao/:id', (req, res) => {
        const id = parseInt(req.params.id)
        documentacao.buscarPorId(id, res)
    })

    app.post('/documentacao', (req, res) => {
        const sala = req.body
        documentacao.adiciona(sala, res)
    })
    
    app.patch('/documentacao/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body
        documentacao.alterar(id, valores, res)
    })

    app.delete('/documentacao/:id', (req, res) =>{
        const id = parseInt(req.params.id)
        documentacao.excluir(id, res)
    })
}