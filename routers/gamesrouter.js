const { Router } = require('express')
const { getSingle, getAll, create, remove } = require('../models/game.js')
const app = Router()

app.get("/games", async (req, res) => {
    try {
        const { gameId } = req.query
        if (gameId) {
            const game = await getSingle(gameId)
            if (!game) throw Error('GAME_NOT_FOUND')
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
    } catch (e) {
        return res.status(500).send({"success": false, "msg": e.message})
    }
})

app.post("/games", async (req, res) => {
    try {
        if (!req.body.name) throw Error('REQ_PARAM_MISSING')
        const games = await create(req.body.name)
        return res.send({
            success: true,
            data: games
        })
    } catch (e) {
        return res.status(500).send({"success": false, "msg": e.message})
    }
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