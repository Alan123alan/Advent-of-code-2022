const fs = require('fs');

const ELEVATIONS = 'abcdefghijklmnopqrstuvwxyz';

const START = 'S';

const END = 'E';

//up,down,left,right
const directions = [
    [-1, 0],//row, col
    [1, 0],//row, col
    [0, -1],//row, col
    [0, 1]//row, col
];

type Point = {
    row: number,
    col: number
};

const bfs = (graph: number[][], start:number, end:number): number[] | null=>{
    const seen: boolean[] = new Array(graph.length).fill(false);
    const parent: number[] = new Array(graph.length).fill(-1);

    seen[start] = true;
    const queue: number[] = [start];

    do {
        const curr = queue.shift() as number;
        if(curr === end){
            break;
        }
        seen[curr] = true;
        const adjacents = graph[curr];
        for(let i = 0; i < adjacents.length; i++){
            if(adjacents[i] === 0){
                continue;
            }
            if(seen[i]){
                continue;
            }   
            seen[i] = true;
            parent[i] = curr;
            queue.push(i);
        }
        
    } while (queue.length);

    if(parent[end] === -1){
        return [];
    }

    let curr = end;
    const out: number[] = [];

    while(parent[curr] !== -1){
        out.push(curr);
        curr = parent[curr];
    }
    return [start, ...out.reverse()]

};

const confirmAdjancency = (currentNode:Point, compareNode:Point, maze:number[][])=>{
    for(const direction of directions){
        const [rowMove, colMove] = direction;
        const tempNode = {row: currentNode.row+rowMove, col:currentNode.col+colMove}
        const step = maze[compareNode.row][compareNode.col] - maze [currentNode.row][currentNode.col];
        if(compareNode.row == tempNode.row && compareNode.col == tempNode.col && step <= 1){
            return true;
        }
    }
    return false;
};

let start:Point = {row:0, col:0};
let goal: Point= {row:0, col:0};

const sample:number[][] = fs.readFileSync('./js/day12/input.txt', {encoding:'utf-8'}).split('\n').map(row=>row.split("")).map((row,i)=>row.map((cell,j)=>{
    if(cell == START){
        start = {row:i, col:j}
        return ELEVATIONS.indexOf('a');
    }else if(cell == END){
        goal = {row:i, col:j};
        return ELEVATIONS.indexOf('z');
    }else{
        return ELEVATIONS.indexOf(cell);
    }
}));

console.log(sample);
console.log(start);
console.log(goal);



//create a map between node 0...39 to the coordinates in the matrix
//for easier traversal

let nodesMap = {};
let nodeIndex = 0;
for(let i = 0; i < sample.length; i++){
    for(let j = 0; j < sample[0].length; j++){
        nodesMap[nodeIndex] = {row:i, col:j};
        nodeIndex++;
    }
}

const nodePoints:Point[] = Object.values(nodesMap);
const nodes = Object.keys(nodesMap);

let startNodeIndex = 0;
for(let i = 0; i < nodePoints.length; i++){
    if(nodePoints[i].row == start.row && nodePoints[i].col == start.col){
        startNodeIndex = i;
        break;
    }
};

let goalNodeIndex = 0;
for(let i = 0; i < nodePoints.length; i++){
    if(nodePoints[i].row == goal.row && nodePoints[i].col == goal.col){
        goalNodeIndex = i;
        break;
    }
};

console.log(nodes[startNodeIndex]);
console.log(nodePoints[nodes[startNodeIndex]]);

console.log(nodes[goalNodeIndex]);
console.log(nodePoints[nodes[goalNodeIndex]]);

const adjacencyMatrix: number[][] = [];
for(let i = 0; i < sample.length*sample[0].length; i++){
    adjacencyMatrix.push(new Array(sample.length*sample[0].length).fill(0));
}

//how to create the adjacency matrix
//iterate through each cell of the empty adjacency matrix
for(let i = 0; i < sample.length*sample[0].length; i++){
    const currentNode = nodesMap[i];
    for(let j = 0; j < sample.length*sample[0].length; j++){
        const compareNode = nodesMap[j];
        if(currentNode.row == compareNode.row && currentNode.col == compareNode.col){
            adjacencyMatrix[i][j] = 0;
        }else{
            if(confirmAdjancency(currentNode, compareNode, sample)){
                adjacencyMatrix[i][j] = 1;
            }else{
                adjacencyMatrix[i][j] = 0;
            }

        }
        
    }
}
// console.log(adjacencyMatrix);
const path = bfs(adjacencyMatrix,startNodeIndex,goalNodeIndex); 
console.log(path);
console.log(path?.length);