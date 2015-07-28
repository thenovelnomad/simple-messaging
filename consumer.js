'use strict';

/*
 * Consumer- a module that accepts requests from consumers to '/', and if passed a query of the form
 *  'A+B=' where A and B are integers, then will return the sum of A and B to the consumer
 *
 *  The port defaults to 3000, but you can specify port via environment variables whether via a .env file
 *  or manually when running with node:
 *          `PORT=3000 node producer.js`
 *
 */

var connect = require( 'connect' ),
    http = require( 'http' ),
    evaluator = require( './lib/evaluator');

// Create connect app
var app = connect();

// Process requests to all paths
app.use(function( req, res, next ) {
    // Parse request URL and extract query string
    var query = evaluator.parseRequest( req.url );

    // If query string passed, evaluate sum
    if (query) {
        var sum = evaluator.getSum( query );
        console.log( new Date() + ' ANSWER: ' + query + sum );
    }

    // Return the sum or 'hello' message if no query string on request
    res.write( sum || 'hello' );

    // Close response
    res.end();
});

// Handle errors
app.use( function onerror( err, req, res, next ) {
    // an error occurred!
    console.error( err.message );

    res.statusCode = err.http_code || 500;

    res.write( res.statusCode + ' ' + err.message );

    res.end();
});

// Export app for use in testing
module.exports = app;

// Run HTTP server
app.listen(process.env.PORT || 3000, function() {
    console.log( "Consumer listening on port " + ( process.env.PORT || 3000 ) );
});