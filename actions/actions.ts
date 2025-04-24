"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const selectBook = async (formData: FormData) => {
  const cookieStore = await cookies();
  const title: FormDataEntryValue | null = formData.get("book");
  const author: FormDataEntryValue | null = formData.get("author");

  cookieStore.set("book", `${title};${author}`);
  redirect("/edit-cover");
};
