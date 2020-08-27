const turmas = require('../models/turmas')

module.exports = app =>{
    app.get('/turmas', ( req, res) => {
        turmas.buscarTodos(res)
    })

    app.get('/turmas/:id', (req, res) => {
        const id = parseInt(req.params.id)
        turmas.buscarPorId(id, res)
    })

    app.post('/turmas', (req, res) => {
        const turno = req.body
        turmas.adiciona(turno, res)
    })

    app.patch('/turmas/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        turmas.alterar(id, valores, res)
    })

    app.delete('/turmas/:id', (req, res) => {
        const id = parseInt(req.params.id)
        turmas.excluir(id, res)
    })


}
