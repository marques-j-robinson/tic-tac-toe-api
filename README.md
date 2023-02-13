# tic-tac-toe-api
Practice API for extending ReactJS tutorial.

## Features
- CRUD actions for games allowing multiple games to be saved
- Keeps a history of moves throughout a game

**NOTE: History is saved in the DB and returned by the API as a string.**
- Stores timestamp data for sorting games by most recently played

## Usage
1) Create and activate a virtual environment
1) Run:
```sh
pip install -r requirements.txt
```
1) Start Server:
```sh
flask run
```

## Documentation
List of available endpoints and their responses.

Game:
```json
{
	"id": 156764174,
	"history": "some history about this game...",
	"timestamp": "The time game was saved"
}
```

### Get All Games
Request:
```json
{
	"method": "GET",
	"url": "http://127.0.0.1:5000/games"
}
```

Response:
```json
{
	"res": [
		{
			"id": 156764174,
			"history": "some history about this game...",
			"timestamp": "The time game was saved"
		}
	],
	"status": "200",
	"msg": "Success getting all games!👍😀"
}
```

### Get One Game By ID
Request:
```json
{
	"method": "GET",
	"url": "http://127.0.0.1:5000/game/156764174"
}
```

Response (Successful):
```json
{
	"res": {
		"id": 156764174,
		"history": "some history about this game...",
		"timestamp": "The time game was saved"
	},
	"status": "200",
	"msg": "Success getting game by ID!👍😀"
}
```

Response (Error NOT FOUND):
```json
{
	"status": "404",
	"error": "Error ⛔❌! Game with id 'xxx' was not found!"
}
```

### Create New Game Entry
Request:
```json
{
	"method": "POST",
	"url": "http://127.0.0.1:5000/game",
	"body": {
		"history": "some history about this game..."
	}
}
```

Response:
```json
{
	"res": {
		"id": 156764174,
		"history": "some history about this game...",
		"timestamp": "The time game was saved"

	},
	"status": "200",
	"msg": "Success saving game!👍😀"
}
```

### Update Game History
Request:
```json
{
	"method": "PUT",
	"url": "http://127.0.0.1:5000/game/156764174",
	"body": {
		"history": "more history about this game..."
	}
}
```

Response (Successful):
```json
{
	"res": {
		"id": 156764174,
		"history": "more history about this game...",
		"timestamp": "The time game was saved"
	},
	"status": "200",
	"msg": "Success updating game with id 156764174!👍😀"
}
```

Response (Error NOT FOUND):
```json
{
	"status": "404",
	"error": "Error ⛔❌! Game with id 'xxx' was not found!"
}
```

### Delete Game
Request:
```json
{
	"method": "DELETE",
	"url": "http://127.0.0.1:5000/game/156764174",
}
```

Response:
```json
{
	"res": [],
	"status": "200",
	"msg": "Success deleting game by ID!👍😀"
}
```