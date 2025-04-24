"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function DownloadCover() {
  const imgSrc = typeof window === "undefined" ? "" : sessionStorage.getItem("cover") || "";

  console.log("imgSrc", imgSrc);
  return (
    <>
      <div>
        <Image src={`${imgSrc}`} alt="Cover" width={390} height={450} unoptimized />
      </div>
      <Button className="mt-4">
        <a href={`${imgSrc}`} download="cover.png">
          Download Cover
        </a>
      </Button>
    </>
  );
}
