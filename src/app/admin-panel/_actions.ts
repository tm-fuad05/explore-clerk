"use server";

import { checkRole } from "@/utils/roles";
import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function setRole(formData: FormData) {
  const client = await clerkClient();

  // Check that the user trying to set the Role is an admin
  if (!checkRole("admin")) {
    return { message: "Not Authorized" };
  }

  try {
    const res = await client.users.updateUserMetadata(
      formData.get("id") as string,
      {
        publicMetadata: { role: formData.get("role") },
      },
    );
    revalidatePath("/admin-panel");
    return { message: res.publicMetadata };
  } catch (err) {
    return { message: err };
  }
}

export async function removeRole(formData: FormData) {
  const client = await clerkClient();

  try {
    const res = await client.users.updateUserMetadata(
      formData.get("id") as string,
      {
        publicMetadata: { role: "user" },
      },
    );
    revalidatePath("/admin-panel");
    return { message: res.publicMetadata };
  } catch (err) {
    return { message: err };
  }
}

export async function setInitialRole(userId: string) {
  const client = await clerkClient();
  return await client.users.updateUserMetadata(userId, {
    publicMetadata: { role: "user" },
  });
}
