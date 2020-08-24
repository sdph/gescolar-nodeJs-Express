const disciplinas = require('../models/disciplinas')

module.exports = app => {
    app.get('/disciplinas', (req, res) => {
        disciplinas.buscarTodos(res)
    })

    app.get('/disciplinas/:id', (req, res) => {
        const id = parseInt(req.params.id)
        disciplinas.buscarPorId(id, res)
    })

    app.post('/disciplinas', (req, res) => {
        const disciplina = req.body
        disciplinas.adiciona(disciplina, res)
    })

    app.patch('/disciplinas/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body
        disciplinas.alterar(id, valores, res)
    })

    app.delete('/disciplinas/:id', (req, res) => {
        const id = parseInt(req.params.id)
        disciplinas.excluir(id, res)
    })
}