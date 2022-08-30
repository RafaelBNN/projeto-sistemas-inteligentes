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
        this.startAlgorithm = true;
        this.currentFrontier=[createVector(floor(this.position.x/GRID_SIZE), floor(this.position.y/GRID_SIZE))];
        this.visited = [];
        this.horaInicial = 0;
        this.came_from = {};
        this.path = [];
        this.comeuFlag = false;
        this.comida = 0;
        this.initialBoard = null;
        this.flag = true;
        this.hasFoodinRadar = true;
    }

    run(terrain){
        if(this.flag){
            //this.initialBoard = [...terrain.board];
            this.initialBoard = terrain.board.map(row => [...row]);
            this.flag = false;
        }
        
        this.update(terrain);
        this.display();
        this.borders();
    }

    bfsOnce(terrain){
        let frontier = [...this.currentFrontier];

        for(let pixel of frontier){
            terrain.board[pixel.x][pixel.y] = VISITED; 
        }

        for(let pixel of frontier){
                
            let vizinhos = this.getNeighbors(pixel); // vizinhos recebe a lista de vetores com os vizinhos
            this.currentFrontier.shift();
            for(let vizinho of vizinhos){
                if(terrain.board[vizinho.x][vizinho.y]!=OBSTACLE){
                    if(!this.visited.find(item => item.x===vizinho.x && item.y===vizinho.y)){
                        switch(terrain.board[vizinho.x][vizinho.y]){
                            case SAND: terrain.board[vizinho.x][vizinho.y] = VISITED_SAND; break;
                            case WATER: terrain.board[vizinho.x][vizinho.y] = VISITED_WATER; break;
                            case MUD: terrain.board[vizinho.x][vizinho.y] = VISITED_MUD; break;
                        }
                        this.currentFrontier.push(vizinho);
                        this.visited.push(vizinho); // dizemos que esse vizinho ja foi pintado
                        this.came_from[vizinho.x + "," + vizinho.y] = pixel.x + "," + pixel.y; // dizemos que esse vizinho veio do pixel atual
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
        }
        if(x < width/GRID_SIZE - 1){
            neighbors.push(createVector(x+1, y));
        }
        if(y > 0){
            neighbors.push(createVector(x, y-1));
        }
        if(y < height/GRID_SIZE - 1){
            neighbors.push(createVector(x, y+1));
        }
        return neighbors;
    }

    eat(f, t) {
        let food = f.getFood(); // food eh a lista de todas as comidas

        for (let i = food.length - 1; i >= 0; i--) {
            if(this.hasFoodinRadar && this.visited.find(item => item.x===food[i].x/GRID_SIZE && item.y===food[i].y/GRID_SIZE)){
                this.comida = i;
                t.generateTerrain();
            
                this.path = [];
                let current = food[i].x/GRID_SIZE + "," + food[i].y/GRID_SIZE;
                // console.log("Food: " + food[i].x + "," + food[i].y);
                // console.log(this.came_from[current]);

                while(current != this.position.x/GRID_SIZE + "," + this.position.y/GRID_SIZE){
                    if (this.path.size > 1000) {
                        break;
                    }
                    console.log("Current: " + current);
                    console.log(this.position.x + "," + this.position.y);
                    console.log(this.path);
                    this.path.push(current);
                    current = this.came_from[current];
                }

                this.path.push(this.position.x/GRID_SIZE + "," + this.position.y/GRID_SIZE);

                this.path.reverse();

                console.log("Path: " + this.path);

                this.hasFoodinRadar = false;

            }

        }

        if(this.comeuFlag){
            this.path.shift();
            food.splice(this.comida, 1);
            this.comeuFlag = false;
            this.hasFoodinRadar = true;
        }
        
    }

    borders() {
        if (this.position.x < GRID_SIZE) this.position.x = width + GRID_SIZE/2;
        if (this.position.y < GRID_SIZE) this.position.y = height + GRID_SIZE/2;
        if (this.position.x > width + GRID_SIZE/2) this.position.x = 0;
        if (this.position.y > height + GRID_SIZE/2) this.position.y = 0;
    }

    update(terrain) {

        if(this.startAlgorithm && this.path.length == 0){
            this.bfsOnce(terrain);
            this.startAlgorithm = false;
            //console.log("Primeira execução");
        }
        
        let horaAtual = millis();
        //console.log("Hora atual: " + horaAtual);

        if(horaAtual - this.horaInicial > 250.0 && this.path.length == 0){
            this.bfsOnce(terrain);
            //console.log("Segunda execução");
            this.horaInicial = horaAtual;
        }

        if(this.path.length > 0 && (horaAtual - this.horaInicial > (40*terrain.board[this.position.x/GRID_SIZE][this.position.y/GRID_SIZE]))){
            //this.path.shift();
            let next = this.path.shift();
            this.position = createVector(next.split(",")[0]*GRID_SIZE, next.split(",")[1]*GRID_SIZE);
            this.horaInicial = horaAtual;
            if(this.path.length==0){
                this.comeuFlag = true;
                terrain.board = this.initialBoard; // reseta o board
                this.startAlgorithm = true;
                this.currentFrontier = [createVector(floor(this.position.x/GRID_SIZE), floor(this.position.y/GRID_SIZE))];
                this.visited = [];
                this.came_from = {};
            }
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