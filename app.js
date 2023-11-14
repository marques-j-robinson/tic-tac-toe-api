const express = require('express')
const config = require('config')
const ErrorHandler = require('./middlewares/ErrorHandler.js')
const {
    create: createGame,
    getAll: getAllGames,
    getGame,
    update: saveMoves,
    removeHistory,
} = require('./games.models.js')

const app = express()

const {isDev, frontendOrigin} = config.get('TicTacToe.env')
if (isDev) {
    const cors = require('cors')
    app.use(cors({origin: frontendOrigin}))
}

app.use(express.json())
app.set('json spaces', 2)

// Routes
app.get('/game/:id', async (req, res, next) => {
    try {
        const {id} = req.params
        const {history} = await getGame(id)
        console.log(history)
        return res.send({
            success: true,
            game: {
                id,
                history,
            }
        })
    } catch (err) {
        next(err)
    }
})

app.get('/games', async (req, res, next) => {
    try {
        const games = await getAllGames()
        return res.send({
            success: true,
            games,
        })
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
