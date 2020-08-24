const conexao = require('../infraestrutura/conexao')

class TipoDocumento {
    adiciona(tipoDocumento, res){
        const sql  = 'INSERT INTO TipoDocumento SET ?' 
        conexao.query(sql, tipoDocumento, (erro, resultado) =>{
            if(erro){
                res.status(400).json(erro)                
            } else {
                res.status(201).json(tipoDocumento)
            }
        })
    }

    altera(id, valores, res){
        const sql = 'UPDATE TipoDocumento SET ? WHERE Id = ?'
        conexao.query(sql, [valores, id], (erro, resulado) =>{
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }
    buscarTodos(res){
        const sql = 'SELECT * FROM TipoDocumento'
        conexao.query(sql, (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })

    }
    buscarPorId(id, res){
        const sql = 'SELECT * FROM TipoDocumento WHERE Id = ?'
        conexao.query(sql, id, (erro, resultados)=>{
            const tipoDocumento = resultados[0]
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(tipoDocumento)
            }
        })
    }
    excluir(id, res){
        const sql = 'DELETE FROM TipoDocumento WHERE Id =?'
        conexao.query(sql, id, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}
module.exports = new TipoDocumento