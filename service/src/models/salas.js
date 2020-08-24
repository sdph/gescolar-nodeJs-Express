const conexao = require('../infraestrutura/conexao')

class Salas {
    adiciona(salas, res){
        const sql = 'INSERT INTO Salas SET ?'
        conexao.query(sql, salas, (erro, resultados) =>{
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(201).json(salas)
            }
        })
    }
    alterar(id, valores, res){
        const sql = 'UPDATE Salas SET ? WHERE id = ?'
        conexao.query(sql, [valores, id], (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }
    buscarTodos(res){
        const sql = 'SELECT * FROM Salas'
        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    buscarPorId(id, res){
        const sql = 'SELECT * FROM Salas WHERE Id = ?'
        conexao.query(sql, id, (erro, resultados) =>{
            if(erro){
                res.status(400).json(erro)
            } else{
                res.status(200).json(resultados)
            }
        })
    }
    excluir(id, res){
        const sql = 'DELETE FROM Salas WHERE Id = ?'
        conexao.query(sql, id, (erro, resultados) => {
            if(erro){
               res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }

}

module.exports = new Salas