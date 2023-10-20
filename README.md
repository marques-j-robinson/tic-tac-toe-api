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
$ npm run start # Start API

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
Returns a single game if provided `gameId` as a query param or returns all games if no query params are found in the request.
### POST /games
Creates a single game and returns a list of all the games.
**Note** *name* is a required item in the request body.
### DELETE /games/:gameId
Removes a game by *gameId* and returns the updated list of all the games.