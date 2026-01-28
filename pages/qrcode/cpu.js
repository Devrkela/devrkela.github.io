import QRCodeMessage from "./module/message.js";

const gl = canvas.getContext("2d", {willReadFrequently:true});

const qrcode = new QRCodeMessage("http://localhost:3000/pages/qrcode/", "L");

function show(buffer){

  canvas.width = Math.sqrt(buffer.length);
  canvas.height = canvas.width;

  gl.rect(0,0,canvas.width,canvas.height);
  gl.fillStyle = "black";
  gl.fill();

  const imageData = gl.getImageData(0, 0, canvas.width, canvas.height);

  for(let i = 0; i < buffer.length; i++){
    let opacity = buffer[i];

    if(opacity === undefined){
      opacity = 0.5;
    }
    imageData.data[i * 4 + 3] *= opacity;
  }

  gl.putImageData(imageData, 0, 0);
}

function generate(){
  const text = message.value;

  if(text){
    const qrcode = new QRCodeMessage(text, "L");
    show(qrcode.getData());
  }
}

generate_button.addEventListener("click", generate);
show(qrcode.getData())