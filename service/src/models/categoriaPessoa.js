const conexao = require('../infraestrutura/conexao')
const moment = require('moment')

class CategoriaPessoa {

    adiciona(categoria, res){

        const categoriaEhValido = categoria.categoria.length >= 3

        const validacoes = [
            {
                nome: 'categoria',
                valido: categoriaEhValido,
                mensagem: 'A categoria deve ter no minimo 3 caracteres.'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros){
            res.status(400).json(erros)
        } else {
            const sql = 'INSERT INTO CategoriaPessoa SET ? '
            conexao.query(sql, categoria, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(categoria)
                }
            })
        }

    }

    alterar(id, valores, res){

        const sql = 'UPDATE CategoriaPessoa SET ? WHERE Id = ? '
        conexao.query(sql, [valores, id], (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    buscarTodos(res){
        const sql = 'SELECT * FROM CategoriaPessoa'

        conexao.query(sql, (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    buscarPorId(id, res){
        const sql = `SELECT * FROM CategoriaPessoa WHERE id=${id}`
        conexao.query(sql, (erro,resultados)=>{
            const categoria = resultados[0]
            if(erro){
                res.status(400).json(erro)
            }else {
                res.status(200).json(categoria)
            }
        })
    }
    excluir(id, res){
        const sql = 'DELETE FROM CategoriaPessoa WHERE id=?'
        conexao.query(sql, id, (erro, resultados)=> {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new CategoriaPessoa