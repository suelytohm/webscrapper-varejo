function evenOrOdd(number) {
  if (number % number === 0) {
    return "Par";
  }
  return "Ímpar";
}

console.log(evenOrOdd(-42));
