const conexao = require('../infraestrutura/conexao')
const moment = require('moment')

class Turmas {

    adiciona(turmas, res){
        const dataCadastro = moment().format('YYYY-MM-DD')
        const data = moment(turmas.dataCadastro, 'DD/MM/YYYY').format('YYYY-MM-DD')

        const dataEhValida = moment(data).isSameOrAfter(dataCadastro)
 
        const turmasEhValido = turmas.descricao.length >= 3

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            }, 
            {
                nome: 'descricao',
                valido: turmasEhValido,
                mensagem: 'A descrição deve ter no minimo 3 caracteres.'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros){
            res.status(400).json(erros)
        } else {
            const novaTurma = {...turmas, dataCadastro, data}
            const sql = 'INSERT INTO Turma SET ? '
            conexao.query(sql, turmas, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(novaTurma)
                }
            })
        }

    }

    alterar(id, valores, res){
        if(valores.dataCadastro) {
            valores.dataCadastro = moment(valores.dataCadastro, 'DD/MM/YYYY').format('YYYY-MM-DD')
        }
        const sql = 'UPDATE Turma SET ? WHERE Id = ?'
        conexao.query(sql, [valores, id], (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    buscarTodos(res){
        const sql = 'SELECT * FROM Turma'

        conexao.query(sql, (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    buscarPorId(id, res){
        const sql = `SELECT * FROM Turma WHERE id=${id}`
        conexao.query(sql, (erro,resultados)=>{
            const turmas = resultados[0]
            if(erro){
                res.status(400).json(erro)
            }else {
                res.status(200).json(turmas)
            }
        })
    }
    excluir(id, res){
        const sql = 'DELETE FROM Turma WHERE id=?'
        conexao.query(sql, id, (erro, resultados)=> {
            
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Turmas