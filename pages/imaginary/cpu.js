const controller = document.querySelector("#control");

const path = document.querySelector("#cir");
const c = document.querySelector("circle");

let context = null;

const max_frequency = 600;

const pi = Math.PI;

const i1 = 1;
const d1 = Math.random() * 2* pi;
const f1 = Math.round(max_frequency * Math.random());

const i2 = 1;
const d2 = Math.random() * 2* pi;
const f2 = Math.round(max_frequency * Math.random());

console.log(d1, d2)

function triangle(p,x){
    return  2 * Math.abs(x/p - Math.floor(x/p + 1/2));
}

let pulse_wave = new Float32Array(44100);


for (let i = 0; i < pulse_wave.length; i++) {
const t = i / 44100;
//nowBuffering[i] = 1 - Math.cos(2 * Math.PI * 140 * t + Math.PI/2);
  pulse_wave[i] = i1 * Math.sin(d1 + 2* Math.PI * f1 * t) + i2 * Math.sin(d2 + 2* Math.PI * f2 * t);
}



function circle(pulse_wave,t=1){
    let d = `M0 ${pulse_wave[0]}`;
    let nb = 44100;
    let sample = 0;
    let sampley=0;
    for(let i=1; i < nb; i++){
        let p = 2* Math.PI * (i / nb);
        d +=`L${Math.sin(p*t)*pulse_wave[i]} ${Math.cos(p*t)* pulse_wave[i]}`;
        sample+=Math.sin(p*t)* pulse_wave[i];
        sampley+=Math.cos(p*t)* pulse_wave[i];
    }
    c.setAttribute("cx",sample / nb);
    c.setAttribute("cy",sampley /nb);

    path.setAttribute("d",d);
    return d;
}

let v = 0;

function update(add){
    v = Math.min(Math.max(v + add, 0), max_frequency);
    circle(pulse_wave, v);
    actuel.innerHTML = v + "HZ";
}
m100.addEventListener("click", update.bind(null, -100))
m10.addEventListener("click", update.bind(null, -10))
m1.addEventListener("click", update.bind(null, -1))

p100.addEventListener("click", update.bind(null, 100))
p10.addEventListener("click", update.bind(null, 10))
p1.addEventListener("click", update.bind(null, 1))

indication.innerHTML = `Les fréquences à trouvées sont <span class="frequences">${f1}HZ</span> et <span class="frequences">${f2}HZ</span>.`