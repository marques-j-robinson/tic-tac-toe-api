const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const config = require('config')

const dbConfig = config.get('TicTacToe.dbConfig')
const pool = mysql.createPool(dbConfig)

const app = express()
app.use(cors({origin: "http://localhost:3000"}))
app.use(express.json())
app.set('json spaces', 40)

app.get("/status", (request, response) => {
    const status = {
       "Status": "Running"
    }
    
    response.send(status)
})

app.get("/games", (request, response) => {
    pool.getConnection(function(err, con) {
        if (err) throw err
        con.query("SELECT * FROM game", function (err, result) {
            if (err) throw err
            con.release()
            response.send(result)
        })
    })
})

app.post("/games", (request, response) => {
    if (!request.body.name) {
        response.status(400).send("Parameter 'name' is missing from request body!")
        return
    }
    pool.getConnection((err, con) => {
        con.query("INSERT INTO game (name) VAlUE (?)", request.body.name, (err, result) => {
            if (err) throw err
            con.release()
            response.send({"success": true})
        })
    })
})

app.delete("/game/:id", (request, response) => {
    pool.getConnection((err, con) => {
        con.query("DELETE FROM game WHERE game_id = ?", request.params.id, (err, result) => {
            if (err) throw err
            con.release()
            response.send({"success": true})
        })
    })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT)
})