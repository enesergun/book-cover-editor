"use client";
import React from "react";
import { ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function ChooseCover() {
  return (
    <>
      <div className="h-96 w-full mx-auto flex  justify-center items-center gap-2">
        <ImagePlus />
        <Input
          className="w-max"
          type="file"
          accept="image/*"
          id="file-input"
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = event => {
                const img = document.createElement("img");
                img.src = event.target?.result as string;
                img.alt = "Cover Image";
                img.className = "h-96 mx-auto";
                document.body.appendChild(img);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
      </div>
      <Button>
        <Link href="/preview">Next</Link>
      </Button>
    </>
  );
}
