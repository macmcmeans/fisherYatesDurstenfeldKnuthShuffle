/* ----------------------------------------------------------------------
Copyright (c) 2018, W. "Mac" McMeans
BSD License.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

* Neither the name of copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


/**
 * The Knuth shuffle, a standard algorithm for generating a uniformly chosen random permutation.
 * @param { array } _array - The array to be shuffled in-place (no copy) having a time complexity of O(n).
 * @param { boolean } [ _sattoloCycle = false ] - A flag indicating whether a Sattolo Cycle shuffle should be produced.
 * @param { function } [ _rng ] - An external random number generator used to shuffle the array.
 */
function fisherYatesDurstenfeldKnuthShuffle( _array, _sattoloCycle, _rng ) {
    'use strict';

    ///////////////////////////
    // declare and init vars //
    ///////////////////////////

    var pickIndex
        , arrayPosition = _array.length
        , positionModifier = 1
        , csprng = function() {
            var uinta = new Uint32Array( 2 );
            window.crypto.getRandomValues( uinta );
            return +( '0.' + uinta[ 0 ] + '' + uinta[ 1 ] );
        }
    ;
    ///////////////////////////





    ////////////////////
    // error checking //
    ////////////////////

    if(
        arguments.length === 2
        &&
        (
            typeof _sattoloCycle !== 'function'
            &&
            typeof _sattoloCycle !== 'number' 
            && 
            typeof _sattoloCycle !== 'boolean'
        )
    ){
        throw new Error( 'Second argument illegal type' );
    }
    ////////////////////





    /////////////////////////////////////////////////
    // logic that permits quasi-method overloading //
    /////////////////////////////////////////////////

    if( arguments.length === 1 ) {
        _sattoloCycle = false;
    }          
    if( arguments.length === 2 && typeof _sattoloCycle === 'function' ) {
        _rng = _sattoloCycle;
        _sattoloCycle = false;
    }
    /////////////////////////////////////////////////





    //////////////////////////////////
    // set default values as needed //
    //////////////////////////////////

    _sattoloCycle = Number( _sattoloCycle );

    _rng = ( typeof _rng === 'undefined' ? csprng : _rng );
    //////////////////////////////////





    ////////////////////////
    // the actual shuffle //
    ////////////////////////

    if( _sattoloCycle === 1 ) { --positionModifier; }

    // while there remain elements to shuffle...
    while( --arrayPosition ) {

        // pick a remaining element...
        pickIndex = Math.floor( _rng() * ( arrayPosition + positionModifier ) );
        
        // and swap it with the current element (no temp placeholder element).
        _array[ pickIndex ] = [ _array[ arrayPosition ], _array[ arrayPosition ] = _array[ pickIndex ] ][ 0 ];
    }
    ////////////////////////
}
