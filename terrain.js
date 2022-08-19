// Adapted from https://github.com/vcnovaes/SearchAlgorithmsAnimation

const WATER = 3;
const SAND = 1;
const MUD = 2;
const OBSTACLE = 10;
const PLAYER = 4;
const FOOD = 5;
const VISITED = 6;
const VISITED_SAND = 7;
const VISITED_MUD = 9;
const VISITED_WATER = 8;

const color = new Array(10);
color[SAND] = [230, 197, 37];
color[MUD] = [92, 51, 18];
color[WATER] = [95, 116, 222];
color[OBSTACLE] = [50, 50, 50];
color[PLAYER] = [84, 191, 113];
color[FOOD] = [191, 84, 130];
color[VISITED] = [25, 25, 25];
color[VISITED_SAND] = [200, 167, 7];
color[VISITED_MUD] = [72, 31, 0];
color[VISITED_WATER] = [75, 96, 202];

class Terrain {
  constructor() {
    this.columns = floor(width / GRID_SIZE);
    this.rows = floor(height / GRID_SIZE);
    this.board = new Array(this.columns);
    for (let i = 0; i < this.columns; i++) {
      this.board[i] = new Array(this.rows);
    }
  }

  draw_map() {
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.draw_ij(i, j);
      }
    }
  }

  draw_ij(i, j) {
    rectMode(CORNER);
    let c = color[this.board[i][j]];
    fill(c[0], c[1], c[2]);
    stroke(127,127,127,127);
    strokeWeight(0.5);
    rect(i * GRID_SIZE, j * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    fill(0);
  }

  generateTerrain() {
    const noise_scale = 20.0;
    const iterations = 1;

    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        let noise_val = noise(i / noise_scale, j / noise_scale, iterations);
        const chanceObstacle = random();
        if (noise_val < 0.3) {
          this.board[i][j] = WATER;
        }
        else if (noise_val < 0.4) {
          this.board[i][j] = MUD;
        }
        else if (noise_val < 0.80) {
            this.board[i][j] = SAND;
        }
        else{
          this.board[i][j] = OBSTACLE;
        }
      }
    }
  }
}
