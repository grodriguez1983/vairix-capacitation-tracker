import { Office, OfficeType, OfficesResponse } from "@/types/offices";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { db } from "../../lib/db";
import { checkUserRole } from "./auth";

const prisma = db;

export const fetchOffices = async (
  q: string,
  page: number
): Promise<OfficesResponse> => {
  const userRole = await checkUserRole();

  if (userRole === null) {
    return { count: 0, offices: [] };
  }

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
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (page - 1),
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
  }
};

export const fetchOffice = async (id: string): Promise<Office | null> => {
  const userRole = await checkUserRole();

  if (userRole !== "admin") {
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
