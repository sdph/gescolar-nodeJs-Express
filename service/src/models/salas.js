const conexao = require('../infraestrutura/conexao')
const moment = require('moment')

class Salas {
    adiciona(salas, res) {
        const dataCadastro = moment().format('YYYY-MM-DD')
        const data = moment(salas.dataCadastro, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        console.log(data)
        const dataEhValida = moment(data).isSameOrAfter(dataCadastro)

        const validacoes = [{
            nome: 'data',
            valido: dataEhValida,
            mensagem: 'Data deve ser maior ou igual a data atual'
        }]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros)
        } else {
            const novaSalas = {...salas, dataCadastro, data }
            console.log(novaSalas)
            const sql = 'INSERT INTO Salas SET ?'
            conexao.query(sql, salas, (erro, resultados) => {
                if (erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(novaSalas)
                }
            })
        }
    }

    alterar(id, valores, res) {
        const sql = 'UPDATE Salas SET ? WHERE id = ?'
        conexao.query(sql, [valores, id], (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores,id})
            }
        })
    }
    buscarTodos(res) {
        const sql = 'SELECT * FROM Salas'
        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    buscarPorId(id, res) {
        const sql = 'SELECT * FROM Salas WHERE Id = ?'
        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    excluir(id, res) {
        const sql = 'DELETE FROM Salas WHERE Id = ?'
        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({
                    id
                })
            }
        })
    }

}

module.exports = new Salas