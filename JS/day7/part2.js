const fs = require("fs");
const {cdOps, fileRegex, dirRegex} = require("./helpers")

const terminalOutput = fs.readFileSync("./js/day7/input.txt", {encoding:"utf-8"}).split("\r\n");

let cwd = "";
let files = [];
let dirs = [];
let paths = [];
const diskSpace = 70000000;
for(const line of terminalOutput){
    const [marker, command, argument] = line.split(" ");
    if(command == "cd"){
        cwd = cdOps(line);
        if(!paths.includes(cwd)){
            paths.push(cwd);
        }
    }
    if(fileRegex.test(line)){
        const [size, name] = line.split(" ");
        files.push({cwd, type:"file", size:parseInt(size), name});
    }else if(dirRegex.test(line)){
        const [type, name] = line.split(" ");
        dirs.push({cwd, type, name});
    }
}
let rootDirTotal = files
.filter(file=>file.cwd.includes("root"))
.reduce((acc, curr)=>acc+curr.size,0);
const unusedSpace = diskSpace-rootDirTotal;
const requiredSpace = 30000000-unusedSpace 
console.log("root dir total",rootDirTotal)
console.log("unused space", unusedSpace)
console.log("required space", requiredSpace)
let pathsToRemove = [];
for(let path of paths){
    let dirTotal = files
    .filter(file=>file.cwd.includes(path))
    .reduce((acc, curr)=>{
        return acc+curr.size
    }, 0);
    if(dirTotal>=requiredSpace){
        pathsToRemove.push(dirTotal)
    }
}
console.log(pathsToRemove.sort((a,b)=>a-b)[0])
