import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Navigation() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 w-full mx-auto justify-center mt-7 ">
      <Link href="/">
        <Button className="w-40">Choose Book</Button>
      </Link>
      <Link href="/edit-cover">
        <Button className="w-40">Edit Cover</Button>
      </Link>
      <Link href="/preview">
        <Button className="w-40">Preview & Download</Button>
      </Link>
    </div>
  );
}
