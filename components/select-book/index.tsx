import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectBook() {
  return (
    <>
      <div className="h-96 w-full mx-auto flex flex-col justify-center items-center">
        <Select>
          <SelectTrigger className="w-3/7">
            <SelectValue placeholder="Select book to edit cover page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button>
        <Link href="/edit-cover">Next</Link>
      </Button>
    </>
  );
}
