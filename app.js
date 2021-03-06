let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
const session = require('express-session');

let config = require('./config'); // get our config file
let index = require('./routes/index');
let user = require('./routes/user');
let register = require('./routes/register');
let authenticate = require('./routes/authenticate');
let login = require('./routes/login');
let logout = require('./routes/logout');
let messages = require('./routes/message');
let mongoose    = require('mongoose');
let messagespost = require('./routes/messagepost');
let search = require('./routes/search');

// Use promise from node.js
mongoose.Promise = require('bluebird');
// connect to database
let promise = mongoose.connect(config.database, {
    useMongoClient: true,
});


let app = express();

app.use(session({
    secret: config.superSecret,
    resave: false,
    saveUninitialized: true,
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(config.superSecret));
app.use(express.static(path.join(__dirname, 'public')));

// open endpoint APIs
app.use('/', index);
app.use('/api/messages', messagespost);
app.use('/api/register', register);
app.use('/api/authenticate', authenticate);
app.use('/api/search', search);


// pages
app.use('/login', login);
app.get('/signup', function (req, res) {
    res.render('signup.html');
});
// ====================================================


// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
app.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, config.superSecret, function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }

});

app.use('/api/logout', logout);
app.use('/api/user', user);

app.use('/api/messages', messages);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
