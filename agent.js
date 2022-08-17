let previous;
let totalWeight = 0;

class Agent{
    constructor(position){
        this.position = createVector(position.x * GRID_SIZE, position.y * GRID_SIZE);
        //this.position = position.copy();
        this.score = 0;
        this.size = GRID_SIZE - 2;
        this.health = 200; // Life timer
        this.maxspeed = 10;
        this.r = GRID_SIZE;
        this.ordem = 0;
    }

    run(terrain){
        switch(this.ordem % 10){
            case 0: this.dfs(); break;
            case 1: this.bfs(); break;
            case 2: this.astar(); break;
            case 3: this.greedy(); break;
            case 4: this.dijkstra(); break;
            case 5: this.astar(); break;
            case 6: this.greedy(); break;
            case 7: this.bfs(); break;
            case 8: this.dfs(); break;
            case 9: this.dijkstra(); break;
            default: 
        }
        this.update();
        this.display();
    }

    dfs(){
        let stack = [];
        let visited = [];
        let current = this.position;
        stack.push(current);
        visited.push(current);
        while(stack.length > 0){
            current = stack.pop();
            let neighbors = this.getNeighbors(current);
            for(let i = 0; i < neighbors.length; i++){
                if(!visited.includes(neighbors[i])){
                    stack.push(neighbors[i]);
                    visited.push(neighbors[i]);
                }
            }
        }
    }

    eat(f) {
        let food = f.getFood();
        // Are we touching any food objects?
        for (let i = food.length - 1; i >= 0; i--) {
          let foodLocation = food[i];
          let d = p5.Vector.dist(this.position, foodLocation);
          if (d < this.r/2) {
            this.health += 100;
            food.splice(i, 1);
            this.score += 1;
            this.ordem += 1;
            console.log("comeu!");
          }
        }
    }

    borders() {
        if (this.position.x < GRID_SIZE) this.position.x = width + GRID_SIZE/2;
        if (this.position.y < GRID_SIZE) this.position.y = height + GRID_SIZE/2;
        if (this.position.x > width + GRID_SIZE/2) this.position.x = GRID_SIZE;
        if (this.position.y > height + GRID_SIZE/2) this.position.y = GRID_SIZE;
    }

    update() {
        // Simple movement based on perlin noise
        let vx = map(1, 0, 1, -this.maxspeed, this.maxspeed);
        let vy = map(0.5, 0, 1, -this.maxspeed, this.maxspeed);
        let velocity = createVector(vx, vy);

        this.position.add(velocity);
        // Death always looming
        this.health -= 0.2;
    }

    display() {
        ellipseMode(CENTER);
        stroke(0, 255, 0);
        fill(255, 0, 0);
        // ellipse(this.position.x * GRID_SIZE + GRID_SIZE / 2, 
        //         this.position.y * GRID_SIZE + GRID_SIZE / 2, W);
        ellipse()
    }

    dead() {
        if (this.health < 0.0) {
            return true;
        } else {
            return false;
        }
    }

}