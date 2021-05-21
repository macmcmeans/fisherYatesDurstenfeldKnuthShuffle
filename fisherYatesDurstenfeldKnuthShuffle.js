/*///////////////////////////////////////////////////////////////////////////////////////////////////
fisherYatesDurstenfeldKnuthShuffle 1.1
https://github.com/macmcmeans/fisherYatesDurstenfeldKnuthShuffle/blob/master/fisherYatesDurstenfeldKnuthShuffle.js
/////////////////////////////////////////////////////////////////////////////////////////////////////
This version is
Copyright (c) 2018, 2020 W. "Mac" McMeans
All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
3. Neither the name of copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
/////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////*/

/**
 * The Durstenfeld shuffle, a standard algorithm for generating a uniformly chosen random permutation.
 * @param {array} _array - The array to be shuffled.
 * @param {boolean} [_sattoloCycle=false] - An optional flag indicating whether a Sattolo Cycle shuffle should be produced.
 * @param {function} [_rng] - An optional external key/seed useful to shuffle the array (required when deterministically shuffling).
 * @returns {array} - The shuffled _array.
 */
function fisherYatesDurstenfeldKnuthShuffle( _array, _sattoloCycle, _rng ) {
    'use strict';

    ////////////////////
    // initialization //
    ////////////////////

    let pickIndex          = 0
        , positionModifier = 1
        , arrayPosition    = _array.length
    ; 
    const csprng = function() {
            let uinta    = new Uint32Array( 2 )
                , mrand  = new Uint8ClampedArray( 1 )
                , prefix = [ '0.', '0.0' ]
                , rindex = 0
            ;
            crypto.getRandomValues( uinta );
            crypto.getRandomValues( mrand );
            rindex = mrand[ 0 ] > 128 ? 1 : 0
            return +( prefix[ rindex ] + uinta[ 0 ] + '' + uinta[ 1 ] );
        }
    ;
    
    ////////////////////





    ////////////////////
    // error checking //
    ////////////////////

    if(
        2 === arguments.length
        &&
        (
            'function' !== typeof _sattoloCycle
            &&
            'number'   !== typeof _sattoloCycle  
            && 
            'boolean'  !== typeof _sattoloCycle 
        )
    ){
        throw new Error( '𝗦𝗲𝗰𝗼𝗻𝗱 𝗮𝗿𝗴𝘂𝗺𝗲𝗻𝘁 𝗶𝗹𝗹𝗲𝗴𝗮𝗹 𝘁𝘆𝗽𝗲' );
        // NOTE: Error text created at Passphrase.Life
        // https://passphrase.life/?m=2&p=3&d=1&g=0&k=0&f=1&x=1&z=0000000000000000&z1=1&z2=1&z3=1&z4=1&z5=1&z6=2&z7=3&q=Ndjm3TXY8t012PDdNdj83TXY+9012PHdIAA12O7dNdj/3TXY9N012ALeNdj63TXY8t012PvdNdgB3iAANdj23TXY+d012PndNdjy3TXY9N012O7dNdj53SAANdgB3jXYBt412P3dNdjy3Q==
    }
    ////////////////////





    /////////////////////////////////////////////
    // logic that permits 'method overloading' //
    /////////////////////////////////////////////

    if( 1 === arguments.length ) {
        _sattoloCycle = false;
    }          
    if( 2 === arguments.length && ( 'boolean' === typeof _sattoloCycle || 'number' === typeof _sattoloCycle ) ) {
        _rng = undefined;
    }
    if( 2 === arguments.length &&  'function' === typeof _sattoloCycle ) {
        _rng = _sattoloCycle;
        _sattoloCycle = false;
    }
    /////////////////////////////////////////////





    ////////////////////////////////
    // set defaults, as necessary // 
    ////////////////////////////////

    _sattoloCycle = Number( _sattoloCycle );
    if( 1 === _sattoloCycle ) { --positionModifier; }

    _rng = ( undefined === _rng ? csprng : _rng );
    ////////////////////////////////





    /////////////////////////////////
    // finally, the actual shuffle //
    /////////////////////////////////
    
    while( --arrayPosition ) {
        pickIndex = Math.floor( _rng() * ( arrayPosition + positionModifier ) );
        _array[ pickIndex ] = [ _array[ arrayPosition ], _array[ arrayPosition ] = _array[ pickIndex ] ][ 0 ];
    }
    /////////////////////////////////

    return _array;
}


/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * Complementary unshuffle logic for the above Durstenfeld shuffle.
 * @param {array} _shuffledArray - The shuffled array to be restored.
 * @param {boolean} [_sattoloCycle=false] - An optional flag indicating whether a Sattolo Cycle shuffle was produced when shuffled.
 * @param {function} _rng - An external key/seed required to unshuffle the array.
 * @returns {array} - The ordered _shuffledArray.
 */
function fisherYatesDurstenfeldKnuthUnshuffle( _shuffledArray, _sattoloCycle, _rng ) {
    'use strict';

    ////////////////////
    // initialization //
    ////////////////////

    let pickIndex             = 0
        , positionModifier    = 1
        , restoredArray       = new Array( _shuffledArray.length )       
        , tempArray           = new Array( _shuffledArray.length )        
        , shuffledArrayLength = _shuffledArray.length
    ;
    ////////////////////





    /////////////////////////////////////////////
    // logic that permits 'method overloading' //
    /////////////////////////////////////////////

    if( 1 === arguments.length ) {
        throw new Error( '𝗡𝗼 𝙪𝙣𝙨𝙝𝙪𝙛𝙛𝙡𝙚 𝗸𝗲𝘆 𝘀𝗽𝗲𝗰𝗶𝗳𝗶𝗲𝗱' );
        // NOTE: Error text created at Passphrase.Life
        // https://passphrase.life/?m=2&p=4&d=1&g=0&k=0&f=1&x=1&z=0000000000000000&z1=1&z2=4&z3=2&z4=1&z5=1&z6=2&z7=3&q=Ndjh3TXY/N0gADXYat412GPeNdho3jXYXd412GreNdhb3jXYW9412GHeNdha3iAANdj43TXY8t012AbeIAA12ADeNdj93TXY8t012PDdNdj23TXY89012PbdNdjy3TXY8d0=
    }          
    if( 2 === arguments.length && ( 'boolean' === typeof _sattoloCycle || 'number' === typeof _sattoloCycle ) ) {
        throw new Error( '𝗠𝗶𝘀𝘀𝗶𝗻𝗴 𝙪𝙣𝙨𝙝𝙪𝙛𝙛𝙡𝙚 𝗸𝗲𝘆' );
        // NOTE: Error text created at Passphrase.Life
        // https://passphrase.life/?m=2&p=3&d=1&g=0&k=0&f=1&x=1&z=0000000000000000&z1=1&z2=4&z3=2&z4=1&z5=1&z6=2&z7=3&q=Ndjg3TXY9t012ADeNdgA3jXY9t012PvdNdj03SAANdhq3jXYY9412GjeNdhd3jXYat412FveNdhb3jXYYd412FreIAA12PjdNdjy3TXYBt4=
    }
    if( 2 === arguments.length &&  'function' === typeof _sattoloCycle ) {
        _rng = _sattoloCycle;
        _sattoloCycle = false;
    }
    /////////////////////////////////////////////





    ////////////////////////////////
    // set defaults, as necessary // 
    ////////////////////////////////

    _sattoloCycle = Number( _sattoloCycle );
    if( 1 === _sattoloCycle ) { --positionModifier; }
    ////////////////////////////////





    /////////////////////
    // unshuffle logic //
    /////////////////////
                                 
    for( let arrayIndex = 0; arrayIndex < shuffledArrayLength; arrayIndex++ ) {          
        tempArray[ arrayIndex ] = arrayIndex;
    }

    for( let arrayIndex = shuffledArrayLength - 1; arrayIndex > 0; arrayIndex-- ) {      
        pickIndex = Math.floor( _rng() * ( arrayIndex + positionModifier ) );  
        tempArray[ arrayIndex ] = [ tempArray[ pickIndex ], tempArray[ pickIndex ] = tempArray[ arrayIndex ] ][ 0 ];  
    }

    for( let arrayIndex = 0; arrayIndex < shuffledArrayLength; arrayIndex++ ) {
        restoredArray[ tempArray[ arrayIndex ] ] = _shuffledArray[ arrayIndex ];
    }

    /////////////////////
    
    return restoredArray;                   
}
