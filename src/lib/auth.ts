import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';


export async function checkUserRole() {
  const session = await getServerSession();
  if (!session || !session?.user?.email) {
    return "user";
  }
  const prisma = new PrismaClient();
  let dbUser = await prisma.user.findFirst({ where: { email: session?.user?.email} });
  return dbUser?.isAdmin ? "admin" : "user";
}