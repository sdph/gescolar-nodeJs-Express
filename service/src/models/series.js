const conexao = require('../infraestrutura/conexao')
const moment = require('moment')

class Series {
    adiciona(serie, res) {
        const dataCadastro = moment().format('YYYY-MM-DD')
        const data = moment(serie.dataCadastro, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
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
            const novaserie = {...serie, dataCadastro, data }
            console.log(novaserie)
            const sql = 'INSERT INTO Series SET ?'
            conexao.query(sql, serie, (erro, resultados) => {
                if (erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(novaserie)
                }
            })
        }
    }

    alterar(id, valores, res) {
        const sql = 'UPDATE Series SET ? WHERE id = ?'
        conexao.query(sql, [valores, id], (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores,id})
            }
        })
    }
    buscarTodos(res) {
        const sql = 'SELECT * FROM Series'
        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    buscarPorId(id, res) {
        const sql = 'SELECT * FROM Series WHERE Id = ?'
        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    excluir(id, res) {
        const sql = 'DELETE FROM Series WHERE Id = ?'
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

module.exports = new Series