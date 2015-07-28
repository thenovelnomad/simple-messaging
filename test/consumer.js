var assert = require( 'assert' ),
    request = require('supertest'),
    app = require( '../consumer.js' );

describe( 'Consumer', function() {
    describe( 'GET /', function() {
        it('should respond with a 200 status code', function(done) {
            request( app ).get( '/' ).expect( 200, done );
        });

        it('should respond with "hello"', function(done) {
            request( app ).get( '/' ).expect( 'hello', done );
        });
    });

    describe( 'GET /?12+5=', function() {
        it('should respond with a 200 status code', function(done) {
            request( app ).get( '/' ).query({'12+5': ''}).expect( 200, done );
        });

        it('should respond with "17"', function(done) {
            request( app ).get( '/' ).query({'12+5': ''}).expect( '17', done );
        });
    });

    describe( 'GET /?A+B=', function() {
        it('should respond with a 500 status code', function(done) {
            request( app ).get( '/' ).query({'A+B': ''}).expect( 500, done );
        });
    });
});