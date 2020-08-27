const conexao = require('../infraestrutura/conexao')
const moment = require('moment')

class Telefones {

    adiciona(telefone, res){
            const sql = 'INSERT INTO Telefones SET ? '
            conexao.query(sql, telefone, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(telefone)
                }
            })
    }

    alterar(id, valores, res){
        const sql = 'UPDATE Telefones SET ? WHERE Id = ?'
        conexao.query(sql, [valores, id], (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    buscarTodos(res){
        const sql = 'SELECT * FROM Telefones'

        conexao.query(sql, (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    buscarPorId(id, res){
        const sql = `SELECT * FROM Telefones WHERE id=${id}`
        conexao.query(sql, (erro,resultados)=>{
            const telefone = resultados[0]
            if(erro){
                res.status(400).json(erro)
            }else {
                res.status(200).json(telefone)
            }
        })
    }
    excluir(id, res){
        const sql = 'DELETE FROM Telefones WHERE id=?'
        conexao.query(sql, id, (erro, resultados)=> {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Telefones