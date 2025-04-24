"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function DownloadCover() {
  const [imgSrc, setImgSrc] = useState<string>("");

  useEffect(() => {
    const saved = sessionStorage.getItem("cover");
    if (saved) {
      setImgSrc(saved);
    }
  }, []);

  if (!imgSrc) {
    return <p>No image yet.</p>;
  }
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
