class World {
  constructor(num) {
    this.food = new Food(num);
    this.agents = []; // An array for all creatures
    //this.agents.push(new Bloop(createVector(0,0)));
    this.agents.push(new Agent());
    this.terrain = new Terrain();
    this.terrain.generateTerrain();
  }  
    // Run the world
  run() {
    this.display();
    this.update();
  }
  
  update() {
    // Deal with food
    this.food.run();

    // Cycle through the ArrayList backwards b/c we are deleting
    for (let i = this.agents.length - 1; i >= 0; i--) {
      // All bloops run and eat
      let b = this.agents[i];
      b.run(this.food.food);
      b.eat(this.food);
    }
  }
  
  display() {
    this.terrain.draw_map();
    strokeWeight(1);
    stroke(127,127,127,127);
    for (let i = 0; i < width; i = i + GRID_SIZE) {
      line(i, 0, i, height);
    }
    for (let j = 0; j < height; j = j + GRID_SIZE) {
      line(0, j,width, j);
    }
  }
  }