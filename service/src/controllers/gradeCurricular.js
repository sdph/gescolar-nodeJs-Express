const gradecurricular = require('../models/gradecurricular')

module.exports = app =>{
    app.get('/gradecurricular', ( req, res) => {
        gradecurricular.buscarTodos(res)
    })

    app.get('/gradecurricular/:id', (req, res) => {
        const id = parseInt(req.params.id)
        gradecurricular.buscarPorId(id, res)
    })

    app.post('/gradecurricular', (req, res) => {
        const escola = req.body
        gradecurricular.adiciona(escola, res)
    })

    app.patch('/gradecurricular/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body
        gradecurricular.alterar(id, valores, res)
    })

    app.delete('/gradecurricular/:id', (req, res) => {
        const id = parseInt(req.params.id)
        gradecurricular.excluir(id, res)
    })
}
