const series = require('../models/series')


module.exports = app => {
    app.get('/series', (req, res) => {
        series.buscarTodos(res)
    })

    app.get('/series/:id', (req, res) => {
        const id = parseInt(req.params.id)
        series.buscarPorId(id, res)
    })

    app.post('/series', (req, res) => {
        const sala = req.body
        series.adiciona(sala, res)
    })
    
    app.patch('/series/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body
        series.alterar(id, valores, res)
    })

    app.delete('/series/:id', (req, res) =>{
        const id = parseInt(req.params.id)
        series.excluir(id, res)
    })
}