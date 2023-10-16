const express = require('express')
const mysql = require('mysql')
const config = require('config')

const dbConfig = config.get('TicTacToe.dbConfig')
const pool = mysql.createPool(dbConfig)

const app = express()
app.use(express.json())

app.get("/status", (request, response) => {
    const status = {
       "Status": "Running"
    }
    
    response.send(status)
})

app.get("/games", (request, response) => {
    pool.getConnection(function(err, con) {
        if (err) throw err
        console.log("Connected!")
        con.query("SELECT * FROM game", function (err, result) {
            if (err) throw err
            console.log("Result: " + result)
            response.send(result)
        })
    })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT)
})