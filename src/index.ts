import path = require('path');
import express = require('express');
import bodyParser = require('body-parser');
import play = require('./routes/play');
import admin = require('./routes/admin');

const PORT = 1122;

const mustachex = require('mustachex');

const app = express();

app.engine('html', mustachex.express);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '..', 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(play);
app.use(admin);

app.listen(PORT);

console.log(`CodeGolf server now running on http://localhost:${PORT}`);
