const express = require('express')
const config = require('config')
const db = require('./db.js')
const games = require('./routers/gamesrouter.js')
const game = require('./routers/gamerouter.js')

const app = express()

const {isDev, origin} = config.get('TicTacToe.env')
if (isDev) {
    const cors = require('cors')
    app.use(cors({origin}))
}

app.use(express.json())
app.set('json spaces', 40)

// Routers
app.use(games)
app.use(game)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT)
})