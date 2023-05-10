const fs = require("fs");
const { serialize } = require("v8");
const {cdRegex, cdOps, fileRegex, dirRegex} = require("./helpers");

const terminalOutput = fs.readFileSync("./js/day7/input.txt",{encoding:"utf-8"}).split("\r\n");
let files = []
let dirs = []
let paths = []
let cwd = ""
for(const line of terminalOutput){
    const [marker, command, argument] = line.split(" ")
    if(command == "cd"){
        cwd = cdOps(line);
        if(!paths.includes(cwd)){
            paths.push(cwd)
        }
        console.log(line)
        console.log(cwd)
    }
    const fileTreeObj = {};
    if(fileRegex.test(line)){
        // console.log("file",line)
        const [size, name] = line.split(" ");
        files.push({cwd, type:"file", size:parseInt(size), name});
    }else if(dirRegex.test(line)){
        // console.log("dir",line)
        const [type, name] = line.split(" ");
        dirs.push({cwd, type, name});

    }
}
let total=0;
for(let path of paths){
    let dirTotal = files
    .filter(file=>file.cwd.includes(path))
    .reduce((acc, curr)=>{
        return acc+curr.size
    }, 0);
    if(dirTotal <= 100000){
        total += dirTotal
        console.log(dirTotal)
        console.log(files.filter(file=>file.cwd == path))
    }
}
console.log(total)
// console.log(files)
// console.log(dirs)
// console.log(paths)