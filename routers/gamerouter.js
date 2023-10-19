const { Router } = require('express')
const db = require('../db.js')
const app = Router()

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

module.exports = app