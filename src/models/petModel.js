import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//Crio a variavél findAll e já exporto
export const findAll = async () => {
    
    return await prisma.pet.findMany({
    orderBy: { nome: 'asc' }
    });
}

//Crio a variavel findById e já exporto
export const findById = async (id) => {

    return await prisma.pet.findUnique({
        where: { id: Number(id) }
    })
}