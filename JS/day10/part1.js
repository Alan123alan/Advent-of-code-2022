const fs = require("fs");

const input = fs.readFileSync("./js/day10/input.txt", {encoding:"utf-8"});

let cycle = 0;
let registerX = 1;
const instructions = input.split("\n").map((instruction)=>{
    if(instruction.split(" ").length>1){
        const [addx, value] = instruction.split(" ");
        return parseInt(value)       
    }else{
        return 0
    }
});

const analysis = [];
for(const instruction of instructions){
    if(!instruction){
        cycle++;
        analysis.push(registerX);
    }else{
        cycle++;    
        analysis.push(registerX);
        cycle++;    
        analysis.push(registerX);
        registerX += instruction;
    }
}

const results = []
for(let i=0; i<analysis.length; i++){
    results.push(analysis[i]*(i+1))
}
// const results = analysis.map((val, index)=>val*(index+1))
console.log(results
    .filter((val,index)=>((index+1)==20||((index+1)-20)%40==0))
    .reduce((acc,val)=>acc+val, 0)
    );