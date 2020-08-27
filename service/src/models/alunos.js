const conexao = require('../infraestrutura/conexao')
const moment = require('moment')

class Alunos {

    adiciona(aluno, res) {
        const sql = 'INSERT INTO Alunos SET ? '
        conexao.query(sql, aluno, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(201).json(aluno)
            }
        })
    }

    alterar(id, valores, res) {

        const sql = 'UPDATE Alunos SET ? WHERE Id = ? '
        conexao.query(sql, [valores, id], (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({ ...valores, id })
            }
        })
    }

    buscarTodos(res) {
        const sql = 'SELECT * FROM Alunos'

        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    buscarPorId(id, res) {
        const sql = `SELECT * FROM Alunos WHERE id=${id}`
        conexao.query(sql, (erro, resultados) => {
            const aluno = resultados[0]
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(aluno)
            }
        })
    }
    excluir(id, res) {
        const sql = 'DELETE FROM Alunos WHERE id=?'
        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({ id })
            }
        })
    }
}

module.exports = new Alunos