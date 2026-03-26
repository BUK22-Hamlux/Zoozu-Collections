function luhnCheck(cardNumber) {
  const digits = cardNumber.replace(/\s/g, "").split("").reverse();
  let sum = 0;
  digits.forEach((digit, index) => {
    let n = parseInt(digit, 10);
    if (index % 2 === 1) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
  });
  return sum % 10 === 0;
}

export default luhnCheck;
