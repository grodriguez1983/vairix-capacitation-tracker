import { getServerSession } from 'next-auth';
import { db } from '../../lib/db';

const prisma = db;

export async function checkUserRole() {
  const session = await getServerSession();
  if (!session || !session?.user?.email) {
    return null;
  }
  
  let dbUser = await prisma.user.findFirst({ where: { email: session?.user?.email} });
  return dbUser?.isAdmin ? "admin" : "user";
}
