class Agent{
    constructor(x, y){
        this.position = createVector(x, y);
        this.size = 8;
    }

    run(){
        stroke(0);
        fill(255,255,0);
        circle(this.position.x, this.position.y, this.size);
    }
}