const readFile = require('fs').readFileSync;

const INPUTS = []
readFile('input.txt', 'utf-8').split("\n").forEach(data => {
    INPUTS.push(parseInt(data.trim()));
})

INPUTS.sort((a, b)=> a-b);
console.log(INPUTS)

let diff1 = 0;
let diff3 = 0;
let diff2 = 0;

function parseAdapterArray(array){ // PART 1
    let curr = 0 ;
    let prev = 0;
    for(let i=0; i<array.length;i++){
        curr = array[i];
        let difference = curr - prev;
        if(difference ===1){
            diff1++
        }
        else if(difference ===2){
            diff2++;
        }
        else if(difference ===3){
            diff3++;
        }

        prev = curr;
    }

    diff3++;
    console.log(`Diff1 ${diff1}`)
    console.log(`Diff2 ${diff2}`)
    console.log(`Diff3 ${diff3}`)
    console.log(`multiplication : ${diff1*diff3}`)
}

parseAdapterArray(INPUTS) // PART 1


function calculateTotalNumberOfPossibleWays(array){ // PART 2
    let start = 0
    let end = Math.max(...array)+3;
    array.splice(0, 0, start);
    array.push(end);
    console.log(array);

    let rows = array.length;
    let cols = 4;

    let ways = new Array(rows);
    let table = new Array(rows);
    for(let i=0; i<table.length;i++){
        table[i] = new Array(cols);
        for(let j =0; j<table[i].length; j++){
            table[i][j]=0
        }
    }
    for(let i = 0; i<ways.length;i++){
        ways[i] = 0
    }
    ways[0] = 1;
    for(let row =0; row<table.length;row++){
        for(let col =0; col<table[row].length; col++){
            if(col === 0 || row === 0){
                table[row][col] = 0;
            }
            else{
                let gap=col;
                let number = array[row]
                let indexFound = array.indexOf(number-gap)

                if(indexFound !== -1){
                    table[row][col] = ways[indexFound] + table[row][col-1];
                }
                else{
                    table[row][col] = 0;
                }
            }
        }
        if(row!=0){
            ways[row] = Math.max(...table[row]);
        }
        
    }
    console.log(ways[ways.length-1])
}
calculateTotalNumberOfPossibleWays(INPUTS) // PART 2