const conn = require('../db/conn')

class UsuarioModel {
    static buscar(email){
        const sql = `SELECT * FROM tb_usuarios WHERE email = ?`

        return new Promise((resolve, reject) => {
            conn.query(sql, [email], (erro, data) => {
                if(erro){
                    return reject(erro)
                }

                resolve(data)
            })
        })
    }

    static cadastrar(nome, email, senha){
        const sql = `INSERT INTO tb_usuarios(nome, email, senha) VALUES(?, ?, ?)`

        return new Promise((resolve, reject) => {
            conn.query(sql, [nome, email, senha], (erro) => {
                if(erro){
                    return reject(erro)
                }

                resolve()
            })
        })
    }

    static buscarId(email){
        const sql = `SELECT id FROM tb_usuarios WHERE email = ?`

        return new Promise((resolve, reject) => {
            conn.query(sql, [email], (erro, data) => {
                if(erro){
                    return reject(erro)
                }

                resolve(data[0].id)
            })
        })
    }

    static buscarSenha(email){
        const sql = `SELECT senha FROM tb_usuarios WHERE email = ?`

        return new Promise((resolve, reject) => {
            conn.query(sql, [email], (erro, data) => {
                if(erro){
                    return reject(erro)
                }

                resolve(data[0].senha)
            })
        })
    }
}

module.exports = UsuarioModel