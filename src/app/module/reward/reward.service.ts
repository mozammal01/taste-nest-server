import prisma from "../../../lib/prisma.js";

const addPoints = async (userId: string, points: number, description: string) => {
    return await prisma.reward.create({
        data: {
            userId,
            points,
            description,
            type: 'earn'
        }
    });
}

const redeemPoints = async (userId: string, points: number, description: string) => {
    // Check if user has enough points
    const rewards = await prisma.reward.findMany({
        where: { userId }
    });
    
    const totalPoints = rewards.reduce((acc, r) => r.type === 'earn' ? acc + r.points : acc - r.points, 0);
    
    if (totalPoints < points) {
        throw new Error("Insufficient points");
    }

    return await prisma.reward.create({
        data: {
            userId,
            points,
            description,
            type: 'redeem'
        }
    });
}

const getMyRewards = async (userId: string) => {
    const result = await prisma.reward.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
    });
    return result;
}

export const RewardService = {
    addPoints,
    redeemPoints,
    getMyRewards
}
