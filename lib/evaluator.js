'use strict';

module.exports = {
    /**
     * Parses the request URL to determine if it is a valid request
     * and returns the query string if exists
     * @param {String} requestUrl
     * @return {String} query string
     */
    parseRequest: function( requestUrl ) {
        var url = require( 'url' );
        var parsedUrl = url.parse( requestUrl )
        var query = parsedUrl.query;

        // Return 404 if pathname is anything but root
        if ( parsedUrl.pathname != '/') {
            var err = new Error( 'Cannot find ' + parsedUrl.path );
            err.http_code = 404;
            throw err;
        }

        // Return query if exists
        if ( query ) {
            query = decodeURIComponent( query );

            return query;
        }

        // If no query, log request and return null
        console.log( new Date() + ' REQUEST: /' );
        return null;
    },
    /**
     * Parses query string to determine if valid and
     * finds solution of query addition statement
     * @param {String} query
     * @return {String} sum
     */
    getSum: function( query ) {
        // Throw error if query string is not in 'A+B=' form where A and B are positive integers
        if ( !/^\d+\+\d+\=?$/.test( query ) ) {
            throw new Error( 'Invalid query string!' );
        }

        console.log( new Date() + ' QUERY: ' + query); //Log query
        var digits = query.replace( '=', '' ).split( '+' );

        // Find sum of array of stringified numbers
        var sum = digits.reduce( function( prev, current, index, array ) {
            if (typeof prev != 'number') {
                prev = parseInt( prev, 10 );
            }
            return prev + parseInt( current, 10 );
        });

        return sum.toString();
    }
};