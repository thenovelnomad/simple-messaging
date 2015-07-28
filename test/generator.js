var assert = require( 'assert' ),
    sinon = require( 'sinon' ),
    PassThrough = require( 'stream' ).PassThrough,
    http = require( 'http' ),
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
        beforeEach(function() {
            this.get = sinon.stub(http, 'get');
        });

        afterEach(function() {
            http.get.restore();
        });

        describe( 'request is successful', function() {
            it( 'should execute a callback on response data', function() {
                var expected = 'hello';
                var response = new PassThrough();

                response.write( expected );
                response.end();

                response.on( 'data', function( chunk ) {
                    // console.log(chunk);
                });

                var get = new PassThrough();

                this.get.callsArgWith( 1, response )
                            .returns( get );

                generator.sendRequest(function( err, data ) {
                    assert.equals( data, expected );
                });
            });
        });
        describe( 'request errors', function() {
            it( 'should call callback with error as first arg', function() {
                var expected = new Error( 'test' );

                var get = new PassThrough();

                this.get.returns( get );

                generator.sendRequest( function( err, data ) {
                    assert.equal( err, expected );
                });

                get.emit( 'error', expected );
            });
        });
    });
});