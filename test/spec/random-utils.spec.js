var utils = require( '../../src/widget/select-random/random-utils' );

describe( 'getRandomNumberArray', function() {
    [
        [ null, null ],
        [ undefined, null ],
        [ "", null ],
        [ false, null ],
        [ true, null ],
        [ "a", null ],
        [ Infinity, null ],
        [ -Infinity, null ],
        [ NaN, null ],
        [ -1, null ],
        [ 0, [] ]
    ].forEach( function( test ) {
        it( 'returns ' + test[ 1 ] + ' when n = ' + test[ 0 ], function() {
            expect( utils.getRandomNumberArray( test[ 0 ] ) ).toEqual( test[ 1 ] );
        } );
    } );

    [ utils.getRandomNumberArray( 5 ), utils.getRandomNumberArray( 5 ) ].forEach( function( result ) {
        it( 'creates an array of non-negative integer numbers in the 0...n range', function() {
            expect( result.length ).toEqual( 5 );
            result.sort();
            expect( result ).toEqual( [ 0, 1, 2, 3, 4 ] );
        } );
    } );

    it( 'creates random arrays', function() {
        var a = utils.getRandomNumberArray( 10 );
        var b = utils.getRandomNumberArray( 10 );
        expect( a ).not.toEqual( b );
    } );

} );
