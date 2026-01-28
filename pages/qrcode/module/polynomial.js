import Terme from "./terme.js";

Polynomial.multiply = {};

Polynomial.multiply.terme = function terme(terme, current){
  return current.multiply(terme);
};

Polynomial.search = function search(degree, terme){
  return terme.degree === degree;
}

Polynomial.reduce = function reduce(termes){
  const new_termes = [];
  
  for(let degree = termes[0].degree; degree >= termes[termes.length - 1].degree; degree--){
    const get_all = termes.filter(Polynomial.search.bind(null, degree));

    let terme = get_all.pop();

    if(terme === undefined){
      continue;
    }

    while(get_all.length){
      terme = new Terme(get_all.pop().coefficient ^ terme.coefficient, terme.degree, false);
    }

    new_termes.push(terme);
  }

  return new_termes;
}

Polynomial.decreasing = function decreasing(previous, current){
  return current.degree - previous.degree;
}

function Polynomial(termes){
  this.termes = termes.sort(Polynomial.decreasing);

  this.multiply = {};
  
  this.multiply.polynomial = (function multiply(polynomial){
    const termes = [];
    
    for(let right_terme of polynomial.termes){
      for(let left_terme of this.termes){
        termes.push(right_terme.multiply(left_terme));
      }
    }

    return new Polynomial(Polynomial.reduce(termes.sort(Polynomial.decreasing)));
  }).bind(this);

  this.multiply.terme = (function(terme){
    return new Polynomial(this.termes.map(Polynomial.multiply.terme.bind(null, terme)));
  }).bind(this);

  
  this.search = function search(degree){
    return this.termes.filter(Polynomial.search.bind(null, degree)).pop();
  }

  this.xor       = function xor(polynomial){
    const max = Math.max(polynomial.termes[0].degree, this.termes[0].degree);
    const min = Math.min(polynomial.termes[polynomial.termes.length - 1].degree, this.termes[this.termes.length - 1].degree);

    const termes = [];
    
    for(let degree = max; degree >= min; degree--){
      const left  = this.search(degree);
      const right = polynomial.search(degree);

      if(left && right){
        const terme = left.xor(right);
        if(degree === max && terme.coefficient === 0){
          continue;
        }

        termes.push(terme);
        continue;
      }

      if(left){
        termes.push(left);
        continue;
      }

      if(right){
        termes.push(right);
        continue;
      }
    }

    return new Polynomial(termes);
  }
}

  export default Polynomial;