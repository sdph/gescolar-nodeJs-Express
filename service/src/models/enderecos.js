const conexao = require('../infraestrutura/conexao')

class Enderecos {
    adiciona(endereco, res) {

        const sql = 'INSERT INTO Enderecos SET ?'
        conexao.query(sql, endereco, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(201).json(endereco)
            }
        })

    }

    alterar(id, valores, res) {
        const sql = 'UPDATE Enderecos SET ? WHERE id = ?'
        conexao.query(sql, [valores, id], (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({ ...valores, id })
            }
        })
    }
    buscarTodos(res) {
        const sql = 'SELECT * FROM Enderecos'
        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    buscarPorId(id, res) {
        const sql = 'SELECT * FROM Enderecos WHERE Id = ?'
        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    excluir(id, res) {
        const sql = 'DELETE FROM Enderecos WHERE Id = ?'
        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({ id })
            }
        })
    }
}

module.exports = new Enderecos