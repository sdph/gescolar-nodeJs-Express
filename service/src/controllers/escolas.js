const escolas = require('../models/escolas')

module.exports = app =>{
    app.get('/escolas', ( req, res) => {
        escolas.buscarTodos(res)
    })

    app.get('/escolas/:id', (req, res) => {
        const id = parseInt(req.params.id)
        escolas.buscarPorId(id, res)
    })

    app.post('/escolas', (req, res) => {
        const escola = req.body
        escolas.adiciona(escola, res)
    })

    app.patch('/escolas/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        escolas.alterar(id, valores, res)
    })

    app.delete('/escolas/:id', (req, res) => {
        const id = parseInt(req.params.id)
        escolas.excluir(id, res)
    })


}
