const createError = require('http-errors')
    , express = require('express')
//    , compression = require('compression')
    , path = require('path')
    , cookieParser = require('cookie-parser')
    , logger = require('morgan')
    , mongoose = require('mongoose')
    , debug = require('debug')('expressapp:server')
    , dbConfig = require('./config/db')
    , routes = require('./routes')()
    , urlService = require('./services/url')
    , menuModel = require("./models/menu")
    , variablesModel = require("./models/variables")
;

var app = express();
//app.use(compression());
app.set('env', process.env.ENV || 'dev');

mongoose.connect(dbConfig.url, { useNewUrlParser: true, poolSize: 3 });
var db = mongoose.connection;
db.on('error', function(error) {
    console.error(error.message);
});
db.once('open', function() {
    console.info.bind(console, 'connection success:');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//app.enable('view cache');
app.locals.pageName = 'notFound';
app.locals.blocks = [];
if (app.get('env') === 'dev') {
    app.locals.pretty = true;
    debug('ENVIRONMENT %o', app.get('env'));
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));

//setting the main menu
menuModel.byId('main-menu', function(err, docs) {
    if (docs && docs !== 'null') {
        app.locals.mainMenu = docs;
    } else {
        app.locals.mainMenu = [];
    }
});

//setting the footer menu
menuModel.byId('footer-menu', function(err, docs) {
    app.locals.footerMenu = [];
    if (docs && docs !== 'null') {
        app.locals.footerMenu = docs;
    }
});

//setting the global variables
variablesModel.all(function(err, docs) {
    app.locals.variables = {};
    if (docs && docs !== 'null') {
        if (! Array.isArray(docs)) {
            docs = [ docs ];
        }

        docs.forEach(function(item) {
            app.locals.variables[item.key] = item.value;
        });
    }
});

app.locals.services = {
    url: urlService
};

for ( let i = 0, l = routes.length; i < l; i++ ) {
    let route = routes[i];
    app.all(route.pattern, function(req, res, next) {
        app.locals.blocks = require('./pages')(route.page || 'default', route.pageParams || req.params);
        next();
    }, route.action);
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
