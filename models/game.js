const {db, single} = require('../db.js')
const { remove: removeHistory } = require('./history.js')

const selectAll = "SELECT * FROM game"

export const getSingle = async gameId => {
    return single(await db.query(`${selectAll} WHERE game_id = ?`, gameId))
}

export const getAll = async () => {
    return db.query(selectAll)
}

export const create = async name => {
    await db.query("INSERT INTO game (name) VALUE (?)", name)
    return getAll()
}

export const remove = async gameId => {
    await removeHistory(gameId)
    await db.query("DELETE FROM game WHERE game_id = ?", gameId)
    return getAll()
}