const conexao = require('../infraestrutura/conexao')
const moment = require('moment')

class GradeCurricular {

    adiciona(grade, res){
            const sql = 'INSERT INTO GradeCurricular SET ? '
            conexao.query(sql, grade, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(grade)
                }
            })
    }

    alterar(id, valores, res){
        const sql = 'UPDATE GradeCurricular SET ? WHERE Id = ?'
        conexao.query(sql, [valores, id], (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    buscarTodos(res){
        const sql = 'SELECT * FROM GradeCurricular'

        conexao.query(sql, (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    buscarPorId(id, res){
        const sql = `SELECT * FROM GradeCurricular WHERE id=${id}`
        conexao.query(sql, (erro,resultados)=>{
            const grade = resultados[0]
            if(erro){
                res.status(400).json(erro)
            }else {
                res.status(200).json(grade)
            }
        })
    }
    excluir(id, res){
        const sql = 'DELETE FROM GradeCurricular WHERE id=?'
        conexao.query(sql, id, (erro, resultados)=> {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new GradeCurricular