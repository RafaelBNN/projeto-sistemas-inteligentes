let previous;
let totalWeight = 0;

class Agent{
    constructor(x=width/2, y= height/2){
        this.position = createVector(x + GRID_SIZE/2, y + GRID_SIZE/2);
        this.size = GRID_SIZE - 2;
        this.r = this.size;
    }

    run(food, board){
        stroke(0);
        fill(255,255,0);
        circle(this.position.x, this.position.y, this.size);
        this.wander(board);
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

    wander(board) {

        let qui = floor(random(0,5));

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

    borders() {
        if (this.position.x < GRID_SIZE) this.position.x = width + GRID_SIZE/2;
        if (this.position.y < GRID_SIZE) this.position.y = height + GRID_SIZE/2;
        if (this.position.x > width + GRID_SIZE/2) this.position.x = GRID_SIZE;
        if (this.position.y > height + GRID_SIZE/2) this.position.y = GRID_SIZE;
      }

}