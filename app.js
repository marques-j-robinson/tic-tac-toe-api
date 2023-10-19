const express = require('express')
const cors = require('cors')
const db = require('./db.js')

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
    db.query("SELECT * FROM game", function (err, result) {
        response.send(result)
    })
})

app.post("/games", (request, response) => {
    if (!request.body.name) {
        response.status(400).send("Parameter 'name' is missing from request body!")
        return
    }
    const {name} = request.body
    db.query("INSERT INTO game (name) VAlUE (?)", name, (err, result) => {
        db.query("SELECT * FROM game", (selectErr, games) => {
            response.send({"success": true, "games": games})
        })
    })
})

app.delete("/game/:id", (request, response) => {
    db.query("DELETE FROM game WHERE game_id = ?", request.params.id, (err, result) => {
        if (err) {
            response.status(500).send({"success": false, "msg": "server error"})
            return
        }
        db.query("SELECT * FROM game", (selectErr, games) => {
            response.send({"success": true, "games": games})
        })
    })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT)
})