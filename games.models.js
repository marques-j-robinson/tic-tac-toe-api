const {db, single} = require('./db.js')

const selectAll = "SELECT * FROM game"

const startingHistory = [Array(9).fill(null)]

const buildHistory = history => {
    const res = [...startingHistory]
    history.forEach(({board_id, value}) => {
        const move = [...res[res.length-1]]
        for (let i = 0; i < 9; i++) {
            if (i === board_id) {
                move[i] = value
            }
        }
        res.push(move)
    })
    return res
}

export const getGame = async gameId => {
    const games = await db.query(`${selectAll} WHERE game_id = ?`, gameId)
    const game = single(games)
    if (!game) throw Error('GAME_NOT_FOUND')
    const history = await db.query('SELECT * FROM history WHERE game_id = ?', gameId)
    game['history'] = buildHistory(history)
    return game
}

export const getAll = async () => {
    return db.query(selectAll)
}

export const create = async () => {
    return db.query("INSERT INTO game (game_id) VALUE (NULL)")
}

export const removeHistory = async gameId => {
    return db.query("DELETE FROM history WHERE game_id = ?", gameId)
}

export const remove = async gameId => {
    await removeHistory(gameId)
    return db.query("DELETE FROM game WHERE game_id = ?", gameId)
}

export const update = async (gameId, history) => {
    const sql = "INSERT INTO history (game_id, move_id, board_id, value) VALUES ?"
    const values = history.map((move, moveId) => {
        return move.map((value, boardId) => {
            return [gameId, moveId, boardId, value]
        })
    })
    console.log(values)
    return db.query(sql, values)
}
