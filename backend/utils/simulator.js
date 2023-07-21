import {checkCombination, roll} from "./utils.js";
const ITERATION = 100000;
const BET = 100;

function play(iteration, bet) {
    const multipliers = {
        'PAIR': 2,
        'FULLHOUSE': 3,
        'BALUT': 4,
        'STRAIGHT': 5,
        'OTHER': 0,
    };
    let totalWin = 0;
    for (let i = 0; i < iteration; i++) {
        let combination = roll();
        let combinationName = checkCombination(combination);
        let currentMultiplier = multipliers[combinationName];
        totalWin += (currentMultiplier * bet);
    }
    return {'rtp': (totalWin / (bet * iteration)) * 100};
}
console.log(play(ITERATION, BET));