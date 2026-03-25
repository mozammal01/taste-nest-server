import prisma from "../../../lib/prisma";

const getMyProfile = async (id: string) => {
    const result = await prisma.user.findUnique({
        where: { id }
    });
    return result;
}

const updateMyProfile = async (id: string, payload: any) => {
    const result = await prisma.user.update({
        where: { id },
        data: payload
    });
    return result;
}

const getAllUsers = async () => {
    const result = await prisma.user.findMany();
    return result;
}

export const UserService = {
    getMyProfile,
    updateMyProfile,
    getAllUsers
}
