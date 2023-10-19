const { Router } = require('express')
const db = require('../db.js')
const app = Router()

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

module.exports = app