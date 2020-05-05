# fisherYatesDurstenfeldKnuthShuffle
The original logic created by Fisher and Yates in 1938 had a time complexity of O(*n*<sup>2</sup>). In 1964, Durstenfeld modified the algorithm to O(*n*). Knuth made the classic shuffle famous in his 1968 book, *The Art of Computer Programming*.

At minimum, it can be called by supplying an array of values to be shuffled. If an external random number generator (RNG) is not referenced, the array will be shuffled non-deterministically using values from Crypto.getRandomValues(), which would be suitable for Monte Carlo applications. For cryptography purposes, an external cryptographically secure RNG may be specified to produce deterministic, seeded shuffling.

The shuffle produces statistically flat output, and the lack of bias may be checked using [this visual tool](https://bost.ocks.org/mike/shuffle/compare.html). Optionally, [*Sattolo's algorithm*](https://news.ycombinator.com/item?id=14967697) may be used to generate random cyclic permutations of length *n* instead of random permutations. This is useful when the condition to be met involves no element of the array ever ending up in its original position.

This version provides method overloading (not currently available in ECMAScript natively). Any of the optional parameters will be set to their default values if skipped. Since this modifies an array *in-place*, the function returns no value.

<br>&nbsp;<br>
Version 1.1<br>
Author: W. "Mac" McMeans<br>
Date: 4 MAY 2020
<br>&nbsp;<br>


## Application:
Use this when you need an unbiased shuffle that runs in O(*n*) time. Couple it with a cryptographically secure pseudo random number generator, such as [ISAAC](https://github.com/macmcmeans/isaacCSPRNG), for crypto applications.


## Dependencies:
None.
<br>&nbsp;<br>


## Syntax:
fisherYatesDurstenfeldKnuthShuffle( _matrixToBeShuffled, [ _sattoloCycle, ] [ _externalRNG ] ); 
<br>&nbsp;<br>


## Example usage:

```
// a basic shuffle, where the generator is internally initialized  with Crypto.getRandomValues
> _theMatrix = [0,1,2,3];
> fisherYatesDurstenfeldKnuthShuffle( _theMatrix );
> console.log( _theMatrix );                      --> (4) [0, 2, 1, 3] 


// apply Sattolo's algorithm to the shuffle (note that each element ends up in a new position)
> _theMatrix = [0,1,2,3];
> fisherYatesDurstenfeldKnuthShuffle( _theMatrix, true );
> console.log( _theMatrix );                      --> (4) [3, 2, 0, 1] 


// reference an external RNG object (note the simulated overloading where the 3rd parm is called as the 2nd arg)
> _simpleRNG = function() { return Math.random(); }
> _theMatrix = [0,1,2,3];
> fisherYatesDurstenfeldKnuthShuffle( _theMatrix, _simpleRNG );
> console.log( _theMatrix );                      --> (4) [0, 3, 1, 2] 


// invoke a Sattolo shuffle and use an external RNG
> _simpleRNG = function() { return Math.random(); }
> _theMatrix = [0,1,2,3,4,5];
> fisherYatesDurstenfeldKnuthShuffle( _theMatrix, true, _simpleRNG );
> console.log( _theMatrix );                      --> (6) [4, 2, 3, 0, 5, 1] 
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
* 1.1 - 4 MAY 2020<br>
NEW: Include an unshuffle function. Code cleanup.
<br>&nbsp;<br>

* 1.0 - 26 MAY 2018<br>
Initial release
<br>&nbsp;<br>

# License (BSD)
Copyright (c) 2018, 2020 W. "Mac" McMeans

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
