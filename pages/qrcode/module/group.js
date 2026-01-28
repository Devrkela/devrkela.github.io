import Terme               from "./terme.js";
import Polynomial          from "./polynomial.js";
import PolynomialGenerator from "./polynomial_generator.js";

QRCodeGroup.toTerme = function toTerme(constant, degree){
  return new Terme(constant, degree, false);
}

QRCodeGroup.toInteger = function toInteger(terme){
  return terme.coefficient;
}

QRCodeGroup.computeEC = function computeEC(polynomial){
  const generator = new PolynomialGenerator(this.ECPerBLock);

  let resultat = polynomial.multiply.terme(new Terme(0, this.ECPerBLock, true));

  for(let i = 0; i < polynomial.termes.length; i++){
    resultat = resultat.xor(generator.multiply.terme(new Terme(resultat.termes[0].alpha, (polynomial.termes[0].degree - i),true)));
  }

  return resultat.termes.map(QRCodeGroup.toInteger);
}

function QRCodeGroup(codewords, info, ECPerBLock){
  this.blocks     = [];
  this.info       = info;
  this.ECPerBLock = ECPerBLock;
  
  for(let index = 0; index < info.size; index++){
    this.blocks.push(codewords.slice(index * info.numberOfCodeword, (index + 1) * info.numberOfCodeword));
  }

  this.ec = [];

  for(let block of this.blocks){
    this.ec.push(QRCodeGroup.computeEC.call(this, new Polynomial(block.toReversed().map(QRCodeGroup.toTerme))));
  }
}

export default QRCodeGroup;