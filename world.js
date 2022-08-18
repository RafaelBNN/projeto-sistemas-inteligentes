class World {
  constructor(num) {
    this.food = new Food(2);
    this.agents = []; // An array for all creatures
    //this.agents.push(new Agent(createVector(0,0)));
    this.terrain = new Terrain();
    // let l = createVector(random(width), random(height));
    //let l = createVector(int(random(0, this.terrain.columns)), int(random(0, this.terrain.rows)));
    let l = createVector(10,10);
    this.agents.push(new Agent(l));
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
      b.run(this.terrain);
      b.eat(this.food);
    }
  }
  
  display() {
    this.terrain.draw_map();
  }
}