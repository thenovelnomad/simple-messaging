module.exports = {
    parseRequest: function( requestUrl ) {
        var url = require( 'url' );
        var parsedUrl = url.parse( requestUrl )
        var query = parsedUrl.query;

        // console.log( parsedUrl );
        if ( parsedUrl.pathname != '/') {
            var err = new Error( 'Cannot find ' + parsedUrl.path );
            err.http_code = 404;
            throw err;
        }

        if ( query ) {
            query = decodeURIComponent( query );

            return query;
        }

        console.log( new Date() + ' REQUEST: /' );
        return null;
    },
    getSum: function( query ) {
        if ( !/^\d+\+\d+\=?$/.test( query ) ) {
            throw new Error( 'Invalid query string!' );
        }

        console.log( new Date() + ' QUERY: ' + query);
        var digits = query.replace( '=', '' ).split( '+' );

        var sum = digits.reduce( function( prev, current, index, array ) {
            if (typeof prev != 'number') {
                prev = parseInt( prev, 10 );
            }
            return prev + parseInt( current, 10 );
        });

        return sum.toString();
    }
};