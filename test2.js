let a = -7;
let b = -3;

function divisaoEuclidiana(a, b) {
  let q, r;

  r = a % b;

  //   if (a % b == 1) {
  //     r = 1;
  //   } else {
  //     r = 0;
  //   }

  q = Math.trunc(a / b);
  //   r = a - q * b;
  //   q = a;

  console.log(q, r);

  if (r < 0) {
    r += Math.abs(b);
  }
}

divisaoEuclidiana(a, b);
