const express = require('express')
const config = require('config')
const ErrorHandler = require('./middlewares/ErrorHandler.js')
const {
    create: createGame,
    getAll: getAllGames,
    getGame,
    remove: removeGame,
} = require('./models/games.js')

const app = express()

const {isDev, frontendOrigin} = config.get('TicTacToe.env')
if (isDev) {
    const cors = require('cors')
    app.use(cors({origin: frontendOrigin}))
}

app.use(express.json())
app.set('json spaces', 40)

// Routes
app.get('/games', async (req, res, next) => {
    try {
        const games = await getAllGames()
        return res.send({
            success: true,
            data: { games }
        })
    } catch (err) {
        next(err)
    }
})

app.post('/game', async (req, res, next) => {
    try {
        if (!req.body.name) throw Error('MISSING_NAME')
        const {insertId:id} = await createGame(req.body.name)
        return res.send({
            success: true,
            data: { id }
        })
    } catch (err) {
        next(err)
    }
})

app.get('/game/:id', async (req, res, next) => {
    try {
        const {id} = req.params
        const game = await getGame(id)
        return res.send({
            success: true,
            data: { game }
        })
    } catch (err) {
        next(err)
    }
})

app.delete('/game/:id', async (req, res, next) => {
    try {
        const {id} = req.params
        await removeGame(id)
        return res.send({ success: true })
    } catch (err) {
        next(err)
    }
})

// ERROR HANDLER MIDDLEWARE
app.use(ErrorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT)
})