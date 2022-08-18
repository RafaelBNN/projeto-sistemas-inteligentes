let world;
let agent;

const width = 500;
const height = 400;
const GRID_SIZE = 20;

function setup() {
  createCanvas(width, height); // cria o canvas
  //generateMap(); // gera o grid do mapa
  //agent = new Agent(); // cria o agente
  world = new World(3);
  // let lista = [];
  // lista.push(3);
  // lista.push(4);
  // lista.push(5);
  // console.log(lista, lista.length);
  // for(let elemento of lista){
  //   console.log(elemento);
  // }
  // lista.shift();
  // for(let elemento of lista){
  //   console.log(elemento);
  // }
  // console.log(lista, lista.length);
  // lista.shift();
  // for(let elemento of lista){
  //   console.log(elemento);
  // }
  // console.log(lista, lista.length);
  // lista.shift();
  // for(let elemento of lista){
  //   console.log(elemento);
  // }
  // console.log(lista, lista.length);

}

function draw() {
  background(175); // limpa o background
  world.run();
}

