const express = require('express')
const config = require('config')
const games = require('./routers/gamesrouter.js')
const gameHistory = require('./routers/historyrouter.js')

const app = express()

const {isDev, frontendOrigin} = config.get('TicTacToe.env')
if (isDev) {
    const cors = require('cors')
    app.use(cors({origin: frontendOrigin}))
}

app.use(express.json())
app.set('json spaces', 40)

// Routers
app.use(games)
app.use(gameHistory)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT)
})