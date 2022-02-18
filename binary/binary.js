function combineMap(a1, a2, fn) {
  return a1.map((x, i) => fn(x, a2[i]));
}

function reverse(arr) {
  return [...arr].reverse();
}

class Binary {
  constructor(bits) {
    if (typeof bits === 'number') {
      this.bits = String(bits).split('').map(bit => parseInt(bit));
    } else if (typeof bits === 'string') {
      this.bits = bits.trim().split('').map(bit => parseInt(bit));
    } else if (Array.isArray(bits)) {
      this.bits = bits;
    } else {
      throw new Error('Binary view couldn\'nt be instanciated');
    }
  }

  static fromSigned(num) {
    if (!Number.isInteger(num)) {
      throw new Error('Number is not an integer');
    } else if (num === 0) {
      return new Binary([0]);
    } else {
      const unsigned = Binary.fromUnsigned(Math.abs(5));
      const numberOfBits = unsigned.bits.length + 1;
      const withZeroSignBit = unsigned.zeroExtend(numberOfBits);

      if (num > 0) {
        return withZeroSignBit;
      }

      const flipped = withZeroSignBit.not();
      const flippedWithAddedOne = flipped.add(Binary.fromUnsigned(1).zeroExtend(numberOfBits));
      return new Binary(flippedWithAddedOne.bits.slice(1));
    }
  }

  static fromUnsigned(num) {
    if (!Number.isInteger(num)) {
      throw new Error('Number is not an integer');
    } else if (num === 0) {
      return new Binary([0]);
    } else {
      const bits = [];
      let nearestPowerOfTwo = Math.floor(Math.log2(num));
      let numberInProgress = num;

      while (nearestPowerOfTwo >= 0) {
        if (numberInProgress >= 2 ** nearestPowerOfTwo) {
          bits.push(1);
          numberInProgress -= 2 ** nearestPowerOfTwo;
        } else {
          bits.push(0);
        }

        nearestPowerOfTwo -= 1;
      }

      return new Binary(bits);
    }
  }

  zeroExtend(nBits) {
    if (nBits <= this.bits.length) {
      throw new Error(`Need to extend to a larger number of bits (current = ${this.bits.length}, target=${nBits})`);
    }

    const extraZeros = nBits - this.bits.length;
    const zeros = Array.from({ length: extraZeros }, () => 0);
  
    return new Binary([...zeros, ...this.bits]); 
  }

  zeroExtendToMatch(other) {
    this.assertBinary(other);
    return this.zeroExtend(other.bits.length);
  }

  assertBinary(number) {
    if (!number instanceof Binary) {
      throw new Error('Provided number is not binary');
    }
  }

  assertNumberOfBits(number) {
    if (number.bits.length !== this.bits.length) {
      throw new Error('Provided number is not of the same bit length');
    }
  }

  toSignedNumber() {
    if (this.bits[0] === 0) {
      return this.toNumber();
    } else {
      const minusOneBits = Array.from({ length: this.bits.length }, () => 1);
      const minusOne = new Binary(minusOneBits);
      const positiveWithCarry = this.add(minusOne).not();
      const positiveNumber = new Binary(positiveWithCarry.bits.slice(1));
      return -positiveNumber.toNumber();
    }
  }

  toNumber() {
    return this.bits.reduce((total, bit, index) => {
      if (bit === 0) return total;
      return total + 2 ** (this.bits.length - 1 - index)
    }, 0);
  }

  or(other) {
   this.assertBinary(other);
   this.assertNumberOfBits(other);
   const newBits = combineMap(this.bits, other.bits, (a, b) => a | b);
   return new Binary(newBits);
  }

  xor(other) {
   this.assertBinary(other);
   this.assertNumberOfBits(other);
   const newBits = combineMap(this.bits, other.bits, (a, b) => a ^ b);
   return new Binary(newBits);
  }

  not() {
    const newBits = this.bits.map(bit => bit === 0 ? 1 : 0);
    return new Binary(newBits);
  }

  and(other) {
    this.assertBinary(other);
    this.assertNumberOfBits(other);
    
    let carryBit = 0;
    const newBits = combineMap(reverse(this.bits), reverse(other.bits), (a, b) => {
      const abSum = a ^ b; // 0 ^ 1 || 1 ^ 0
      const abCarry = a & b; // 1 & 1

      const abSumPlusCarry = abSum ^ carryBit; // 1 if abSum 0 or carryBit 0
      const abSumCarry = abSum & carryBit; // 1 if abSum 1 and carryBit 1

      carryBit = abCarry | abSumCarry;
      return abSumPlusCarry;
    });

    return new Binary([carryBit, ...reverse(newBits)]);
  }
}