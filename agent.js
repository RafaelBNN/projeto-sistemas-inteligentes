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
        this.ordem = [];
        this.goal = null;
        this.debugFlag = true;
        this.currentFrontier=[createVector(floor(this.position.x/GRID_SIZE), floor(this.position.y/GRID_SIZE))];
        this.visited = [];
        this.horaInicial = 0;
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

    bfsOnce(terrain){
        let frontier = [...this.currentFrontier];
        for(let pixel of frontier){
            let vizinhos = this.getNeighbors(pixel); // vizinhos recebe a lista de vetores com os vizinhos
            this.currentFrontier.shift();
            for(let vizinho of vizinhos){
                if(terrain.board[vizinho.x][vizinho.y]!=OBSTACLE){
                    if(!this.visited.find(item => item.x===vizinho.x && item.y===vizinho.y)){
                        terrain.board[vizinho.x][vizinho.y] = VISITED; // pintando o quadrado (depois podemos colocar a cor dependendo do tipo de quadrado)
                        console.log("Pintou o quadrado " + vizinho);
                        this.currentFrontier.push(vizinho);
                        this.visited.push(vizinho); // dizemos que esse vizinho ja foi pintado
                    }
                }
            }
        }
    }

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
            console.log("Placar do agente grupo 2: " + this.score);
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

        // this.bfsOnce(terrain);

        // const aux = await this.delay(1000000);
        // console.log("Esperando");

        // this.bfsOnce(terrain);

        if(this.debugFlag){
            this.bfsOnce(terrain);
            this.debugFlag = false;
            console.log("Primeira execução");
        }
        
        let horaAtual = millis();
        console.log("Hora atual: " + horaAtual);

        if(horaAtual - this.horaInicial > 3000.0){
            this.bfsOnce(terrain);
            console.log("Segunda execução");
            this.horaInicial = horaAtual;
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

    delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

}