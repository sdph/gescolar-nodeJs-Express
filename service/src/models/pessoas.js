const conexao = require('../infraestrutura/conexao')
const moment = require('moment')

class Pessoas {
    adiciona(pessoa, res) {
        const dataCadastro = moment().format('YYYY-MM-DD')
        const data = moment(pessoa.dataCadastro, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const novapessoa = { ...pessoa, dataCadastro, data }
        const sql = 'INSERT INTO Pessoas SET ?'
        conexao.query(sql, pessoa, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(201).json(novapessoa)
            }
        })

    }

    alterar(id, valores, res) {
        const sql = 'UPDATE Pessoas SET ? WHERE id = ?'
        conexao.query(sql, [valores, id], (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({ ...valores, id })
            }
        })
    }
    buscarTodos(res) {
        const sql = 'SELECT * FROM Pessoas'
        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    buscarPorId(id, res) {
        const sql = 'SELECT * FROM Pessoas WHERE Id = ?'
        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    excluir(id, res) {
        const sql = 'DELETE FROM Pessoas WHERE Id = ?'
        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({ id })
            }
        })
    }
}

module.exports = new Pessoas