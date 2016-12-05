var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var formidable = require('formidable');
var fs = require('fs');
// TODO : Use path for all operating system
var app = express();

app.use(logger('dev')); // Display Log in console.
app.use(bodyParser.json());

app.all('/*', function (req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});
app.post('/upload', function(req, res){

    // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/public');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name));
    });

    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
        res.end('success');
    });

    // parse the incoming request containing the form data
    form.parse(req);

});
// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you
// are sure that authentication is not needed
app.use('/', require('./docs'));
//app.all('/api/v1/*', [require('./middlewares/validateRequest')]);
app.use('/', require('./routes'));

// New call to compress content
//app.use(express.compress());
app.use('/public', express.static(__dirname + '/public'));
// If no route is matched by now, it must be a 404
/**
 * app.use(function(req, res, next) {
 *   var err = new Error('Not Found');
 *   err.status = 404;
  *  next(err);
});
 */
// Start the server
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});