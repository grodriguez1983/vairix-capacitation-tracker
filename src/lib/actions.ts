"use server";

import { revalidatePath } from "next/cache";
import { db } from "../../lib/db";
import { checkUserRole } from "./auth";

const prisma = db;

export const deleteOffice = async (formData: FormData) => {
  const userRole = await checkUserRole();

  if (userRole !== "admin") {
    return null;
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
  }

  revalidatePath("/dashboard/offices");
};

export const addOffice = async (formData: FormData) => {
  const userRole = await checkUserRole();

  if (userRole !== "admin") {
    return null;
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
  }

  revalidatePath("/dashboard/offices");
};

export const updateOffice = async (formData: FormData) => {
  const userRole = await checkUserRole();

  if (userRole !== "admin") {
    return null;
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
  }

  revalidatePath("/dashboard/offices");
};
