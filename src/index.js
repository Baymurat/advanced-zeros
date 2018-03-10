/**
 * Method calculates how many zeros in the end of number, which is factorial of <i>number</i> in specified <i>base</i> base system.
 * For this first we should factor our base <i>base</i> into products of prime powers. Then we should check how many times each
 * prime in <i>base</i> divides the <i>number</i>. For each of those primes, divide the number of times it divides <i>number</i>
 * by the exponent of the prime in <i>base</i>, and round down to the nearest integer. The smallest number we get (for all the primes) is 
 * the number of final zeros that <i>number</i> has in base <i>base</i>.
 * 
 * @param number
 * @param base
 * @returns counts of zeros in the end of number, which is factorial of <i>number</i> in specified <i>base</i> base system.
 */
module.exports = function getZerosCount(number, base) { 
  var factors = allFactors(base);
  var list = [];
    
  for(var [key, value] of factors) {
      list.push(Math.floor(trailZeros(number, key) / value));
  }

  return Math.min.apply(Math, list);
}

/**
 * Method calculates how many times <i>divider</i> divides the number <i>number</i>.
 * 
 * @param number 
 * @param divider 
 * @returns amount of <i>divider</i> in <i>number</i>.
 */
function trailZeros(number, divider) {
  if (number / divider == 0) {
      return 0;
  }

  //the result of this arithmetic operation is a floating-point number. 
  //In order to avoid errors, the result is reduced to the integer form.
  var temp = Math.floor(number / divider, divider);
  return trailZeros(temp, divider) + temp;
}

/**
 * Method factors specified number into products of prime powers and stores result in map.
 * Keys like proudcts, values like powers of product.
 * 
 * @param number 
 * @returns map of products and corresponding powers.
 */
function allFactors(number) {
  var result = new Map();
  
  for (i = 2; i <= number; i++) {
    if (number % i == 0) {
        if (result.has(i)) {
            var t = result.get(i) + 1;
            result.set(i, t);
        } else {
            result.set(i, 1);
        }
        number /= i;
        i = 1;
    }
}

return result;
}