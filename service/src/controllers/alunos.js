const alunos = require('../models/alunos')

module.exports = app => {
    app.get('/alunos', (req, res) => {
        alunos.buscarTodos(res)
    })

    app.get('/alunos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        alunos.buscarPorId(id, res)
    })

    app.post('/alunos', (req, res) => {
        const disciplina = req.body
        alunos.adiciona(disciplina, res)
    })

    app.patch('/alunos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body
        alunos.alterar(id, valores, res)
    })

    app.delete('/alunos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        alunos.excluir(id, res)
    })
}