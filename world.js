class World {
  constructor() {
    this.food = new Food(2);
    this.agents = []; // An array for all creatures
    this.terrain = new Terrain();
    let l = createVector(12,10);
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
    //for (let i = this.agents.length - 1; i >= 0; i--) {
      // All bloops run and eat
    let b = this.agents[0];
    b.run(this.terrain);
    b.eat(this.food);
    //}
  }
  
  display() {
    this.terrain.draw_map();
  }
}