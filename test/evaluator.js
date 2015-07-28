var assert = require( 'assert' ),
    evaluator = require( '../lib/evaluator.js' );

describe( 'Evaluator', function() {
    describe('Given a request url of "http://localhost:3000/"', function() {
        it( 'should return ""', function() {
            assert.equal( evaluator('http://localhost:3000/'), null );
        });
    });

    describe('Given a request url of "http://localhost:3000/" with query string of form "A+B=" where A and B are integers', function() {
        it( 'should return the sum of A and B as a string', function() {
            assert.equal( typeof evaluator( 'http://localhost:3000/?12+5=' ), 'string' );

            assert.equal( evaluator( 'http://localhost:3000/?12+5=' ), '17' );
        });
    });

    describe( 'Given a request url where the query string is not of the form "A+B=" where A and B are integers', function() {
        it( 'should throw an error', function() {
            assert.throws( function() {
                evaluator( 'http://localhost:3000/?B+C=' );
            }, Error );

            assert.throws( function() {
                evaluator( 'http://localhost:3000/?12.2+3=' );
            }, Error );

            assert.throws( function() {
                evaluator( 'http://localhost:3000/?12-3=' );
            }, Error );

            assert.throws( function() {
                evaluator( 'http://localhost:3000/?12+3/' );
            }, Error );
        });
    });
});