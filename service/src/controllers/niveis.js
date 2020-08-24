const niveis = require('../models/niveis')

module.exports = app =>{
    app.get('/niveis', ( req, res) => {
        niveis.buscarTodos(res)
    })

    app.get('/niveis/:id', (req, res) => {
        const id = parseInt(req.params.id)
        niveis.buscarPorId(id, res)
    })

    app.post('/niveis', (req, res) => {
        const turno = req.body
        niveis.adiciona(turno, res)
    })

    app.patch('/niveis/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        niveis.alterar(id, valores, res)
    })

    app.delete('/niveis/:id', (req, res) => {
        const id = parseInt(req.params.id)
        niveis.excluir(id, res)
    })


}
