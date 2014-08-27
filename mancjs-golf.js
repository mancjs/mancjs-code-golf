var express = require('express');
var mustachex = require('mustachex');

var app = express();

app.configure(function() {
  app.engine('html', mustachex.express);
  app.set('view engine', 'html');
  app.set('views', __dirname + '/views');
  app.use(express.limit('50kb'));
  app.use(express.bodyParser({ uploadDir: __dirname + '/files' }));
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

require('./routes/play')(app);
require('./routes/admin')(app);

app.listen(1122);