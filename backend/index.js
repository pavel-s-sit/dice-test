import Fastify from 'fastify'
import {prisma} from "./prisma.js";
import {Decimal} from 'decimal.js';
import cors from '@fastify/cors'
import {checkCombination, getCurrentBalance, MULTIPLIER, roll} from "./utils/utils.js";

const fastify = Fastify({
    logger: true
})

fastify.get('/init', async (request, reply) => {
    const isExist = await prisma.transactions.count();

    if (!isExist) {
        const data = await prisma.transactions.create({
            data: {
                value: '100',
                type: 'init',
            },
        })
        return data;
    }

    return {
        balance: await getCurrentBalance(),
        MULTIPLIER
    };

})

fastify.post('/bet', async (request, reply) => {
    const body = JSON.parse(request.body)
    const value = new Decimal(body.value);

    const oldBalance = await getCurrentBalance();
    if (value > oldBalance) {
        return {
            "error": "Not enough funds"
        }
    }

    await prisma.transactions.create({
        data: {
            value: value.neg(),
            type: "bet",
        },
    })

    const combination = roll();
    const combinationName = checkCombination(combination);
    const currentMultiplier = MULTIPLIER[combinationName].multiplier;
    const win = value.mul(currentMultiplier);

    if (win > 0) {
        await prisma.transactions.create({
            data: {
                value: win,
                type: "win",
            },
        })
    }

    const balance = await getCurrentBalance();

    return {
        combination,
        balance,
        'combinationName': MULTIPLIER[combinationName].name
    }
})

/**
 * Run the server!
 */
const start = async () => {
    try {
        await fastify.register(cors, {
            origin: (origin, cb) => {
                const hostname = new URL(origin).hostname
                if (hostname === "localhost") {
                    cb(null, true)
                    return
                }
                cb(new Error("Not allowed"), false)
            }
        })
        await fastify.listen({port: 3000})
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()