import { Office, OfficeType, OfficesResponse } from "@/types/offices";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

const prisma = globalThis.prisma || new PrismaClient();

export const fetchOffices = async (
  q: string,
  page: number
): Promise<OfficesResponse> => {
  const session = await getServerSession();
  const defaultReturn = { count: 0, offices: [] };

  if (!session || !session.user || !session.user.email) {
    return defaultReturn;
  }

  const dbUser = await prisma.user.findFirst({
    where: { email: session.user.email },
  });

  if (!dbUser || !dbUser.isAdmin) {
    return defaultReturn;
  }

  const ITEM_PER_PAGE = 2;

  try {
    const count = await prisma.office.count({
      where: {
        name: {
          contains: q,
          mode: "insensitive",
        },
      },
    });

    const offices = await prisma.office.findMany({
      where: {
        name: {
          contains: q,
          mode: "insensitive",
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
    });

    // Validate and typecast each office
    const typedOffices: Office[] = offices.map((office) => ({
      ...office,
      type: office.type as OfficeType,
    }));

    return { count, offices: typedOffices };
  } catch (error) {
    console.error("Error fetching offices:", error);
    return { count: 0, offices: [], error: "Error fetching offices" };
  } finally {
    if (!globalThis.prisma) {
      await prisma.$disconnect();
    }
  }
};

export const fetchOffice = async (id: string): Promise<Office | null> => {
  const session = await getServerSession();
  if (!session || !session.user || !session.user.email) {
    return null;
  }

  const dbUser = await prisma.user.findFirst({
    where: { email: session.user.email },
  });

  if (!dbUser || !dbUser.isAdmin) {
    return null;
  }

  try {
    const office = await prisma.office.findUnique({
      where: {
        id: id,
      },
    });

    // Validate and typecast each office
    if (office) {
      const typedOffice: Office = {
        ...office,
        type: office.type as OfficeType,
      };

      return typedOffice;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch office!");
  }
};
