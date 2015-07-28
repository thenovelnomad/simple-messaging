'use strict';

module.exports = {
    /**
     * Generates a random integer, N, where 0 <= N < 1000000
     * @return {Number} random integer
     */
    getRandomInt: function( ) {
        return Math.floor( Math.random() * 1000000 );
    },
    /**
     * Generates an addition statement of form 'A+B=' where A and B are random integers
     * @return {String} addition statement
     */
    getQuery: function() {
        var digit1 = this.getRandomInt();
        var digit2 = this.getRandomInt();
        var query = digit1 + '+' + digit2 + '=';

        return query;
    },
    /**
     * Sends a request to the server specified by HOST and PORT (default: localhost:3000)
     * with a query if specified
     * @param {String} query
     * @param {Function} callback
     */
    sendRequest: function( query, callback ) {
        var http = require( 'http' ),
            qs = require( 'querystring' );

        // If query is a function, then assume no query was passed, only a callback
        if ( typeof query == 'function' ) {
            callback = query;
            query = null;
        }

        // Set up request options
        var options = {
            host: process.env.HOST || 'localhost',
            port: process.env.PORT || 3000,
            path: query ? '/?' + query : '/' // If no query, then make a request to the root path
        };

        console.log( new Date() + ' QUERY SENT: ' + query);

        // Send GET request
        http.get(options, function(res) {
            if ( res.statusCode == 200 ) {
                console.log( new Date() + ' 200 Request Received ');
            }
            return res.on( 'data', callback); // When data is received, execute callback
        }).on('error', function( err ) {
            // Handle errors
            console.error(err.message);
            throw err;
        });
    }
};