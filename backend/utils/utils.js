import {prisma} from "../prisma.js";

export const MULTIPLIER = {
    'PAIR': {'name': 'Pair', 'multiplier': 1},
    'FULLHOUSE': {'name': 'Full House', 'multiplier': 2},
    'BALUT': {'name': 'Balut', 'multiplier': 4},
    'STRAIGHT': {'name': 'Straight', 'multiplier': 8},
    'OTHER': {'name': 'Other', 'multiplier': 0},
};

export async function getCurrentBalance() {
    const balance = await prisma.transactions.aggregate({
        _sum: {
            value: true
        }
    })
    return balance._sum.value;
}

export function roll() {
    const combination = [0, 0, 0, 0, 0];

    combination.forEach((_, index) => {
        combination[index] = getRandomInteger(1, 6);
    })

    return combination;
}

export function checkCombination(dice) {
    const counts = [0, 0, 0, 0, 0, 0];

    for (let value of dice) {
        counts[value - 1]++;
    }

    const straight = dice.join("");
    if (straight.includes("12345") || straight.includes("23456")) {
        return "STRAIGHT"
    }

    if (counts.includes(5)) {
        return "BALUT";
    }

    if (counts.includes(2) && counts.includes(3)) {
        return "FULLHOUSE"
    }

    for (let i = 0; i < 6; i++) {
        if (counts[i] >= 2) {
            return "PAIR"
        }
    }

    return "OTHER"
}

export function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}