import { ITEMS_PER_PAGE } from "@/lib/constants";
import { db } from "../../lib/db";
import { checkUserRole } from "@/lib/auth";

const prisma = db;

export const fetchUsers = async (q: string, page: number) => {
  const userRole = await checkUserRole();

  if (userRole !== "admin") {
    return { count: 0, users: [] };
  }

  try {
    const count = await prisma.user.count({
      where: {
        name: {
          contains: q,
          mode: "insensitive",
        },
      },
    });

    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: q,
          mode: "insensitive",
        },
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (page - 1),
    });

    return { count, users };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { count: 0, users: [], error: "Error fetching users" };
  }
};

export const fetchUser = async (id: string) => {
  const userRole = await checkUserRole();

  if (userRole !== "admin") {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};
