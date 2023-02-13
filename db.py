import sqlite3, random, datetime

from models import Game


CREATE_GAME_TABLE_SQL = """CREATE TABLE IF NOT EXISTS games (
	id INTEGER PRIMARY KEY,
	history TEXT,
	timestamp TEXT
)"""


def generate_game_id():
	return random.getrandbits(28)


def connect():
	conn = sqlite3.connect('games.db')
	cur = conn.cursor()
	cur.execute(CREATE_GAME_TABLE_SQL)
	conn.commit()
	conn.close()


def insert(game):
	conn = sqlite3.connect('games.db')
	cur = conn.cursor()
	cur.execute("INSERT INTO games VALUES (?,?,?)", (
		game.id,
		str(game.history),
		game.timestamp
	))
	conn.commit()
	conn.close()


def get_all():
	conn = sqlite3.connect('games.db')
	cur = conn.cursor()
	cur.execute("SELECT * FROM games")
	rows = cur.fetchall()
	games = []
	for i in rows:
		game = Game(i[0], i[1], i[2])
		games.append(game)
	conn.close()
	return games


def get_one(game_id):
	conn = sqlite3.connect('games.db')
	cur = conn.cursor()
	cur.execute("SELECT * FROM games WHERE id=?", (game_id,))
	games = cur.fetchall() 
	conn.close()
	if len(games) == 0:
		return None
	[g] = games
	return Game(g[0], g[1], g[2])


def update(game):
	conn = sqlite3.connect('games.db')
	cur = conn.cursor()
	cur.execute("UPDATE games SET history=? WHERE id=?", (
		str(game.history),
		game.id
	))
	conn.commit()
	conn.close()


def delete(game_id):
	conn = sqlite3.connect('games.db')
	cur = conn.cursor()
	cur.execute("DELETE FROM games WHERE id=?", (game_id,))
	conn.commit()
	conn.close()


def delete_all():
	conn = sqlite3.connect(games.db)
	cur = conn.cursor()
	cur.execute("DELETE FROM games")
	conn.commit()
	conn.close()