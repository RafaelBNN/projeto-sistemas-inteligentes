let previous;
let totalWeight = 0;

class Agent{
    constructor(discretePosition){
        this.position = createVector(discretePosition.x * GRID_SIZE, discretePosition.y * GRID_SIZE);
        //this.position = position.copy();
        this.score = 0;
        this.size = GRID_SIZE - 2;
        this.health = 200; // Life timer
        this.maxspeed = 10;
        this.r = GRID_SIZE;
        this.ordem = 0;
        this.goal = null;
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
            //console.log("Placar agente grupo 2: " + this.score);
          }
        }
    }

    borders() {
        if (this.position.x < GRID_SIZE) this.position.x = width + GRID_SIZE/2;
        if (this.position.y < GRID_SIZE) this.position.y = height + GRID_SIZE/2;
        if (this.position.x > width + GRID_SIZE/2) this.position.x = GRID_SIZE;
        if (this.position.y > height + GRID_SIZE/2) this.position.y = GRID_SIZE;
    }

    update(terrain) {

        this.bfs(terrain);

        // // Simple movement based on perlin noise
        // let vx = map(1, 0, 1, -this.maxspeed, this.maxspeed);
        // let vy = map(0.5, 0, 1, -this.maxspeed, this.maxspeed);
        // let velocity = createVector(vx, vy);

        // this.position.add(velocity);
        // // Death always looming
        // this.health -= 0.2;
    }

    display() {
        stroke(0);
        fill(255, 255, 0);
        circle(this.position.x, this.position.y, this.size);
    }

    dead() {
        if (this.health < 0.0) {
            //console.log("Agente grupo 2 morreu :(");
            return true;
        } else {
            return false;
        }
    }

    bfs(terrain){
        let queue = [];
        let visited = [];
        let discretePosition = createVector(floor(this.position.x/GRID_SIZE), floor(this.position.y/GRID_SIZE));
        let current = discretePosition.copy(); // iniciamos com a posicao de grid atual
        queue.push(current);
        visited.push(current);
        while(queue.length > 0){
            current = queue.shift(); // tira o primeiro elemento da fila
            let neighbors = this.getNeighbors(current); // pegamos os vizinhos do ponto atual
            for(let i = 0; i < neighbors.length; i++){
                if(!visited.includes(neighbors[i])){
                    queue.push(neighbors[i]);
                    visited.push(neighbors[i]);
                    terrain.board[neighbors[i].x][neighbors[i].y] = VISITED;
                }
            }
        }
    }

    dfs(terrain){
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

    greedy(terrain){
        let neighbors = this.getNeighbors(this.position);
        let best = null;
        let bestScore = 0;
        for(let i = 0; i < neighbors.length; i++){
            let score = this.getScore(neighbors[i]);
            if(score > bestScore){
                best = neighbors[i];
                bestScore = score;
            }
        }
        this.goal = best;
    }

    dijkstra(terrain){
        let visited = [];
        let current = this.position;
        let queue = [];
        queue.push(current);
        visited.push(current);
        while(queue.length > 0){
            current = queue.shift();
            let neighbors = this.getNeighbors(current);
            for(let i = 0; i < neighbors.length; i++){
                if(!visited.includes(neighbors[i])){
                    queue.push(neighbors[i]);
                    visited.push(neighbors[i]);
                }
            }
        }
    }

    astar(terrain){
        let openSet = [];
        let closedSet = [];
        let current = this.position;
        let gScore = {};
        let fScore = {};
        gScore[current] = 0;
        fScore[current] = this.getScore(current);
        openSet.push(current);
        while(openSet.length > 0){
            current = this.getLowestScore(openSet, fScore);
            if(current == this.goal){
                console.log("Agente grupo 2: encontrou o objetivo");
                return;
            }
            openSet.splice(openSet.indexOf(current), 1);
            closedSet.push(current);
            let neighbors = this.getNeighbors(current);
            for(let i = 0; i < neighbors.length; i++){
                if(closedSet.includes(neighbors[i])){
                    continue;
                }
                let tentative_gScore = gScore[current] + this.getScore(neighbors[i]);
                if(!openSet.includes(neighbors[i]) || tentative_gScore < gScore[neighbors[i]]){
                    gScore[neighbors[i]] = tentative_gScore;
                    fScore[neighbors[i]] = gScore[neighbors[i]] + this.getScore(neighbors[i]);
                    if(!openSet.includes(neighbors[i])){
                        openSet.push(neighbors[i]);
                    }
                }
            }
        }
    }

    getNeighbors(current){
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

}