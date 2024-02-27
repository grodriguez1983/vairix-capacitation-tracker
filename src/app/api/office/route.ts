import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";

export async function POST(request: Request) {
  const session = await getServerSession();

  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const { name, type } = await request.json();

  const prisma = globalThis.prisma || new PrismaClient();

  try {
    let dbUser = await prisma.office.create({
      data: {
        name: name,
        type: type,
      },
    });
    return new Response(JSON.stringify({ message: "Office created", dbUser }), {
      status: 201,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "An error occurred while creating the office",
        error,
      }),
      {
        status: 500,
      }
    );
  } finally {
    if (!globalThis.prisma) {
      await prisma.$disconnect();
    }
  }
}
