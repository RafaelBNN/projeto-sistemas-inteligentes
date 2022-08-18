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
        this.goal = null;
        this.debugFlag = true;
    }

    run(terrain){
        if(this.goal != null){
            // switch(this.ordem % 10){
            //     case 0: this.dfs(); break;
            //     case 1: this.bfs(); break;
            //     case 2: this.astar(); break;
            //     case 3: this.greedy(); break;
            //     case 4: this.dijkstra(); break;
            //     case 5: this.astar(); break;
            //     case 6: this.greedy(); break;
            //     case 7: this.bfs(); break;
            //     case 8: this.dfs(); break;
            //     case 9: this.dijkstra(); break;
            //     default: 
            // }
        }
        else{
            this.update(terrain);
            this.display();
            this.borders();
        }
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

    bfs(terrain){

        let discretePosition = createVector(floor(this.position.x/GRID_SIZE), floor(this.position.y/GRID_SIZE));
        //let current = discretePosition.copy(); // iniciamos com a posicao de grid atual
        
        let frontier = [];
        frontier.push(discretePosition);
        console.log(frontier); //debug

        let reached = [];
        console.log(reached); //debug
        reached.push(discretePosition);
        console.log(reached); //debug

        terrain.board[discretePosition.x][discretePosition.y] = VISITED;

        while(frontier.length > 0){

            let current = frontier.shift(); // avanca a fila, tirando o primeiro elemento
            let neighbors = this.getNeighbors(current); // retorna uma lista de vetores com os vizinhos
            
            for(let i = 0; i < neighbors.length; i++){
                if(!reached.includes(neighbors[i])){
                    terrain.board[neighbors[i].x][neighbors[i].y] = VISITED; // pintando o quadrado (depois podemos colocar a cor dependendo do tipo de quadrado)
                    console.log("Pintou o quadrado " + neighbors[i]);
                    //frontier.push(neighbors[i]); // esse vizinho agora esta na fronteira
                    reached.push(neighbors[i]); // dizemos que esse vizinho ja foi pintado
                    console.log(reached);
                }
            }

        }
    }

    // bfs(terrain){
    //     let discretePosition = createVector(floor(this.position.x/GRID_SIZE), floor(this.position.y/GRID_SIZE));
    //     let current = discretePosition.copy(); // iniciamos com a posicao de grid atual

    //     let frontier = new Queue();
    //     frontier.enqueue(current);

    //     for(let i=0;i<frontier.length;i++){

    //     }
    // }

    getNeighbors(current){ //retorna lista de vetores com as coordenadas discretas dos vizinhos
        let neighbors = [];
        let x = current.x;
        let y = current.y;
        if(x > 0){
            neighbors.push(createVector(x-1, y));
            //neighbors.push(terrain.board[x-1][y]);
        }
        if(x < width/GRID_SIZE - 1){
            neighbors.push(createVector(x+1, y));
            //neighbors.push(terrain.board[x+1][y]);
        }
        if(y > 0){
            neighbors.push(createVector(x, y-1));
            //neighbors.push(terrain.board[x][y-1]);
        }
        if(y < height/GRID_SIZE - 1){
            neighbors.push(createVector(x, y+1));
            //neighbors.push(terrain.board[x][y+1]);
        }
        return neighbors;
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
        if (this.position.x > width + GRID_SIZE/2) this.position.x = 0;
        if (this.position.y > height + GRID_SIZE/2) this.position.y = 0;
    }

    update(terrain) {
        // //Simple movement based on perlin noise
        // let vx = map(1, 0, 1, -this.maxspeed, this.maxspeed);
        // let vy = map(0.5, 0, 1, -this.maxspeed, this.maxspeed);
        // let velocity = createVector(vx, vy);

        // this.position.add(velocity);
        // // Death always looming
        // this.health -= 0.2;

        if(this.debugFlag){
            this.bfs(terrain);
            this.debugFlag = false;
        }

    }

    display() {
        stroke(0);
        fill(255, 255, 0);
        circle(this.position.x + GRID_SIZE/2, this.position.y + GRID_SIZE/2, this.size);
    }

    dead() {
        if (this.health < 0.0) {
            return true;
        } else {
            return false;
        }
    }

}

class Queue {
    constructor() {
      this.elements = {};
      this.head = 0;
      this.tail = 0;
    }
    enqueue(element) {
      this.elements[this.tail] = element;
      this.tail++;
    }
    dequeue() {
      const item = this.elements[this.head];
      delete this.elements[this.head];
      this.head++;
      return item;
    }
    peek() {
      return this.elements[this.head];
    }
    get length() {
      return this.tail - this.head;
    }
    get isEmpty() {
      return this.length === 0;
    }
  }