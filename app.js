
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/index')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , swig = require('swig')
  , cluster = require('cluster');
var app = express();
var numCPUs = require('os').cpus().length;
if(cluster.isMaster){
	for(var i=0; i<numCPUs; ++i){
		cluster.fork();
	}
}else{
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('html',swig.renderFile);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.article);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
}
