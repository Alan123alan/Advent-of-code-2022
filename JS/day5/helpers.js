const getTopCrates = (crates={})=>{
    let topCrates = [];
    for (let crateLabel of Object.keys(crates)){
        topCrates.push(crates[crateLabel].pop());
    }
    return topCrates;
};

const executeInstructions = (instructions=[], crates={})=>{
    for (let instruction of instructions){
        for (let i=1; i<=instruction.moveAmount;i++){
            crates[instruction.moveTo].push(crates[instruction.moveFrom].pop())
        }
    }
    return crates
};

const executeInstructions9001 = (instructions=[], crates={})=>{
    for (let instruction of instructions){
        crates[instruction.moveTo] = [...crates[instruction.moveTo],...crates[instruction.moveFrom].splice(-1*(instruction.moveAmount))]
    }
    return crates
};

const parseInstructions = (instructions=[])=>{
    const parsedInstructions = [];
    for (let instruction of instructions){
        instruction = instruction
            .replace("move", "")
            .replace("from", "")
            .replace("to", "")
            .trim()
            .split("  ");
        parsedInstructions.push({
            moveAmount: instruction[0],
            moveFrom: instruction[1],
            moveTo: instruction[2]
        })
    }
    return parsedInstructions
};

const parseCrates = (crates=[])=>{
    const crateLabels = crates[crates.length-1].trim().split("   ");
    const cratesHeight = crates.length-1;
    let parsedCrates = {};
    //creating an object of arrays where each array will contain a crate stack
    for (let crateLabel of crateLabels){
        parsedCrates[crateLabel]=[];
    }
    //populating arrays in object
    for (let crateLabel of crateLabels){
        const multiplier = parseInt(crateLabel) 
        for (let j=0; j<cratesHeight; j++){
            parsedCrates[crateLabel].unshift(crates[j][1+(4*(multiplier-1))]);
        }
    }
    //removing empty crate items
    for (let crateLabel of crateLabels){
        parsedCrates[crateLabel] = parsedCrates[crateLabel].filter(crateItem => crateItem != " ")
    }

    return parsedCrates;

};

module.exports = {getTopCrates, executeInstructions, executeInstructions9001, parseInstructions, parseCrates}
