const conexao = require('../infraestrutura/conexao')
const moment = require('moment')

class Turnos {

    adiciona(turno, res){
        const dataCadastro = moment().format('YYYY-MM-DD')
        const data = moment(turno.dataCadastro, 'DD/MM/YYYY').format('YYYY-MM-DD')

        const dataEhValida = moment(data).isSameOrAfter(dataCadastro)
 
        const turnoEhValido = turno.descricao.length >= 3

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            }, 
            {
                nome: 'descricao',
                valido: turnoEhValido,
                mensagem: 'A descrição deve ter no minimo 3 caracteres.'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros){
            res.status(400).json(erros)
        } else {
            const novoTurno = {...turno, dataCadastro, data}
            const sql = 'INSERT INTO Turno SET ? '
            conexao.query(sql, turno, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(novoTurno)
                }
            })
        }

    }

    alterar(id, valores, res){
        if(valores.dataCadastro) {
            valores.dataCadastro = moment(valores.dataCadastro, 'DD/MM/YYYY').format('YYYY-MM-DD')
        }
        const sql = 'UPDATE Turno SET ? WHERE Id = ?'
        conexao.query(sql, [valores, id], (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    buscarTodos(res){
        const sql = 'SELECT * FROM Turno'

        conexao.query(sql, (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    buscarPorId(id, res){
        const sql = `SELECT * FROM Turno WHERE id=${id}`
        conexao.query(sql, (erro,resultados)=>{
            const turno = resultados[0]
            if(erro){
                res.status(400).json(erro)
            }else {
                res.status(200).json(turno)
            }
        })
    }
    excluir(id, res){
        const sql = 'DELETE FROM Turno WHERE id=?'
        conexao.query(sql, id, (erro, resultados)=> {
            
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Turnos