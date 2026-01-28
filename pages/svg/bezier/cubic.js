Array.prototype.clone = function clone(){
  return this.map(value => value);
}

function QuadraticKnot(points){
  const po  = points[0];
  const pc1 = points[1];
  const pa  = points[2];

  this.po  = po;
  this.pc1 = pc1;
  this.pa  = pa;

  /**
    On calcule et on cache les coefficients des polynôme décrit ci-dessous.
    Les coefficients sont définit dans un tableau afin d'être directement utilisable
    par la fonction Math.polynomial qui résout un polynôme === 0.

    La premiére valeur correspond au coefficient du terme de plus haut degré t^n.
    Les suivants ceux des termes de degré suivants t^(n-1).
    exemple:
      ---> cubique polynomial: a * t^3 + b * t^2 + c * t + d
      ---> tableau js:        [a, b, c, d]
  **/

  /**
    Objet retournant les coefficients du polynôme, décrivant la courbe de bezier, ...
  **/
  const courbe = {
    /**
      ... pour x ...
    **/
    x:QuadraticKnot.courbe(po.x, pc1.x, pa.x),

    /**
      ... et pour y.
    **/
    y:QuadraticKnot.courbe(po.y, pc1.y, pa.y),
  };

  /**
      Objet retournant les coefficients de la dérivée premiére, aussi appelé velocité,
      qui représente une courbe de bézier quadratique.
  **/
  const velocite = {
    x:courbe.x.derivative(),
    y:courbe.y.derivative(),
  };

  /**
      Objet retournant les coefficients de la dérivée seconde, aussi appelé accélération,
      qui représente une courbe de bézier linéaire ou ligne droite.
  **/
  
  const acceleration = {
    x:velocite.x.derivative(),
    y:velocite.y.derivative(),
  };
  
  this.courbe       = courbe;
  this.velocite     = velocite;
  this.acceleration = acceleration;
}

QuadraticKnot.courbe = function courbe(po, pc1, pa){
  return Math.polynomial([
    (po - 2 * pc1 + pa),
    (2* (pc1 - po)),
    po,
  ]);
};

function CubicKnot(points){
  const po  = points[0];
  const pc1 = points[1];
  const pc2 = points[2];
  const pa  = points[3];
  /**
    Point d'origine de la knot.
  **/
  this.po  = po;
  
  /**
    Premier point de contrôle de la knot.
  **/
  this.pc1 = pc1;
  
  /**
    Deuxiéme point de contrôle de la knot.
  **/
  this.pc2 = pc2;
  
  /**
    Point d'arrivé de la knot.
  **/
  this.pa  = pa;

  /**
    On calcule et on cache les coefficients des polynôme décrit ci-dessous.
    Les coefficients sont définit dans un tableau afin d'être directement utilisable
    par la fonction Math.polynomial qui résout un polynôme === 0.

    La premiére valeur correspond au coefficient du terme de plus haut degré t^n.
    Les suivants ceux des termes de degré suivants t^(n-1).
    exemple:
      ---> cubique polynomial: a * t^3 + b * t^2 + c * t + d
      ---> tableau js:        [a, b, c, d]
  **/

  /**
    Objet retournant les coefficients du polynôme, décrivant la courbe de bezier, ...
  **/
  const courbe = {
    /**
      ... pour x ...
    **/
    x:CubicKnot.courbe(po.x, pc1.x, pc2.x, pa.x),

    /**
      ... et pour y.
    **/
    y:CubicKnot.courbe(po.y, pc1.y, pc2.y, pa.y),
  };

  /**
      Objet retournant les coefficients de la dérivée premiére, aussi appelé velocité,
      qui représente une courbe de bézier quadratique.
  **/
  const velocite = {
    x:courbe.x.derivative(),
    y:courbe.y.derivative(),
  };

  /**
      Objet retournant les coefficients de la dérivée seconde, aussi appelé accélération,
      qui représente une courbe de bézier linéaire ou ligne droite.
  **/
  
  const acceleration = {
    x:velocite.x.derivative(),
    y:velocite.y.derivative(),
  };

  /**
      Objet retournant les coefficients de la dérivée seconde, aussi appelé sursaut?,
      qui représente une courbe de bézier linéaire ou ligne droite.
  **/
  
  const jolt = {
    x:acceleration.x.derivative(),
    y:acceleration.y.derivative(),
  };
  
  this.courbe       = courbe;
  this.velocite     = velocite;
  this.acceleration = acceleration;
  this.jolt         = jolt;

  /**
    Liste qui contiendra plusieurs quadratique bézier recréant la courbe de bézier cubique.
  **/
  this.vquads = [];

  t.call(this);
}


CubicKnot.prototype.toSVG = function toSVG(){
  return `C ${this.pc1.x} ${this.pc1.y}, ${this.pc2.x} ${this.pc2.y}, ${this.pa.x} ${this.pa.y}`;
}

CubicKnot.prototype.intersecteDroite = function intersecteDroite(droite, quad_point){
  let A, B, C, D = null;
  
  if(droite.x){
    let coefficients_x = this.courbe.x.coefficients.clone();
    coefficients_x[3] -= droite.x;

    A = coefficients_x[0];
    B = coefficients_x[1];
    C = coefficients_x[2];
    D = coefficients_x[3];
  } 
  else if(droite.y){
    let coefficients_y = this.courbe.y.coefficients.clone();
    coefficients_y[3] -= droite.y;

    A = coefficients_y[0];
    B = coefficients_y[1];
    C = coefficients_y[2];
    D = coefficients_y[3];
  } else {
    let coefficients_x = this.courbe.x.coefficients.map(coeff=>{
      return coeff * droite.a;
    });
    let coefficients_y = this.courbe.y.coefficients.clone();

    coefficients_x[3] += droite.b;

    A = coefficients_y[0] - coefficients_x[0];
    B = coefficients_y[1] - coefficients_x[1];
    C = coefficients_y[2] - coefficients_x[2];
    D = coefficients_y[3] - coefficients_x[3];
  }

  let racines = Math.polynomial([A,B,C,D]).racines();

  racines = racines.map(t=>{
    let position = {
      x: this.courbe.x.resout(t),
      y: this.courbe.y.resout(t),
    }

    const length = lengthPoint(position,quad_point);
    return {
      position,
      t,
      length
    }
  });
  
  racines.sort((a,b)=>{
    return a.length - b.length;
  });
  
  return racines[0].position;
}

CubicKnot.courbe = function courbe(po, pc1, pc2, pa){
  return Math.polynomial([
    -po + 3 * pc1 - 3* pc2 + pa,
    3 * (po - 2 * pc1 + pc2),
    3 * (-po + pc1),
    po
  ]);
}

function t(){
  let t = [];
  /**
    On définit les coefficients de la dérivé premiére pour x.
  **/
  const ax = this.velocite.x.a;
  const bx = this.velocite.x.b;
  const cx = this.velocite.x.c;

  /**
    On définit les coefficients de la dérivé premiére pour y.
  **/
  const ay = this.velocite.y.a;
  const by = this.velocite.y.b;
  const cy = this.velocite.y.c;

  /**
    On définit les coefficients de la dérivée seconde pour x.
  **/

  const axp = this.acceleration.x.a;
  const bxp = this.acceleration.x.b;

  /**
    On définit les coefficients de la dérivée seconde pour y.
  **/

  const ayp = this.acceleration.y.a;
  const byp = this.acceleration.y.b;

  /**
    On définit les coefficients de la jolt pour x.
  **/
  const axj = this.jolt.x.a;
  
  /**
    On définit les coefficients de la jolt pour y.
  **/
  const ayj = this.jolt.y.a;
  /**
    On cherche si il existe des valeurs de t
    pour lesquelles la dérivé premiére et seconde sont colinéaires.
  **/
  const A = (axp * ay) - (ayp * ax);
  const B = (axp * by) + (bxp * ay) - (ayp * bx) - (byp * ax);
  const C = (axp * cy) + (bxp * by) - (ayp * cx) - (byp * bx);
  const D = (bxp * cy) - (byp * cx);

   /**
    On cherche si il existe des valeurs de t
    pour lesquelles la dérivé premiére et seconde sont orthogonaux.
  **/
  const AP = (axp * ax) - (ayp * -ay);
  const BP = (axp * bx) + (bxp * ax) - (ayp * -by) - (byp * -ay);
  const CP = (axp * cx) + (bxp * bx) - (ayp * -cy) - (byp * -by);
  const DP = (bxp * cx) - (byp * -cy);

  /**
    On cherche si il existe des valeurs de t
    pour lesquelles la dérivé premiére et la jolt sont colinéaires.
  **/
  const AJ = ax * ayj - ay * axj;
  const BJ = bx * ayj - by * axj;
  const CJ = cx * ayj - cy * axj;

  /**
    On cherche si il existe des valeurs de t
    pour lesquelles la dérivé premiére et la jolt sont colinéaires.
  **/
  const AJY = -ay * ayj - ax * axj;
  const BJY = -by * ayj - bx * axj;
  const CJY = -cy * ayj - cx * axj;

  /**
    On cherche pour les coordonnées x minimales.
  **/
  t = t.concat(Math.polynomial([ax,bx,cx]).racines())
    /**
      On cherche pour les coordonnées y minimales.
    **/
    .concat(Math.polynomial([ay,by,cy]).racines())
    
    /**
      On cherche si il existe une valeur t pour laquelle la courbe change de direction.
    **/
    .concat(Math.polynomial([axp,bxp]).racines())
    
    /**
      On cherche si il existe une valeur t pour laquelle la courbe change de direction.
    **/
    .concat(Math.polynomial([ayp,byp]).racines())

    /**
      On résout les équations expliquer au dessus.
    **/
    .concat(Math.polynomial([A,B,C,D]).racines())
    .concat(Math.polynomial([AP,BP,CP,DP]).racines())
    .concat(Math.polynomial([AJ,BJ,CJ]).racines())
    .concat(Math.polynomial([AJY,BJY,CJY]).racines())

    /**
      On supprime les valeurs de t qui ne sont pas dans l'intervalle ]0, 1[.
    **/
    .filter(
      function (t){
        if(t >= 0 && t <= 1) return t;
      }
    );
  
  t.push(0,1);
  
  t.sort();
  
  decompose.call(this,t);
}

function decompose(points){
  const beziers_points = points.map((t, index,array)=>{
    const px = this.courbe.x.resout(t);
    const py = this.courbe.y.resout(t);

    const dx = this.velocite.x.resout(t);
    const dy = this.velocite.y.resout(t);

    return {
      point:{
        x: px,
        y: py,
      },
      tangente:{
        x:px + dx,
        y:py + dy,
      }
    };
  });

  beziers_points.forEach(construitQuadratic.bind(this));
  
}

function construitQuadratic(courant, index, points){
  if(index > 0){
    const precedent = points[index-1];

    const droite_1  = Geometrie.droite(precedent.point, precedent.tangente);
    const droite_2  = Geometrie.droite(courant  .point, courant  .tangente);
    
    const po        = precedent.point;
    const pc1       = droite_1.intersecte(droite_2);
    const pa        = courant.point;

    this.vquads.push(new QuadraticKnot([po,pc1,pa]));
  }
}

function lengthPoint(p0,p1){
  return Math.sqrt((p0.y-p1.y)**2 + (p0.x - p1.x)**2);
}

CubicKnot.prototype.distanceMinimal = function distanceMinimal(point){
  let racines = this.vquads.map(quadratique=>{
    return {
      position:quadratique.po,
      length: lengthPoint(quadratique.po,point)
    }
  });

  racines.push( {
      position: this.pa,
      length: lengthPoint(this.pa, point)
    })
  this.vquads.forEach(quadratique=>{
    const ax  = quadratique.courbe.x.a;
    const bx  = quadratique.courbe.x.b;
    const cx  = quadratique.courbe.x.c - point.x;

    const ay  = quadratique.courbe.y.a;
    const by  = quadratique.courbe.y.b;
    const cy  = quadratique.courbe.y.c - point.y;

    const apx = quadratique.velocite.x.a;
    const bpx = quadratique.velocite.x.b;

    const apy = quadratique.velocite.y.a;
    const bpy = quadratique.velocite.y.b;

    const A   = ax * apx + ay * apy;
    const B   = bx * apx + ax * bpx + by * apy + ay * bpy;
    const C   = cx * apx + bx * bpx + cy * apy + by * bpy;
    const D   = cx * bpx + cy * bpy;
    
    racines = racines.concat(
      Math.polynomial([A,B,C,D]).racines().filter(t=>{
        if(t<1 && t>0){
          return true;
        }
      }).map(t=>{          
        const quadratique_position = {
          x: quadratique.courbe.x.resout(t),
          y: quadratique.courbe.y.resout(t),
        };

        const droite = Geometrie.droite(quadratique_position, point);

        const position = this.intersecteDroite(droite,quadratique_position);
        const length = lengthPoint(position, point);

        return {position,length};
      })
    );
  });

  racines.sort((a,b)=>{
    return a.length - b.length;
  });

  return racines[0];
}

// TEST

window.Geometrie.CubicKnot = CubicKnot;