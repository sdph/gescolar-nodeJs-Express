const conexao = require('../infraestrutura/conexao')
const moment = require('moment')

class Escola {

    adiciona(escola, res){
        // const dataCadastro = moment().format('YYYY-MM-DD HH:MM:SS')
        // const data = moment(escola.dataCadastro, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        // const dataEhValida = moment(data).isSameOrAfter(dataCadastro)
        const escolaEhValido = escola.nome.length >= 5

        const validacoes = [
            // {
            //     nome: 'data',
            //     valido: dataEhValida,
            //     mensagem: 'Data deve ser maior ou igual a data atual'
            // }, 
            {
                nome: 'nome',
                valido: escolaEhValido,
                mensagem: 'Escola deve ter pelo menos 5 caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros){
            res.status(400).json(erros)
        } else {
            // const novaEscola = {...escola, dataCadastro, data}
            const sql = 'INSERT INTO Instituicoes SET ? '
            conexao.query(sql, escola, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(escola)
                }
            })
        }

    }

    alterar(id, valores, res){
        // if(valores.dataCadastro) {
        //     valores.dataCadastro = moment(valores.dataCadastro, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        // }
        const sql = 'UPDATE Instituicoes SET ? WHERE Id = ? '
        conexao.query(sql, [valores, id], (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    buscarTodos(res){
        const sql = 'SELECT * FROM Instituicoes'

        conexao.query(sql, (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    buscarPorId(id, res){
        const sql = `SELECT * FROM Instituicoes WHERE id=${id}`
        conexao.query(sql, (erro,resultados)=>{
            const escola = resultados[0]
            if(erro){
                res.status(400).json(erro)
            }else {
                res.status(200).json(escola)
            }
        })
    }
    excluir(id, res){
        const sql = 'DELETE FROM Instituicoes WHERE id=?'
        conexao.query(sql, id, (erro, resultados)=> {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }

}

module.exports = new Escola