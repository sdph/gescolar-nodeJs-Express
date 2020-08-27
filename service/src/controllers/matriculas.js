const matriculas = require('../models/matriculas')

module.exports = app =>{
    app.get('/matriculas', ( req, res) => {
        matriculas.buscarTodos(res)
    })

    app.get('/matriculas/:id', (req, res) => {
        const id = parseInt(req.params.id)
        matriculas.buscarPorId(id, res)
    })

    app.post('/matriculas', (req, res) => {
        const escola = req.body
        matriculas.adiciona(escola, res)
    })

    app.patch('/matriculas/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body
        matriculas.alterar(id, valores, res)
    })

    app.delete('/matriculas/:id', (req, res) => {
        const id = parseInt(req.params.id)
        matriculas.excluir(id, res)
    })
}
