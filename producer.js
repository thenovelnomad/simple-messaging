'use strict';

/*
 * Producer - a module that generates requests to a consumer at specified hostname and port at a fixed
 *  time interval a set number of times.
 *
 *  The requests consist of a query string that is a simple integer addition statement. The integers are
 *  addition statement is generated randomly.
 *
 *  The consumer will return the solution of the addition statement to the producer.
 *
 *  You can specify host and port via environment variables whether via a .env file
 *  or manually when running with node:
 *          `HOST=localhost PORT=3000 node producer.js`
 *
 *  You can specify the time interval '--interval=X' where X is the interval in milliseconds and
 *  '--reps=Y' where Y is the number of cycles as command line arguments:
 *          `node producer.js --interval=2000 --reps=50`
 *  which would send requests every 2 seconds, 50 times
 *
 */

// Load generator module
var generator = require( './lib/generator' );

var interval = 100; // Default interval to 100ms
var reps = 10; // Default total executions to 10

// Process command line arguments
process.argv.forEach( function( arg, index, array ) {
    // Update interval if '--interval' argument is supplied with a number
    if ( arg.indexOf( '--interval=' ) > -1 ) {
        var intervalArg = parseInt( arg.replace( '--interval=', '' ), 10);
        interval = intervalArg || interval;
    }

    // Update execution repetitions if '--reps' argument is supplied with a number
    if ( arg.indexOf( '--reps=' ) > -1 ) {
        var repsArg = parseInt( arg.replace( '--reps=', '' ), 10);
        reps = repsArg || reps;
    }
});

// Initialize loop counter
var counter = 0;

console.log( 'Starting producer...' );

// Start execution of requests at the specified interval
var intervalId = setInterval( function() {
    var query = generator.getQuery(); // Generate query string

    // Generate request to consumer
    generator.sendRequest( query, function( data ) {
        console.log( new Date + ' ANSWER: ' + query + data );
    });

    // Increment counter
    counter++;

    // When counter reaches rep limit, end interval loop
    if ( counter >= reps) {
        clearInterval( intervalId );
        console.log( 'Closing producer...' );
    }
}, interval );





