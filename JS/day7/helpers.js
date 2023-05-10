let cwd = "";
// let fileTree = [
//     {
//         cwd : [{type: f|d size:??, name:"??"}]
//     }
// ]

const cdRegex = /[$] cd (.*|\/)/;
const fileRegex = /[0-9]+ .+[.]*.*/;
const dirRegex = /dir .+/;
const navigateIntoDirRegex = /[$] cd ([a-zA-Z]+|\/)/;
const navigateOutOfDirRegex = /[$] cd ../
const isRootDirRegex = /[$] cd \//;

// const mappingDirs = ()=>{

// }

const cdOps = (cdCommand="")=>{
    const [marker, command, argument] = cdCommand.split(" ")
    if(navigateIntoDirRegex.test(cdCommand)){
        console.log(cdCommand, cdCommand.indexOf("/"))
        if(argument == "/"){
            console.log("in root")
            cwd = "root"
            return cwd
        }
        cwd += "/"+cdCommand.slice(5,cdCommand.length);
        return cwd
    }else if(navigateOutOfDirRegex.test(cdCommand)){
        cwd =  cwd.lastIndexOf("/") == 0?"root":cwd.slice(0,cwd.lastIndexOf("/"))
        return cwd
    }
};

const lsOps = ()=>{

};


module.exports = {cdRegex, fileRegex, dirRegex, cdOps}