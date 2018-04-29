## MancJS October: Code Golf
The server used to run the MancJS code golf game.

### How to run server

* Clone the repo
* `yarn`
* `yarn start`

### URLs

`/`
The main submission page where players can repeatedly submit new solutions to the current game.
Players need to enter an email address (used for gravatar images) and a team name.

`/admin`
Page to create new games and set the input and output data for the game. Stopped games prevent new
submissions and allow players to view other player submissions.

The admin page is protected with HTTP basic auth (user `admin` pass `admin`). You can modify
the credentials by changing the file
[routes/admin.js](https://github.com/martinrue/mancjs-code-golf/blob/master/routes/admin.js#L5).

### Notes
Changing the title of the game on the admin page and clicking *Start Game* will clear current
entries and begin a new game. All other modifications update the currently running game.