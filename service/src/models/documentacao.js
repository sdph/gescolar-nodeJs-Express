const conexao = require('../infraestrutura/conexao')
const moment = require('moment')

class Documentacao {
    adiciona(documento, res) {
        const dataCadastro = moment().format('YYYY-MM-DD')
        const data = moment(documento.dataCadastro, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const novoDocumento = { ...documento, dataCadastro, data }

        const sql = 'INSERT INTO Documentacao SET ?'
        conexao.query(sql, documento, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(201).json(novoDocumento)
            }
        })

    }

    alterar(id, valores, res) {
        const sql = 'UPDATE Documentacao SET ? WHERE id = ?'
        conexao.query(sql, [valores, id], (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({ ...valores, id })
            }
        })
    }
    buscarTodos(res) {
        const sql = 'SELECT * FROM Documentacao'
        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    buscarPorId(id, res) {
        const sql = 'SELECT * FROM Documentacao WHERE Id = ?'
        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    excluir(id, res) {
        const sql = 'DELETE FROM Documentacao WHERE Id = ?'
        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({ id })
            }
        })
    }
}

module.exports = new Documentacao