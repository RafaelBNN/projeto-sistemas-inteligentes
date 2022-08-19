let world;
let agent;

const width = 500;
const height = 400;
const GRID_SIZE = 20;

function setup() {

  createCanvas(width, height); // cria o canvas
  world = new World();

}

function draw() {

  background(175); // limpa o background
  world.run();
  
}

