console.log("Hello World!");

let world;
let agent;

const width = 1000;
const height = 800;

function setup() {
  createCanvas(width, height); // cria o canvas
  generateMap(); // gera o grid do mapa
  agent = new Agent(25, 25); // cria o agente
  world = new World(20);
}

function draw() {
  background(175); // limpa o background
  generateMap(); // gera o grid do mapa
  world.run();
  agent.run();
}

function generateMap(){

  for (let i = 5; i < width; i+=10) {
    for (let j = 5; j < height; j+=10) {
      stroke(0);
      fill(175);
      rect(i, j, 10, 10);
    }
  }
}

function keyPressed() {

  if (keyCode === LEFT_ARROW) {

    agent.position = createVector(agent.position.x - 10, agent.position.y);

  } else if (keyCode === RIGHT_ARROW) {

    agent.position = createVector(agent.position.x + 10, agent.position.y);

  } else if (keyCode === UP_ARROW){

    agent.position = createVector(agent.position.x, agent.position.y - 10);

  } else if (keyCode === DOWN_ARROW){

    agent.position = createVector(agent.position.x, agent.position.y + 10);

  } 

}