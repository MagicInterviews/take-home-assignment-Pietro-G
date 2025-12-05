"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/server";

export async function login(formData: FormData) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const client = await createClient();
  const { error } = await client.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  (await cookies()).set("x-authenticated", "true");
  revalidatePath("/", "layout");
  redirect("/events");
}

export async function signup(formData: FormData) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const client = await createClient();
  const { error } = await client.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  (await cookies()).set("x-authenticated", "true");
  revalidatePath("/", "layout");
  redirect("/events");
}
