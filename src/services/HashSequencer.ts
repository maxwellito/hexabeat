/**
 * Hash Sequencer
 *
 */

/**
 * Convert a hash into an array of 0 and 1
 */
export function hashParser(hash: string): number[] {
  var val,
    len = hash.length,
    output: number[] = [];

  for (var i = 0; i < len; i++) {
    val = hexToInt(hash.substr(i, 1));
    for (let four = 3; four >= 0; four--) {
      output[i * 4 + four] = val % 2 === 0 ? 0 : 1;
      val = val >> 1;
    }
  }
  return output;
}

/**
 * Transform a string of hex chars into
 * an integer
 * @param  {string} input HEX code to transform
 * @return {number}
 */
export function hexToInt(input: string): number {
  return parseInt(input, 16);
}

/**
 * Trun a binary array to an integer
 * @param  {array} input Input to transform
 * @return {number}
 */
export function binToInt(input: number[]): number {
  return input.reduce(function(acc, val) {
    return acc * 2 + val;
  }, 0);
}
