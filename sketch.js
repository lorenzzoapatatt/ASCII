const density = "Ñ@#W$9876543210?!abc;:+=-,._        ";
//255-Ñ e 0- espaço isso significa a coloração da imagem sendo 255 escuro e 0 claro
//usei a library p5.js para pegar o canva

let img;
let input;

function setup() {
  noCanvas();
  //não criei o canva pq estou renderizando como texto ascii na tela

  input = createFileInput(handleFile);
  input.position(10, 10);
  //input para selecionar imagem
}

function handleFile(file) {
  if (file.type === "image") {
    img = loadImage(file.data, imageReady);
    //carrega a imagem quando ela for selecionada
  } else {
    console.log("Arquivo não é uma imagem!");
    //verifica se é uma imagem
  }
}

function imageReady() {
  img.loadPixels();
  //carrego os pixels da imagem

  const scale = 6;
  //defini uma escala para diminuir a resolução e não lotar a tela

  //limpa qualquer resultado anterior
  selectAll("div").forEach((e) => e.remove());

  // a imagem tem um bloquinho associado a toda ela como se fosse um array e cada bloquinho tem 4 numeros acossiado a ele RGBA
  for (let j = 0; j < img.height; j += scale) {
    let row = "";
    for (let i = 0; i < img.width; i += scale) {
      const pixelIndex = (i + j * img.width) * 4;
      //coluna + linha * tamanho da imagem * 4

      const r = img.pixels[pixelIndex + 0];
      //red
      const g = img.pixels[pixelIndex + 1];
      //green
      const b = img.pixels[pixelIndex + 2];
      //blue

      const avg = (r + g + b) / 3;
      //media

      const charIndex = floor(map(avg, 0, 255, density.length - 1, 0));
      //mapeando a media de 0 a 255 pro tamanho da string density, invertendo (255 mais escuro, 0 mais claro)

      const c = density.charAt(charIndex);
      //pega o caractere correspondente no density

      if (c == " ") row += "&nbsp;";
      //se for espaço adiciona espaço não quebrável no html
      else row += c;
      //senao adiciona o caractere
    }
    createDiv(row);
    //cria uma div pro resultado de cada linha
  }
}
