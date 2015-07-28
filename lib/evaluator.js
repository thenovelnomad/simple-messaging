module.exports = function( requestUrl ) {
    var url = require( 'url' );
    var parsedUrl = url.parse( requestUrl )
    var query = parsedUrl.query;

    console.log( 'REQUEST: ' + parsedUrl.path)
    console.log( 'QUERY: ' + query);

    if ( query ) {
        query = decodeURIComponent( query );

        if ( !/^\d+\+\d+\=?$/.test( query ) ) {
            throw new Error( 'Invalid query string!' );
        }

        var digits = query.replace( '=', '' ).split( '+' );

        var sum = digits.reduce( function( prev, current, index, array ) {
            if (typeof prev != 'number') {
                prev = parseInt( prev, 10 );
            }
            return prev + parseInt( current, 10 );
        });

        return sum.toString();
    }

    return null;
};