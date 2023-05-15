const moveHead = (motions)=>{
    let headMovements = [];
    let tailMovements = [];
    let head = {x:0, y:0};
    let tail = {x:0, y:0};
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
            if(!tailMovements.filter(tailMovement=>tailMovement.x==tail.x && tailMovement.y==tail.y).length>0){
                tailMovements.push(tail)
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

const calculateDistanceBetweenHeadAndTail = (head, tail)=>{
    return Math.sqrt(Math.pow(head.x-tail.x, 2)+Math.pow(head.y-tail.y, 2))
};

module.exports = {moveHead}