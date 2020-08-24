const anoletivo = require('../models/anoLetivo')

module.exports = app => {
    app.get('/anoletivo', (req, res) => {
        anoletivo.buscarTodos(res)
    })

    app.get('/anoletivo/:id', (req, res) => {
        const id = parseInt(req.params.id)
        anoletivo.buscarPorId(id, res)
    })

    app.post('/anoletivo', (req, res) => {
        const disciplina = req.body
        anoletivo.adiciona(disciplina, res)
    })

    app.patch('/anoletivo/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body
        anoletivo.alterar(id, valores, res)
    })

    app.delete('/anoletivo/:id', (req, res) => {
        const id = parseInt(req.params.id)
        anoletivo.excluir(id, res)
    })
}