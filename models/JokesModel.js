const conn = require('../db/conn')

class JokeModel {
    static inserir(id, titulo){
        const sql = `INSERT INTO tb_piadas(id_usuario, titulo) VALUES(?, ?)`

        return new Promise((resolve, reject) => {
            conn.query(sql, [id, titulo], erro => {
                if(erro){
                    return reject(erro)
                }

                resolve()
            })
        })
    }
    static buscarJokes(id) {
        const sql = `SELECT * FROM tb_piadas WHERE id_usuario = ?`

        return new Promise((resolve, reject) => {
            conn.query(sql, [id], (erro, data) => {
                if(erro){
                    return reject(erro)
                }

                resolve(data)
            })
        })
    }

    static deletar(id){
        const sql = `DELETE FROM tb_piadas WHERE id = ?`

        return new Promise((resolve, reject) => {
            conn.query(sql, [id], erro => {
                if(erro){
                    return reject(erro)
                }

                resolve()
            })
        })
    }

    static buscarJokePorId(id) {
        const sql = `SELECT * FROM tb_piadas WHERE id = ?`

        return new Promise((resolve, reject) => {
            conn.query(sql, [id], (erro, data) => {
                if(erro){
                    return reject(erro)
                }

                resolve(data[0])
            })
        })
    }

    static atualizar(id, piada) {
        const sql = `UPDATE tb_piadas SET titulo = ? WHERE id = ?`

        return new Promise((resolve, reject) => {
            conn.query(sql, [piada, id], erro => {
                if(erro){
                    return reject(erro)
                }

                resolve()
            })
        })
    }

    static buscarTodas(){
        const sql = `SELECT * FROM  tb_usuarios INNER JOIN tb_piadas ON tb_piadas.id_usuario = tb_usuarios.id ORDER BY tb_piadas.id DESC`

        return new Promise((resolve, reject) => {
            conn.query(sql, (erro, data) => {
                if(erro){
                    return reject(erro)
                }

                resolve(data)
            })
        })
    }
}

module.exports = JokeModel