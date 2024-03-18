"use server";

import { revalidatePath } from "next/cache";
import { db } from "../../lib/db";
import { checkUserRole } from "@/lib/auth";

const prisma = db;

export const updateUser = async (formData: FormData) => {
  const userRole = await checkUserRole();

  if (userRole !== "admin") {
    return null;
  }

  const { id, name, email, admin } = Object.fromEntries(formData);

  try {
    const updateFields: { [key: string]: FormDataEntryValue | boolean } = {
      name,
      email,
      isAdmin: Boolean(admin),
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await prisma.user.update({
      where: { id: id.toString() },
      data: updateFields,
    });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/users");
};
