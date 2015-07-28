// This is a simple Node.js server that accepts addition string inputs and processes them

var connect = require( 'connect' ),
    http = require( 'http' ),
    url = require( 'url' ),
    evaluator = require( './lib/evaluator');

var app = connect();

app.use('/favicon.ico', function( req, res, next ) {
    var err = new Error('We\'ve got no favicon!');
    err.http_code = 404;
    throw err;
    // return next(err);
});

app.use('/', function( req, res, next ) { // parse query string
    var sum = evaluator( req.url );

    res.write( sum || 'hello' );

    res.end();

});

app.use( function onerror( err, req, res, next ) {
    // an error occurred!
    // console.trace( err.message );

    res.statusCode = err.http_code || 500;

    res.write( res.statusCode + ' ' + err.message );

    res.end();
});

module.exports = app;

app.listen(process.env.PORT || 3000, function() {
    console.log( "Consumer listening on port " + ( process.env.PORT || 3000 ) );
});