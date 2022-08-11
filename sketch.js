let world;
let agent;

const width = 1000;
const height = 800;
const GRID_SIZE = 20;

function setup() {
  createCanvas(width, height); // cria o canvas
  generateMap(); // gera o grid do mapa
  agent = new Agent(); // cria o agente
  world = new World(3);
}

function draw() {
  background(175); // limpa o background
  generateMap(); // gera o grid do mapa
  world.run();
  //agent.run();
}

function generateMap(){

  rectMode(CORNER);

  for (let i = 0; i < width; i+=GRID_SIZE) {
    for (let j = 0; j < height; j+=GRID_SIZE) {
      stroke(0);
      fill(175);
      rect(i, j, GRID_SIZE, GRID_SIZE);
    }
  }
}
