const categoriasPessoa = require('../models/categoriaPessoa')

module.exports = app =>{
    app.get('/categoriasPessoa', ( req, res) => {
        categoriasPessoa.buscarTodos(res)
    })

    app.get('/categoriasPessoa/:id', (req, res) => {
        const id = parseInt(req.params.id)
        categoriasPessoa.buscarPorId(id, res)
    })

    app.post('/categoriasPessoa', (req, res) => {
        const turno = req.body
        categoriasPessoa.adiciona(turno, res)
    })

    app.patch('/categoriasPessoa/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        categoriasPessoa.alterar(id, valores, res)
    })

    app.delete('/categoriasPessoa/:id', (req, res) => {
        const id = parseInt(req.params.id)
        categoriasPessoa.excluir(id, res)
    })


}
