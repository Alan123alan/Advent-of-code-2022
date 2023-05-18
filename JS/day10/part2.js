const { clear } = require("console");
const fs = require("fs");

const inputs = fs.readFileSync("./js/day10/input.txt", {encoding:"utf-8"});
const CRTRow = ".".repeat(40);
const CRTRow1 = CRTRow.split("")
const CRT = [CRTRow.split(""), CRTRow.split(""), CRTRow.split(""), CRTRow.split(""), CRTRow.split(""), CRTRow.split("")]

const sprite = "#";
let cycle = 0;
let registerX = 1;
const instructions = inputs.split("\n").map((instruction)=>{
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
        analysis.push({registerX, cycle});
    }else{
        cycle++;    
        analysis.push({registerX, cycle});
        cycle++;    
        analysis.push({registerX, cycle});
        registerX += instruction;
    }
}

const setRow = (cycle)=>{
    if(cycle >=1 && cycle <=40){
        return 0
    }else if(cycle >=41 && cycle <=80){
        return 1
    }else if(cycle >=81 && cycle <=120){
        return 2
    }else if(cycle >=121 && cycle <=160){
        return 3
    }else if(cycle >=161 && cycle <=200){
        return 4
    }else if(cycle >=201 && cycle <=240){
        return 5
    }
};

const calculateCycle = (cycle)=>{
    if(cycle >=1 && cycle <=40){
        return cycle
    }else if(cycle >=41 && cycle <=80){
        return cycle-40
    }else if(cycle >=81 && cycle <=120){
        return cycle-80
    }else if(cycle >=121 && cycle <=160){
        return cycle-120
    }else if(cycle >=161 && cycle <=200){
        return cycle-160
    }else if(cycle >=201 && cycle <=240){
        return cycle-200
    }
};

const groups = analysis.reduce((groups, item) => ({
    ...groups,
    [setRow(item.cycle)]: [...(groups[setRow(item.cycle)] || []), {...item, row:setRow(item.cycle), cycle:calculateCycle(item.cycle)}]
  }), {});

// console.log(groups)
// console.log(Object.keys(groups))

// for(const key of Object.keys(groups)){
//     for(let i=0; i<CRT.length; i++){
//         for (const group of groups[key].filter(item=>item.row==i)){
//             const {registerX, cycle, row} = group;
//             console.log(registerX, cycle, row);
//             if(cycle == registerX || cycle-1 == registerX || cycle+1 == registerX){
//                 CRT[row][cycle-1] = "#"
//             }
//         }
//     }
// }

// for (let row=0; row<CRT.length; row++){
//     groups[row].map((item)=>{
//         const {registerX, cycle, row} = item;
//         console.log(registerX, cycle, row);
//         if(cycle == registerX || cycle-1 == registerX || cycle+1 == registerX){
//             CRT[row][cycle-1] = "#"
//         }
//     });
// }
for(let i=0; i<CRT.length; i++){
    groups[i].map((item)=>{
        let {registerX, cycle, row} = item;
        // cycle = cycle + 1;
        console.log(registerX, cycle, row);
        if(cycle-1 == registerX-1){
            CRT[row][registerX-1] = "#"
        }else if(cycle-1 == registerX){
            CRT[row][registerX] = "#"
        }else if(cycle-1 == registerX+1){
            CRT[row][registerX+1] = "#"
        }
    });
}

// for(const result of analysis){
//     const {registerX, cycle} = result;
//     if(cycle >=1 && cycle <=40){
//         for(let i=registerX-1; i<=registerX+1; i++){
            
//         }
//         CRT[0].splice(registerX-1,1,sprite)
//         CRT[0].splice(registerX,1,sprite)
//         CRT[0].splice(registerX+1,1,sprite)
//     }
//     // }else if(cycle >=41 && cycle <=80){
//     //     CRT[1].splice(registerX-1,3,sprite)
//     // }else if(cycle >=81 && cycle <=120){
//     //     CRT[2].splice(registerX-1,3,sprite)
//     // }else if(cycle >=121 && cycle <=160){
//     //     CRT[3].splice(registerX,1,sprite)
//     // }else if(cycle >=161 && cycle <=200){
//     //     CRT[4].splice(registerX,1,sprite)
//     // }else if(cycle >=201 && cycle <=240){
//     //     CRT[5].splice(registerX,1,sprite)
//     // }
// }
// console.log(CRTRow.split("").length)
// console.log(analysis)
console.log(CRT[0].join(""));
console.log(CRT[1].join(""));
console.log(CRT[2].join(""));
console.log(CRT[3].join(""));
console.log(CRT[4].join(""));
console.log(CRT[5].join(""));