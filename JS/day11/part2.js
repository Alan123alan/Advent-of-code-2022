const fs = require("fs");

function monkeyExchange(throwingMonkey, catchingMonkeys, commonModulo){
    for(const item of throwingMonkey["Starting items"]){
        const worryLevel = eval(throwingMonkey.Operation().replace("item", item))%commonModulo;
        const condition = worryLevel==0 || worryLevel%throwingMonkey.Test==0;
        // console.log(worryLevel)
        catchingMonkeys[throwingMonkey[condition]]["Starting items"] = [...catchingMonkeys[throwingMonkey[condition]]["Starting items"], worryLevel]
    }
    throwingMonkey["Starting items"] = []
}

const monkeyRegex = /Monkey [0-9]:/;

const monkeys = fs.readFileSync("./js/day11/input.txt", {encoding:"utf-8"})
    // .split("\r\n")
    .split(monkeyRegex)
    .filter(item=>item!="")
    .map(item=>item.split('\r\n'))
    .map(item=>item.map(subitem=>subitem.trim()))
    .map(item=>item.filter(subitem=>subitem!=""))
    .map(item=>{
        const monkey = {}
        for(const subitem of item){
            let [key, val] = subitem.split(": ");
            if(key=="Starting items"){
                val = val.split(",").map(val=>parseInt(val))
            }else if(key == "Test"){
                val = parseInt(val.replace("divisible by", ""))
            }else if(key == "If true"){
                monkey[true] = parseInt(val.replace("throw to monkey",""));
            }else if(key == "If false"){
                monkey[false] = parseInt(val.replace("throw to monkey",""));
            }else if(key == "Operation"){
                val = val.replace("new = ", "");
                val = val.replace("old","item");
                val = val.replace("old","item");
                const temp = val
                val = function(item){
                    // console.log("my val oper:", temp)
                    this.Inspections++
                    return temp
                };
            }
            // console.log(val);
            monkey[key] = val;
        }
        delete monkey["If true"];
        delete monkey["If false"];
        monkey.Inspections = 0;
        return monkey
});


const commonModulo = monkeys.reduce((acc,monkey)=>{
    console.log(monkey.Test);
    return monkey.Test*acc
},1)
console.log(commonModulo)    
// console.log(monkeys.length)    

const rounds = 10000;
for(let i=1; i<=rounds; i++){
    for(const monkey of monkeys){
        monkeyExchange(monkey, monkeys, commonModulo)
    }
}

console.log(monkeys)
console.log(monkeys.sort((a,b)=>a.Inspections-b.Inspections))
console.log(monkeys[monkeys.length-1].Inspections*monkeys[monkeys.length-2].Inspections)
