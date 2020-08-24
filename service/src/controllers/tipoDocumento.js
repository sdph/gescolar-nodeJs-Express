const tipoDocumento = require('../models/tipoDocumento')

module.exports = app => {
    app.get('/tipoDocumento', (req, res)=>{
        tipoDocumento.buscarTodos(res)
    })
    
    app.get('/tipoDocumento/:id', (req, res)=> {
        const id = parseInt(req.params.id)
        tipoDocumento.buscarPorId(id, res)
    })

    app.post('/tipoDocumento', (req, res)=>{
        const tipo = req.body
        tipoDocumento.adiciona(tipo, res)
    })

    app.patch('/tipoDocumento/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body
        tipoDocumento.altera(id, valores, res)
    })

    app.delete('/tipoDocumento/:id', (req, res) =>{
        const id = parseInt(req.params.id)
        tipoDocumento.excluir(id, res)
    })
}