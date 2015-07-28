var assert = require( 'assert' ),
    request = require( 'supertest' ),
    generator = require( '../lib/generator' );

describe( 'Generator', function() {
    describe( 'getRandomInt', function() {
        it( 'should return an integer in [0..1000000000]', function() {
            var randomInt = generator.getRandomInt();

            assert.equal( typeof randomInt, 'number' );
            assert.equal( Math.floor( randomInt ), randomInt );
            assert( randomInt < 1000000000 );
            assert( randomInt >= 0 );
        });
    });

    describe( 'getQuery', function() {
        it( 'should return a string of the form "A+B=" where A and B are integers', function() {
            var query = generator.getQuery();

            assert( /^\d+\+\d+\=?$/.test( query ) );
        });
    });

    describe( 'sendRequest', function() {
        it( 'should send an HTTP get request' );

        it( 'should log the response body' );

        it( 'should log errors if received', function(done) {
            assert.throws( function() {
                generator.sendRequest( function(data) {
                    done();
                });
            });
        });
    });
});