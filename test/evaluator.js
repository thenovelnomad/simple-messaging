var assert = require( 'assert' ),
    evaluator = require( '../lib/evaluator.js' );

describe( 'Evaluator', function() {
    describe( 'parseRequest', function() {
        describe('Given a request url of "http://localhost:3000/"', function() {
            it( 'should return ""', function() {
                assert.equal( evaluator.parseRequest('http://localhost:3000/'), null );
            });
        });

        describe('Given a request url of "http://localhost:3000/" with query string of form "A+B=" where A and B are integers', function() {
            it( 'should return the query string "A+B="', function() {
                assert.equal( typeof evaluator.parseRequest( 'http://localhost:3000/?12+5=' ), 'string' );

                assert.equal( evaluator.parseRequest( 'http://localhost:3000/?12+5=' ), '12+5=' );
            });
        });

        describe( 'Given a request url of "http://localhost:3000/books"', function() {
            it( 'should return an error', function() {
                assert.throws( function() { 
                    evaluator.parseRequest( 'http://localhost:3000/books' );
                }, Error );
            });
        });
    });

    describe( 'getSum', function() {
        describe( 'given a query string of form "A+B=" where A and B are integers', function() {
            it( 'should return the sum of A and B as a string', function() {
                assert.equal( typeof evaluator.getSum( '12+3=' ), 'string' );
                assert.equal( evaluator.getSum( '12+3=' ), '15' );
            });
        });

        describe( 'given a query string of form "A+B=" where A and B are integers', function() {
            it( 'should return the sum of A and B as a string', function() {
                assert.equal( typeof evaluator.getSum( '12+3=' ), 'string' );
                assert.equal( evaluator.getSum( '12+3=' ), '15' );
            });
        });

        describe( 'Given a query string is not of the form "A+B=" where A and B are integers', function() {
            it( 'should throw an error', function() {
                assert.throws( function() {
                    evaluator.parseRequest( 'B+C=' );
                }, Error );

                assert.throws( function() {
                    evaluator.parseRequest( '12.2+3=' );
                }, Error );

                assert.throws( function() {
                    evaluator.parseRequest( '12-3=' );
                }, Error );

                assert.throws( function() {
                    evaluator.parseRequest( 2 );
                }, Error );

                assert.throws( function() {
                    evaluator.parseRequest( [] );
                }, Error );

                assert.throws( function() {
                    evaluator.parseRequest( {} );
                }, Error );
            });
        });
    });
});