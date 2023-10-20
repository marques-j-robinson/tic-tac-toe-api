const {db, single} = require('../db.js')
const { remove: removeHistory } = require('./history.js')

const selectAll = "SELECT * FROM game"

export const getGame = async gameId => {
    const games = await db.query(`${selectAll} WHERE game_id = ?`, gameId)
    const game = single(games)
    const history = await db.query('SELECT * FROM game_history WHERE game_id = ?', gameId)
    game['history'] = history
    return game
}

export const getAll = async () => {
    return db.query(selectAll)
}

export const create = async name => {
    return db.query("INSERT INTO game (name) VALUE (?)", name)
}

export const remove = async gameId => {
    await removeHistory(gameId)
    await db.query("DELETE FROM game WHERE game_id = ?", gameId)
    return getAll()
}