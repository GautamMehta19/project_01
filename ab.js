// let tambola = require('tambola-generator');

// // console.log(tambola.getTickets(100)) //This generates 100 tambola tickets

// // console.log(tambola.getDrawSequence()) //Returns numbers 1-90 scrambled

// let a = tambola.

let max = 19
let min = 10
let random = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

let randomIndex = function () {
    return Math.floor(Math.random() * (4 - 1)) 
}
console.log(randomIndex())

let matrix = [];
for (let i = 0; i < 3; i++) {
    matrix[i] = [];


    for (let j = 0; j < 9; j++) {
        let value = random(min, max)
        let value2 = randomIndex()
        if (value >= 10 && value < 20) {
            if (value2 == 0) {
                matrix[i][value2] = value
            }
            // matrix[i][0] = undefined
            if (value2 == 1) {
                matrix[i][value2] = value
            }
            // matrix[i][1] = undefined
            if (value2 == 2) {
                matrix[i][value2] = value
            }
            // matrix[i][2] = undefined
        }
    }

}
// for(let j=0; j<9; j++) {
//     let value = random(min,max)
//     let value2 = randomIndex()
//     if(value >= 1 && value <10){
//         matrix[value2][0] = value
//     }
//     if(value >= 10 && value <20){
//         matrix[i][j] = value
//     }
//     if(value >= 20 && value <30){
//         matrix[value2][2] = value
//     }
//     if(value >= 30 && value <40){
//         matrix[value2][3] = value
//     }
//     if(value >= 40 && value <50){
//         matrix[value2][4] = value
//     }
//     if(value >= 50 && value <60){
//         matrix[value2][5] = value
//     }
//     if(value >= 60 && value <70){
//         matrix[value2][6] = value
//     }
//     if(value >= 70 && value <80){
//         matrix[value2][7] = value
//     }
//     if(value >= 80 && value <90){
//         matrix[value2][8] = value
//     }
// }

console.log(matrix)