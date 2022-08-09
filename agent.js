let previous;

class Agent{
    constructor(x=width/2 + GRID_SIZE/2, y= height/2 + GRID_SIZE/2){
        this.position = createVector(x, y);
        this.size = GRID_SIZE - 2;
    }

    run(){
        stroke(0);
        fill(255,255,0);
        circle(this.position.x, this.position.y, this.size);
        this.wander();
    }

    eat(f) {
        let food = f.getFood();
        // Are we touching any food objects?
        for (let i = food.length - 1; i >= 0; i--) {
          let foodLocation = food[i];
          let d = p5.Vector.dist(this.position, foodLocation);
          if (d < this.r/2) {
            food.splice(i, 1);
          }
        }
    }

    wander() {

        let qui = floor(random(0,4));

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
        }
    
    }


}