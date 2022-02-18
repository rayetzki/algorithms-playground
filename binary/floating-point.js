const EXP_BITS = 5; // 2 ** 5 = 32 bits;
const MANTISSA_BITS = 10; // 2 ** 10 = 1024 bits
const NON_SIGN_BITS = EXP_BITS + MANTISSA_BITS;

function encodeFloatingPoint(num) {
  const absolute = Math.abs(num);
  const sign = Math.sign(num) === -1 ? 1 : 0;
  
  let exponent = Math.floor(Math.log(Math.abs(absolute)) / Math.log(2));
  const [lower, upper] = [2 ** exponent, 2 ** (exponent + 1)];
  exponent = (exponent + 15) & 0b11111; // not higher than 5 bits

  const percentage = (Math.abs(absolute) - lower) / (upper - lower);
  const mantissa = 1024 * percentage;

  return (sign << NON_SIGN_BITS) | (exponent << MANTISSA_BITS) | mantissa;
}

function decodeFloatingPoint(n) {
  const sign     = (n & 0b1000000000000000) >> NON_SIGN_BITS;
  const exponent = (n & 0b0111110000000000) >> MANTISSA_BITS;
  const mantissa = (n & 0b0000001111111111);

  const percentage = mantissa / (2 ** MANTISSA_BITS);
  return (-1) ** sign * (1 + percentage) * 2 ** (exponent - 15);
}

const original = 12.52571;
console.log(`original: ${original}`);
console.log(`encoded: ${encodeFloatingPoint(original)}`);
console.log(`decoded: ${decodeFloatingPoint(encodeFloatingPoint(original))}`)