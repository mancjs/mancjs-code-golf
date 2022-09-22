import path = require('path');
import express = require('express');
import bodyParser = require('body-parser');
const mustachex = require('mustachex');

import play from './routes/play';
import admin from './routes/admin';

const PORT = 1122;

if (!process.env['CG_ADMIN_PASSWORD']) {
  console.error('Please set the CG_ADMIN_PASSWORD environment variable');
  process.exit(1);
}

const app = express();

app.engine('html', mustachex.express);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '..', 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(play);
app.use(admin);

app.listen(PORT);

console.log(`Server running at http://localhost:${PORT}`);
