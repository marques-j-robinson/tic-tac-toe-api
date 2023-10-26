const express = require('express')
const config = require('config')
const ErrorHandler = require('./middlewares/ErrorHandler.js')
const {
    create: createGame,
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
app.post('/game', async (req, res, next) => {
    try {
        const {insertId:id} = await createGame()
        return res.send({
            success: true,
            data: { id }
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
