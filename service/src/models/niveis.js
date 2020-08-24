const conexao = require('../infraestrutura/conexao')
const moment = require('moment')

class Niveis {

    adiciona(nivel, res){
        const dataCadastro = moment().format('YYYY-MM-DD')
        const data = moment(nivel.dataCadastro, 'DD/MM/YYYY').format('YYYY-MM-DD')

        const dataEhValida = moment(data).isSameOrAfter(dataCadastro)
 
        const nivelEhValido = nivel.descricao.length >= 3

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            }, 
            {
                nome: 'descricao',
                valido: nivelEhValido,
                mensagem: 'A descrição deve ter no minimo 3 caracteres.'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros){
            res.status(400).json(erros)
        } else {
            const novonivel = {...nivel, dataCadastro, data}
            const sql = 'INSERT INTO Nivel SET ? '
            conexao.query(sql, nivel, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(novonivel)
                }
            })
        }

    }

    alterar(id, valores, res){
        if(valores.dataCadastro) {
            valores.dataCadastro = moment(valores.dataCadastro, 'DD/MM/YYYY').format('YYYY-MM-DD')
        }
        const sql = 'UPDATE Nivel SET ? WHERE Id = ?'
        conexao.query(sql, [valores, id], (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    buscarTodos(res){
        const sql = 'SELECT * FROM Nivel'

        conexao.query(sql, (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    buscarPorId(id, res){
        const sql = `SELECT * FROM Nivel WHERE id=${id}`
        conexao.query(sql, (erro,resultados)=>{
            const nivel = resultados[0]
            if(erro){
                res.status(400).json(erro)
            }else {
                res.status(200).json(nivel)
            }
        })
    }
    excluir(id, res){
        const sql = 'DELETE FROM Nivel WHERE id=?'
        conexao.query(sql, id, (erro, resultados)=> {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Niveis