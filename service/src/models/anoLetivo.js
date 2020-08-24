const conexao = require('../infraestrutura/conexao')

class AnoLetivo {

    adiciona(anoletivo, res){

            const sql = 'INSERT INTO AnoLetivo SET ? '
            conexao.query(sql, anoletivo, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(anoletivo)
                }
            })
    }

    alterar(id, valores, res){
        const sql = 'UPDATE AnoLetivo SET ? WHERE Id = ?'
        conexao.query(sql, [valores, id], (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    buscarTodos(res){
        const sql = 'SELECT * FROM AnoLetivo'

        conexao.query(sql, (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    buscarPorId(id, res){
        const sql = `SELECT * FROM AnoLetivo WHERE id=${id}`
        conexao.query(sql, (erro,resultados)=>{
            const anoletivo = resultados[0]
            if(erro){
                res.status(400).json(erro)
            }else {
                res.status(200).json(anoletivo)
            }
        })
    }
    excluir(id, res){
        const sql = 'DELETE FROM AnoLetivo WHERE id=?'
        conexao.query(sql, id, (erro, resultados)=> {
            
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new AnoLetivo
