const conexao = require('../infraestrutura/conexao')
const moment = require('moment')

class Matriculas {

    adiciona(matricula, res){
            const sql = 'INSERT INTO Matriculas SET ? '
            conexao.query(sql, matricula, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(matricula)
                }
            })
    }

    alterar(id, valores, res){
        const sql = 'UPDATE Matriculas SET ? WHERE Id = ?'
        conexao.query(sql, [valores, id], (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    buscarTodos(res){
        const sql = 'SELECT * FROM Matriculas'

        conexao.query(sql, (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    buscarPorId(id, res){
        const sql = `SELECT * FROM Matriculas WHERE id=${id}`
        conexao.query(sql, (erro,resultados)=>{
            const matricula = resultados[0]
            if(erro){
                res.status(400).json(erro)
            }else {
                res.status(200).json(matricula)
            }
        })
    }
    excluir(id, res){
        const sql = 'DELETE FROM Matriculas WHERE id=?'
        conexao.query(sql, id, (erro, resultados)=> {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Matriculas