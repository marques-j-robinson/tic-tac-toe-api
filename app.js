const express = require('express')
const config = require('config')
const ErrorHandler = require('./middlewares/ErrorHandler.js')
const { getAll: getAllGames } = require('./models/games.js')

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

// ERROR HANDLER MIDDLEWARE
app.use(ErrorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT)
})