const fs = require("fs");

// function monkeyExchange(throwingMonkey, catchingMonkeyIfTrue, catchingMonkeyIfFalse){
//     for(const item of throwingMonkey.items){
//         const worryLevel = Math.floor(throwingMonkey.operation(item));
//         if(throwingMonkey.test(worryLevel)){
//             catchingMonkeyIfTrue.items.push(worryLevel)
//         }else{
//             catchingMonkeyIfFalse.items.push(worryLevel)
//         }
//     }
//     throwingMonkey.items = []
// }

function monkeyExchange(throwingMonkey, catchingMonkeys){
    for(const item of throwingMonkey["Starting items"]){
        const worryLevel = Math.floor(eval(throwingMonkey.Operation().replace("item", item))/3);
        const condition = worryLevel%throwingMonkey.Test==0
        // console.log(worryLevel)
        catchingMonkeys[throwingMonkey[condition]]["Starting items"] = [...catchingMonkeys[throwingMonkey[condition]]["Starting items"], worryLevel]
    }
    throwingMonkey["Starting items"] = []
}

// const monkey0 = {
//     items:[79,98],
//     operation: (item)=>(item*19)/3,
//     test: function (worryLevel){
//         this.inspections++
//         return worryLevel%23==0
//     },
//     inspections: 0
// }

// const monkey1 = {
//     items:[54,65,75,74],
//     operation: (item)=>(item+6)/3,
//     test: function (worryLevel){
//         this.inspections++
//         return worryLevel%19==0
//     },
//     inspections: 0
// }

// const monkey2 = {
//     items:[79,60,97],
//     operation: (item)=>(item*item)/3,
//     test: function (worryLevel){
//         this.inspections++
//         return worryLevel%13==0
//     },
//     inspections:0
// }

// const monkey3 = {
//     items:[74],
//     operation: (item)=>(item+3)/3,
//     test: function (worryLevel){
//         this.inspections++
//         return worryLevel%17==0
//     },
//     inspections: 0
// }

// const monkeys = [monkey0, monkey1, monkey2, monkey3]
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

// console.log(monkeys)    
// console.log(monkeys.length)    

const rounds = 20;
for(let i=1; i<=rounds; i++){
    for(const monkey of monkeys){
        monkeyExchange(monkey, monkeys)
    }
    // monkeyExchange(monkey1, monkey2, monkey0)
    // monkeyExchange(monkey2, monkey1, monkey3)
    // monkeyExchange(monkey3, monkey0, monkey1)
}

console.log(monkeys)
console.log(monkeys.sort((a,b)=>a.Inspections-b.Inspections))
console.log(monkeys[monkeys.length-1].Inspections*monkeys[monkeys.length-2].Inspections)
// console.log(monkey0);
// console.log(monkey1);
// console.log(monkey2);
// console.log(monkey3);