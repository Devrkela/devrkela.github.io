import Polynomial from "./polynomial.js";
import Terme      from "./terme.js";

function PolynomialGenerator(size){
  let polynomial = new Polynomial([new Terme(0, 1, true), new Terme(0, 0, true)]);

  for(let i = 1; i < size; i++){
    polynomial = polynomial.multiply.polynomial(new Polynomial([new Terme(0, 1, true), new Terme(i, 0, true)]));
  }

  return new Polynomial(polynomial.termes);
}

export default PolynomialGenerator;