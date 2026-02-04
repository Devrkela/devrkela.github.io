import QRCodeMessage from "./module/message.js";

const gl = canvas.getContext("2d");

const qrcode = new QRCodeMessage("http://localhost:3000/pages/qrcode/", "H");

function show(buffer){

  canvas.width = Math.sqrt(buffer.length);
  canvas.height = canvas.width;

  

  for(let y = 0; y < canvas.height; y++){
    for(let x = 0; x < canvas.width; x++){
      const bit = buffer[x + y * canvas.width];

      if(bit){
        gl.rect(x, y, 1, 1);
        gl.fill();
      }
    }
  }

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