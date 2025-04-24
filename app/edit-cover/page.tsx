import ChooseCover from "@/components/choose-cover";
import { cookies } from "next/headers";
import React from "react";

export default async function EditCover() {
  const cookieStore = await cookies();
  const book: string | undefined = cookieStore.get("book")?.value;
  
  if (!book) {
    return <p>No book selected.</p>;
  }

  return <ChooseCover book={book} />;
}
