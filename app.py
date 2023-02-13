import os, datetime

from flask import Flask, request, jsonify
from flask_cors import CORS

import db
from models import Game


app = Flask(__name__)
CORS(app)


if not os.path.isfile('games.db'):
	db.connect()


@app.route('/')
def index():
	return 'Welcome to Tic Tac Toe API!😀'


@app.route('/game', methods=['POST'])
def post_game():
	req_data = request.get_json()
	game = Game(
		db.generate_game_id(),
		req_data['history'],
		datetime.datetime.now()
	)
	print('new game: ', game.serialize())
	db.insert(game)
	return jsonify({
		'res': game.serialize(),
		'status': '200',
		'msg': 'Success saving game!👍😀'
	})


@app.route('/games', methods=['GET'])
def list_games():
	return jsonify({
		'res': [g.serialize() for g in db.get_all()],
		'status': '200',
		'msg': 'Success getting all games!👍😀'
	})


@app.route('/game/<game_id>', methods=['GET'])
def get_game(game_id):
	game = db.get_one(game_id)
	if game is None:
		return jsonify({
			'status': '404',
			'error': f"Error ⛔❌! Game with id '{game_id}' was not found!"
		})
	return jsonify({
		'res': game.serialize(),
		'status': '200',
		'msg': 'Success getting game by ID!👍😀'
	})


@app.route('/game/<game_id>', methods=['PUT'])
def update_game(game_id):
	req_data = request.get_json()
	is_game_available = db.get_one(game_id)
	if is_game_available is None:
		return jsonify({
			'status': '404',
			'error': f"Error ⛔❌! Game with id '{game_id}' was not found!"
		})
	game = Game(game_id, req_data['history'], datetime.datetime.now())
	print('updated game: ', game.serialize())
	db.update(game)
	return jsonify({
		'res': game.serialize(),
		'status': '200',
		'msg': f'Success updating game with id {game_id}!👍😀'
	})


@app.route('/game/<game_id>', methods=['DELETE'])
def delete_game(game_id):
	db.delete(game_id)	
	games = [g.serialize() for g in db.get_all()]
	return jsonify({
		'res': games,
		'status': '200',
		'msg': 'Success deleting game by ID!👍😀'
	})


if __name__ == '__main__':
	app.run()