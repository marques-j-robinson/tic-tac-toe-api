const { Router } = require('express')
const { getSingle, getAll, create, remove } = require('../models/game.js')
const app = Router()

app.get("/games", async (req, res) => {
    const { gameId } = req.query
    if (gameId) {
        const game = await getSingle(gameId)
        return res.send({
            success: true,
            data: game
        })
    }
    const games = await getAll()
    return res.send({
        success: true,
        data: games
    })
})

app.post("/games", async (req, res) => {
    if (!req.body.name) {
        return req.status(400).send({
            success: false,
            msg: "Parameter 'name' is missing from request body!"
        })
    }
    const games = await create(req.body.name)
    return res.send({
        success: true,
        data: games
    })
})

app.delete("/games/:gameId", async (req, res) => {
    try {
        const games = await remove(req.params.gameId)
        return res.send({
            success: true,
            data: games
        })
    } catch (e) {
        return res.status(500).send({"success": false, "msg": e.message})
    }
})

module.exports = app