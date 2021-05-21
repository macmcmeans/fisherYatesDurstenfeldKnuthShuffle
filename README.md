# fisherYatesDurstenfeldKnuthShuffle (and unShuffle)
The original logic created by Fisher and Yates in 1938 had a time complexity of O(*n*<sup>2</sup>). In 1964, Durstenfeld modified the algorithm to O(*n*). Knuth made the classic shuffle famous in his 1968 book, *The Art of Computer Programming*.

At minimum, it can be called by supplying an array of values to be shuffled. If an external random number generator (RNG) is not referenced, the array will be shuffled non-deterministically using values from Crypto.getRandomValues(), which would be suitable for Monte Carlo applications. For cryptography purposes, an external cryptographically secure RNG should be specified to produce deterministic, seeded shuffling and unshuffling.

The shuffle produces statistically flat output, and the lack of bias may be checked using [this visual tool](https://bost.ocks.org/mike/shuffle/compare.html). Optionally, [*Sattolo's algorithm*](https://archive.is/j8KwS) may be used to generate random cyclic permutations of length *n* instead of random permutations. This is useful when the condition to be met involves no element of the array ever ending up in its original position (this condition is unsuited for cryptography).

This version provides [function overloading](https://en.wikipedia.org/wiki/Function_overloading) using internal logic having no external dependencies. Any optional parameters will be set to default values if omitted.

<br>&nbsp;<br>
Version 1.2<br>
Author: W. "Mac" McMeans<br>
Date: 21 MAY 2021
<br>&nbsp;<br>


## Application:
Use this when you need an unbiased shuffle that runs in O(*n*) time. Couple it with a cryptographically secure pseudo random number generator, such as [ISAAC](https://github.com/macmcmeans/isaacCSPRNG), for cryptographic applications.


## Dependencies:
None.
<br>&nbsp;<br>


## Syntax:
let shuffledArray = fisherYatesDurstenfeldKnuthShuffle( __arrayToBeShuffled__, [*sattoloCycle*], [*externalRNG*] ); 
<br>&nbsp;<br>
let orderedArray = fisherYatesDurstenfeldKnuthUnshuffle( __arrayThatWasShuffled__, [*sattoloCycle*], __externalrng__ );
<br>&nbsp;<br>


## Example usage:

```
// #1 apply a basic shuffle, where the generator is internally initialized with Crypto.getRandomValues
> let _theArray = [0,1,2,3];
> let shuffledArray = fisherYatesDurstenfeldKnuthShuffle( _theArray );
> console.log( shuffledArray );                      --> (4) [0, 2, 1, 3] 


// #2 apply Sattolo's algorithm to the shuffle (note that each element ends up in a new position)
> let _theArray = [0,1,2,3];
> let shuffledArray = fisherYatesDurstenfeldKnuthShuffle( _theArray, true );
> console.log( shuffledArray );                      --> (4) [3, 2, 0, 1] 


// #3 reference an external RNG object (note the method overloading where the 3rd parm is called as the 2nd arg)
> const _simpleRNG = function() { return Math.random(); }
> let _theArray = [0,1,2,3];
> let shuffledArray = fisherYatesDurstenfeldKnuthShuffle( _theArray, _simpleRNG );
> console.log( shuffledArray );                      --> (4) [0, 3, 1, 2] 


// #4 invoke a Sattolo shuffle and use an external RNG
> const _simpleRNG = function() { return Math.random(); }
> let _theArray = [0,1,2,3,4,5];
> let shuffledArray = fisherYatesDurstenfeldKnuthShuffle( _theArray, true, _simpleRNG );
> console.log( shuffledArray );                      --> (6) [4, 2, 3, 0, 5, 1] 


// #5 securely shuffle and restore a string using an external cryptographically secure RNG (for example, isaacCSPRNG)
> const _theString = 'this is my test string', _theArray = _theString.split( '' );
> const _secureRNG = isaacCSPRNG( 'this is my seed' );    // init RNG
> const shuffledArray = fisherYatesDurstenfeldKnuthShuffle( _theArray, _secureRNG.double );
> console.log( shuffledArray );                      --> (22) ["t", " ", "h", "y", "i", "t", "r", "n", "t", "s", "g", "i", " ", "i", "s", " ", "e", " ", "t", "m", "s", "s"]

> _secureRNG.seed( 'this is my seed' );    // reset RNG
> const restoredArray = fisherYatesDurstenfeldKnuthUnshuffle( shuffledArray, _secureRNG.double );
> console.log( restoredArray );                      --> (22) ["t", "h", "i", "s", " ", "i", "s", " ", "m", "y", " ", "t", "e", "s", "t", " ", "s", "t", "r", "i", "n", "g"]
> let _newString = restoredArray.join( '' );
> console.log( _newString );                         --> "this is my test string"

// NOTE: The use of constants in this example is to make clear that copies of arrays are returned (no copy in-place); the original arrays are not altered.
```
<br>&nbsp;<br>


## REFS:
https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle

https://bost.ocks.org/mike/shuffle/compare.html
<br>&nbsp;<br>


## Tested:
Google Chrome on Win 10 (x64)
<br>&nbsp;<br>

## Version notes:
* 1.2 - 21 MAY 2021<br>
``bug`` Fix error in unshuffle logic.<br>
``update`` Light code refactoring.
<br>&nbsp;<br>

* 1.1 - 4 MAY 2020<br>
``feature`` Include an unshuffle function.<br>
``update`` Code cleanup.<br>
<br>&nbsp;<br>

* 1.0 - 26 MAY 2018<br>
``release`` Initial release.
<br>&nbsp;<br>

# License (BSD)
Copyright (c) 2018, 2020 W. "Mac" McMeans

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
