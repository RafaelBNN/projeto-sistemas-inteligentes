let previous;
let totalWeight = 0;

class Agent{
    constructor(position=createVector(width/2, height/2)){
        this.position = createVector(position.x * GRID_SIZE, position.y * GRID_SIZE);
        //this.position = position.copy();
        this.score = 0;
        this.health = 200; // Life timer
        this.maxspeed = 10;
        this.r = GRID_SIZE;
    }

    run(terrain){
        this.update();
        // this.borders();
        this.display();
    }

    eat(f) {
        let food = f.getFood();
        // Are we touching any food objects?
        for (let i = food.length - 1; i >= 0; i--) {
          let foodLocation = food[i];
          let d = p5.Vector.dist(this.position, foodLocation);
          if (d < this.r/2) {
            this.health += 100;
            this.score+=1;
            food.splice(i, 1);
          }
        }
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

    // Wraparound
    borders() {
        if (this.position.x < -this.r / 2) this.position.x = width + this.r / 2;
        if (this.position.y < -this.r / 2) this.position.y = height + this.r / 2;
        if (this.position.x > width + this.r / 2) this.position.x = -this.r / 2;
        if (this.position.y > height + this.r / 2) this.position.y = -this.r / 2;
    }

    // Method to display
    display() {
        ellipseMode(CENTER);
        stroke(0, this.health);
        fill(0, this.health);
        ellipse(this.position.x * GRID_SIZE + GRID_SIZE / 2, 
                this.position.y * GRID_SIZE + GRID_SIZE / 2, 
                W);
    }

    // Death
    dead() {
        if (this.health < 0.0) {
            return true;
        } else {
            return false;
        }
    }

    wander(board) {

        let qui = floor(random(0,15));

        if (qui === 0 && previous != 1) {
            this.position = createVector(this.position.x - GRID_SIZE, this.position.y);
        } else if (qui === 1 && previous != 0) {
            this.position = createVector(this.position.x + GRID_SIZE, this.position.y);
        } else if (qui === 2 && previous != 3){
            this.position = createVector(this.position.x, this.position.y - GRID_SIZE);
        } else if (qui === 3 && previous != 2){
            this.position = createVector(this.position.x, this.position.y + GRID_SIZE);
        } 

        if(qui < 4){
            previous = qui;
            switch(board[floor(this.position.x/GRID_SIZE)][floor(this.position.y/GRID_SIZE)]){
                case 0: totalWeight+=2; break; // se for agua
                case 1: totalWeight+=1; break; // se for areia
                case 2: totalWeight+=0; break; // se for lama
                case 3: totalWeight+=1000; break; // se for obstavulo
            }
            console.log("Peso total: " + totalWeight);
        }
    
    }

}