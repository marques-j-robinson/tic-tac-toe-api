const { Router } = require('express')
const { getSingle } = require('../models/game.js')
const { getAll, addNewMove } = require('../models/history.js')
const app = Router()

app.get("/history", async (req, res) => {
    try {
        const { gameId } = req.query
        const game = await getSingle(gameId)
        if (!game) throw Error('GAME_NOT_FOUND')
        const history = await getAll(gameId)
        return res.send({
            success: true,
            data: history
        })
    } catch (e) {
        return res.status(500).send({"success": false, "msg": e.message})
    }
})

app.post("/history/:gameId", async (req, res) => {
    try {
        const { gameId } = req.params
        const game = await getSingle(gameId)
        if (!game) throw Error('GAME_NOT_FOUND')
        await addNewMove(gameId, req.body)
        const history = await getAll(gameId)
        return res.send({
            success: true,
            data: history
        })
    } catch (e) {
        return res.status(500).send({"success": false, "msg": e.message})
    }
})

module.exports = app