# Tic Tac Toe API
Extend functionality of ReactJS [tutorial](https://react.dev/learn/tutorial-tic-tac-toe) using NodeJS Express

## Startup
Follow the commands below to install this project and run for the first time:
```bash
$ git clone https://github.com/marques-j-robinson/tic-tac-toe-api.git
$ cd tic-tac-toe-api
$ npm i # Install dependencies
$ cp config/default.json config/local.json # Copy config file and add frontendOrigin in "env" and user/password in "db"
$ export NODE_ENV=local
$ npm run dev # Start API

# EXPECTED OUTPUT...
> tic-tac-toe-api@1.0.0 start
> nodemon app.js

[nodemon] 3.0.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node app.js`
WARNING: NODE_ENV value of 'default' is ambiguous.
WARNING: See https://github.com/node-config/node-config/wiki/Strict-Mode
Server Listening on PORT: 5000
Database connected successfully!!
```

## Endpoints
### GET /games
Provides a list of all games.
### POST /game
Creates a single game and returns the id of the newly created game.
### GET /game/:id
Provides the history for a given game by id.
### DELETE /game/:id
Removes a game and all history by *id*.
### PUT /game/:id
Updates the history for a given game.
