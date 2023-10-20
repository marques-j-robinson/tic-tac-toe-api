const {db} = require('../db.js')

export const getAll = async gameId => {
    return db.query(`
        SELECT value, row_id, col_id, created_at
        FROM game_history
        WHERE game_id = ?
    `, gameId)
}

export const addNewMove = async (gameId, payload) => {
    const { value, rowId, colId } = payload
    return db.query(`
        INSERT INTO game_history (game_id, row_id, col_id, value)
        VALUE (?, ?, ?, ?)
    `, [gameId, rowId, colId, value])
}

export const remove = async gameId => {
    return db.query("DELETE FROM game_history WHERE game_id = ?", gameId)
}