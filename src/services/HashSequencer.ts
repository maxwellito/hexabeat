import { Sequencer } from 'models/Sequencer';

/**
 * Hash Sequencer
 *
 */
export default {
  hashParser: (hash: string) => {
    var four,
      val,
      len = hash.length,
      output = [];

    for (var i = 0; i < len; i++) {
      val = this.hexToInt(hash.substr(i, 1));
      for (four = 3; four >= 0; four--) {
        output[i * 4 + four] = val % 2 === 0 ? 0 : 1;
        val = val >> 1;
      }
    }
    return output;
  },

  /**
   * Transform a string of hex chars into
   * an integer
   * @param  {string} input HEX code to transform
   * @return {number}
   */
  hexToInt: function(input: string) {
    return parseInt(input, 16);
  }
};
