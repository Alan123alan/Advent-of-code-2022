const moveHead = (motions)=>{
    let headMovements = [];
    let tailMovements = [];
    let head = {x:0, y:0};
    let tail = {x:0, y:0};
    let tail2 = {x:0, y:0};
    let tail3 = {x:0, y:0};
    let tail4 = {x:0, y:0};
    let tail5 = {x:0, y:0};
    let tail6 = {x:0, y:0};
    let tail7 = {x:0, y:0};
    let tail8 = {x:0, y:0};
    let tail9 = {x:0, y:0};
    for(const motion of motions){
        const [direction, movements] = motion;
        for(let i=0; i<parseInt(movements); i++){
            switch (direction) {
                case "U":
                    head.y++
                    break;
                case "D":
                    head.y--
                    break;
                case "L":
                    head.x--
                    break;
                case "R":
                    head.x++
                    break;
            }
            headMovements.push({x:head.x, y:head.y})
            tail = moveTail(head, tail)
            tail2 = moveTail(tail, tail2)
            tail3 = moveTail(tail2, tail3)
            tail4 = moveTail(tail3, tail4)
            tail5 = moveTail(tail4, tail5)
            tail6 = moveTail(tail5, tail6)
            tail7 = moveTail(tail6, tail7)
            tail8 = moveTail(tail7, tail8)
            tail9 = moveTail(tail8, tail9)
            if(!tailMovements.filter(tailMovement=>tailMovement.x==tail9.x && tailMovement.y==tail9.y).length>0){
                tailMovements.push(tail9)
            }
            // console.log(calculateDistanceBetweenHeadAndTail(head,tail));
        }
    }
    console.log(headMovements, tailMovements.length)
};

const moveTail = (head, tail)=>{
    if(head.x > tail.x+1 && head.y == tail.y){
        return { x:tail.x+1, y:tail.y}
    }else if(head.x < tail.x-1 && head.y == tail.y){
        return { x:tail.x-1, y:tail.y}

    }else if(head.x == tail.x && head.y > tail.y+1){
        return {x:tail.x, y:tail.y+1}
    }else if(head.x == tail.x && head.y < tail.y-1){
        return { x:tail.x, y:tail.y-1}

    }else if((head.x == tail.x+1 && head.y > tail.y+1) || (head.x == tail.x+2 && head.y > tail.y)){
        return { x:tail.x+1, y:tail.y+1 }
    }else if((head.x == tail.x+1 && head.y < tail.y-1) || (head.x == tail.x+2 && head.y < tail.y)){
        return { y:tail.y-1, x:tail.x+1}

    }else if((head.x == tail.x-1 && head.y > tail.y+1) || (head.x == tail.x-2 && head.y > tail.y)){
        return {x:tail.x-1, y:tail.y+1}
    }else if((head.x == tail.x-1 && head.y < tail.y-1) || (head.x == tail.x-2 && head.y < tail.y)){
        return {x:tail.x-1, y:tail.y-1}
    }
    
    else{
        return tail
    }

};

module.exports = {moveHead}