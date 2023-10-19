const mysql = require('mysql')
const config = require('config')

const dbConfig = config.get('TicTacToe.dbConfig')
const pool = mysql.createPool(dbConfig)
pool.getConnection((err, con) => {
    if (err) throw err
    console.log('Database connected successfully!!')
    con.release()
})

module.exports = pool