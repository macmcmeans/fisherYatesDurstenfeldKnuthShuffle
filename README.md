# 🔀 fisherYatesDurstenfeldKnuthShuffle (and unShuffle)<br> [![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity) [![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
The original pencil-and-paper logic created by Fisher and Yates in 1938 had a time complexity of O(*n*<sup>2</sup>). In 1964, Durstenfeld modified the algorithm to O(*n*). Knuth made the classic shuffle famous in his 1968 book, [*The Art of Computer Programming*](https://github.com/manjunath5496/The-Art-of-Computer-Programming-Books). And somewhere down the line, somebody somehow figured out some way to make the "[inside-out](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_%22inside-out%22_algorithm)" version, which is the logic I present here. <!--This algorithm is an in-place shuffle. That is, given a preinitialized array, it shuffles the elements of the array in place, rather than producing a shuffled copy of the array. -->

At minimum, it can be called by supplying a single-dimension array of values. If an external random number generator (RNG) is not referenced, the array will be shuffled non-deterministically using values from Crypto.getRandomValues(), which would be suitable for Monte Carlo applications. For cryptography purposes, an external cryptographically secure RNG (such as [ISAAC](https://github.com/macmcmeans/isaacCSPRNG)) should be specified to produce deterministic, seeded shuffling and unshuffling.

The shuffle produces statistically flat output, and the lack of bias may be checked using [this visual tool](https://bost.ocks.org/mike/shuffle/compare.html).

Optionally, [*Sattolo’s algorithm*](https://archive.is/j8KwS) may be used to generate random cyclic permutations of length *n* instead of random permutations. This is useful when the condition to be met involves no element of the array ever ending up in its original position ([derangement](https://archive.is/FKrB2)), but is wholly unsuited for cryptography.

This version provides [function overloading](https://en.wikipedia.org/wiki/Function_overloading) using internal logic having no external dependencies. Any optional parameters will be set to default values when omitted.

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
let shuffledArray = fisherYatesDurstenfeldKnuthShuffle( __sourceArray__, [*sattoloCycle*], [*externalRNG*] ); 
<br>&nbsp;<br>
let restoredArray = fisherYatesDurstenfeldKnuthUnshuffle( __shuffledArray__, [*sattoloCycle*], __externalRNG__ );
<br>&nbsp;<br>


## Example usage:

```
// #𝟭 𝗮𝗽𝗽𝗹𝘆 𝗮 𝗯𝗮𝘀𝗶𝗰 𝘀𝗵𝘂𝗳𝗳𝗹𝗲, 𝘄𝗵𝗲𝗿𝗲 𝘁𝗵𝗲 𝗴𝗲𝗻𝗲𝗿𝗮𝘁𝗼𝗿 𝗶𝘀 𝗶𝗻𝘁𝗲𝗿𝗻𝗮𝗹𝗹𝘆 𝗶𝗻𝗶𝘁𝗶𝗮𝗹𝗶𝘇𝗲𝗱 𝘄𝗶𝘁𝗵 𝗖𝗿𝘆𝗽𝘁𝗼.𝗴𝗲𝘁𝗥𝗮𝗻𝗱𝗼𝗺𝗩𝗮𝗹𝘂𝗲𝘀
> let _theArray = [0,1,2,3];
> let shuffledArray = fisherYatesDurstenfeldKnuthShuffle( _theArray );
> console.log( shuffledArray );                      --> (4) [0, 2, 1, 3] 


// #𝟮 𝗮𝗽𝗽𝗹𝘆 𝗦𝗮𝘁𝘁𝗼𝗹𝗼’𝘀 𝗮𝗹𝗴𝗼𝗿𝗶𝘁𝗵𝗺 𝘁𝗼 𝘁𝗵𝗲 𝘀𝗵𝘂𝗳𝗳𝗹𝗲 (𝗻𝗼𝘁𝗲 𝘁𝗵𝗮𝘁 𝗲𝗮𝗰𝗵 𝗲𝗹𝗲𝗺𝗲𝗻𝘁 𝗲𝗻𝗱𝘀 𝘂𝗽 𝗶𝗻 𝗮 𝗻𝗲𝘄 𝗽𝗼𝘀𝗶𝘁𝗶𝗼𝗻)
> let _theArray = [0,1,2,3];
> let shuffledArray = fisherYatesDurstenfeldKnuthShuffle( _theArray, true );
> console.log( shuffledArray );                      --> (4) [3, 2, 0, 1] 


// #𝟯 𝗿𝗲𝗳𝗲𝗿𝗲𝗻𝗰𝗲 𝗮𝗻 𝗲𝘅𝘁𝗲𝗿𝗻𝗮𝗹 𝗥𝗡𝗚 𝗼𝗯𝗷𝗲𝗰𝘁 (𝗻𝗼𝘁𝗲 𝘁𝗵𝗲 𝗺𝗲𝘁𝗵𝗼𝗱 𝗼𝘃𝗲𝗿𝗹𝗼𝗮𝗱𝗶𝗻𝗴 𝘄𝗵𝗲𝗿𝗲 𝘁𝗵𝗲 𝟯𝗿𝗱 𝗽𝗮𝗿𝗺 𝗶𝘀 𝗰𝗮𝗹𝗹𝗲𝗱 𝗮𝘀 𝘁𝗵𝗲 𝟮𝗻𝗱 𝗮𝗿𝗴)
> const _simpleRNG = function() { return Math.random(); }
> let _theArray = [0,1,2,3];
> let shuffledArray = fisherYatesDurstenfeldKnuthShuffle( _theArray, _simpleRNG );
> console.log( shuffledArray );                      --> (4) [0, 3, 1, 2] 


// #𝟰 𝗶𝗻𝘃𝗼𝗸𝗲 𝗮 𝗦𝗮𝘁𝘁𝗼𝗹𝗼 𝘀𝗵𝘂𝗳𝗳𝗹𝗲 𝗮𝗻𝗱 𝘂𝘀𝗲 𝗮𝗻 𝗲𝘅𝘁𝗲𝗿𝗻𝗮𝗹 𝗥𝗡𝗚
> const _simpleRNG = function() { return Math.random(); }
> let _theArray = [0,1,2,3,4,5];
> let shuffledArray = fisherYatesDurstenfeldKnuthShuffle( _theArray, true, _simpleRNG );
> console.log( shuffledArray );                      --> (6) [4, 2, 3, 0, 5, 1] 


// #𝟱 𝘀𝗲𝗰𝘂𝗿𝗲𝗹𝘆 𝘀𝗵𝘂𝗳𝗳𝗹𝗲 𝗮𝗻𝗱 𝗿𝗲𝘀𝘁𝗼𝗿𝗲 𝗮 𝘀𝘁𝗿𝗶𝗻𝗴 𝘂𝘀𝗶𝗻𝗴 𝗮𝗻 𝗲𝘅𝘁𝗲𝗿𝗻𝗮𝗹 𝗰𝗿𝘆𝗽𝘁𝗼𝗴𝗿𝗮𝗽𝗵𝗶𝗰𝗮𝗹𝗹𝘆 𝘀𝗲𝗰𝘂𝗿𝗲 𝗥𝗡𝗚 (𝗳𝗼𝗿 𝗲𝘅𝗮𝗺𝗽𝗹𝗲, 𝙞𝙨𝙖𝙖𝙘𝘾𝙎𝙋𝙍𝙉𝙂)
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
``bug`` Fix error in unshuffle logic where the restore loop was too short.<br>
``update`` Functions return array copies, source arrays are not modified.<br>
``update`` Revise readme.
<br>&nbsp;<br>

* 1.1 - 4 MAY 2020<br>
``feature`` Include an unshuffle function.<br>
``update`` Code cleanup.
<br>&nbsp;<br>

* 1.0 - 26 MAY 2018<br>
``release`` Initial release.
<br>&nbsp;<br>

# License (BSD)
Copyright © 2018, 2020, 2021 W. "Mac" McMeans

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
