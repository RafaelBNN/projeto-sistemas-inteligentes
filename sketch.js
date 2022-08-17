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
}

function draw() {
  background(175); // limpa o background
  world.run();
}

