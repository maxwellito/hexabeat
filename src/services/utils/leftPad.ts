/*
 * LeftPad polyfill by wafflesnatcha
 * https://gist.github.com/wafflesnatcha/3694295
 *
 * Pad a string to a certain length with another string.
 *
 * @param {Number|String} size The resulting padded string length.
 * @param {Number} size The resulting padded string length.
 * @param {String} [str=" "] String to use as padding.
 * @returns {String} The padded string.
 */
export function leftPad(
  base: number | string,
  length: number,
  fill: string = ' '
) {
  const origin = `${base}`;
  if (origin.length >= length) {
    return origin;
  }
  return (
    new Array(Math.ceil((length - origin.length) / fill.length) + 1)
      .join(fill)
      .substr(0, length - origin.length) + origin
  );
}
