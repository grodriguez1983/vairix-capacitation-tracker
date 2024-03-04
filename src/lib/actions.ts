"use server";

import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = globalThis.prisma || new PrismaClient();

export const deleteOffice = async (formData: FormData) => {
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

  const { id } = Object.fromEntries(formData);

  try {
    await prisma.office.delete({
      where: {
        id: id.toString(),
      },
    });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete office!");
  } finally {
    if (!globalThis.prisma) {
      await prisma.$disconnect();
    }
  }

  revalidatePath("/dashboard/offices");
};

export const addOffice = async (formData: FormData) => {
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

  try {
    const { name, type } = Object.fromEntries(formData);

    await prisma.office.create({
      data: {
        name: name.toString(),
        type: type.toString(),
      },
    });
  } catch (err) {
    throw new Error("Failed to create office!");
  } finally {
    if (!globalThis.prisma) {
      await prisma.$disconnect();
    }
  }

  revalidatePath("/dashboard/offices");
  redirect("/dashboard/offices");
};

export const updateOffice = async (formData: FormData) => {
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

  const { id, name, type } = Object.fromEntries(formData);

  try {
    const updateFields: { [key: string]: FormDataEntryValue } = {
      name,
      type,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await prisma.office.update({
      where: { id: id.toString() },
      data: updateFields,
    });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update office!");
  } finally {
    if (!globalThis.prisma) {
      await prisma.$disconnect();
    }
  }

  revalidatePath("/dashboard/offices");
  redirect("/dashboard/offices");
};
