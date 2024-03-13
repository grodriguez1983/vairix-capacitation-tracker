"use server";

import { getServerSession } from "next-auth";
import { db } from '../../../../lib/db';

const prisma = db;

export async function getUsers(page: number = 1) {
    const session = await getServerSession();
    if (!session || !session.user || !session.user.email) {
        return [];
    }
    const dbUser = await prisma.user.findFirst({ where: { email: session.user.email } });
    if (!dbUser || !dbUser.isAdmin) {
        return [];
    }
    return await prisma.user.findMany({ where: {isAdmin: false}, take: 10, skip: (page - 1) * 10});
}