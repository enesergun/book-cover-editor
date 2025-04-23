import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Navigation() {
  return (
    <div className="flex  gap-4 w-full mx-auto justify-center mt-7">
      <Link href="/">
        <Button>Choose Book</Button>
      </Link>
      <Link href="/edit-cover">
        <Button>Edit Cover</Button>
      </Link>
      <Link href="/preview">
        <Button>Preview & Download</Button>
      </Link>
    </div>
  );
}
