const conexao = require('../infraestrutura/conexao')

class Disciplinas {

    adiciona(disciplina, res){
        const nomeEhValido = disciplina.nome.length >= 3

        const validacoes = [
            {
                nome: 'nome',
                valido: nomeEhValido,
                mensagem: 'O nome deve ter no minimo 3 caracteres.'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros){
            res.status(400).json(erros)
        } else {
            const sql = 'INSERT INTO disciplinas SET ? '
            conexao.query(sql, disciplina, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(disciplina)
                }
            })
        }

    }

    alterar(id, valores, res){
        const sql = 'UPDATE disciplinas SET ? WHERE Id = ?'
        conexao.query(sql, [valores, id], (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    buscarTodos(res){
        const sql = 'SELECT * FROM disciplinas'

        conexao.query(sql, (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    buscarPorId(id, res){
        const sql = `SELECT * FROM disciplinas WHERE id=${id}`
        conexao.query(sql, (erro,resultados)=>{
            const disciplina = resultados[0]
            if(erro){
                res.status(400).json(erro)
            }else {
                res.status(200).json(disciplina)
            }
        })
    }
    excluir(id, res){
        const sql = 'DELETE FROM disciplinas WHERE id=?'
        conexao.query(sql, id, (erro, resultados)=> {
            
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Disciplinas
