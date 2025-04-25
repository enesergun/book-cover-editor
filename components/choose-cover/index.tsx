"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StyleState } from "@/models";
import html2canvas from "html2canvas-pro";
import { useRouter } from "next/navigation";
import DraggableText from "../draggable-text";

export default function ChooseCover({ book }: { book?: string }) {
  const router = useRouter();

  const initialTitleStyle = sessionStorage.getItem("titleDragStyle")
    ? JSON.parse(sessionStorage.getItem("titleDragStyle") ?? "{}")
    : { fontSize: 32, color: "#ffffff", letterSpacing: 0 };
  const initialAuthorStyle = sessionStorage.getItem("authorDragStyle")
    ? JSON.parse(sessionStorage.getItem("authorDragStyle") ?? "{}")
    : { fontSize: 24, color: "#ffffff", letterSpacing: 0 };
  const existingImage = sessionStorage.getItem("image");

  const [imgSrc, setImgSrc] = useState<string>(existingImage ?? "");
  const [titleText, authorText] = book?.split(";") ?? ["", ""];
  const [activeText, setActiveText] = useState<"title" | "author">("title");
  const [titleStyle, setTitleStyle] = useState<StyleState>(initialTitleStyle);
  const [authorStyle, setAuthorStyle] = useState<StyleState>(initialAuthorStyle);

  useEffect(() => {
    sessionStorage.setItem(
      "titleDragStyle",
      JSON.stringify({
        ...initialTitleStyle,
        fontSize: titleStyle.fontSize,
        color: titleStyle.color,
        letterSpacing: titleStyle.letterSpacing,
      })
    );
  }, [titleStyle]);

  useEffect(() => {
    sessionStorage.setItem(
      "authorDragStyle",
      JSON.stringify({
        ...initialAuthorStyle,
        fontSize: authorStyle.fontSize,
        color: authorStyle.color,
        letterSpacing: authorStyle.letterSpacing,
      })
    );
  }, [authorStyle]);

  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const dataURL = ev.target?.result as string;
      setImgSrc(dataURL);
      sessionStorage.setItem("image", dataURL);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    const el = overlayRef.current;
    if (!el) return;

    const width = el.scrollWidth;
    const height = el.scrollHeight;

    try {
      const canvas = await html2canvas(el, {
        width,
        height,
        useCORS: true,
        allowTaint: false,
        scale: 1,
      });
      const imgData = canvas.toDataURL("image/png");
      sessionStorage.setItem("cover", imgData);
      router.push("/preview");
    } catch (err) {
      console.error("Error generating canvas:", err);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center gap-4 mb-4">
        <Input type="file" accept="image/*" onChange={onFileChange} />
      </div>

      {imgSrc && (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3">
            <div className="flex flex-col gap-2 p-2 border rounded">
              <h3 className="font-semibold mb-2">
                {activeText === "title" ? "Title Styles" : "Author Styles"}
              </h3>
              <div className="flex items-center gap-2 mb-1">
                <Label>Font Size:</Label>
                <Input
                  type="number"
                  value={activeText === "title" ? titleStyle.fontSize : authorStyle.fontSize}
                  onChange={e => {
                    const size = Number(e.target.value);
                    if (activeText === "title") setTitleStyle(s => ({ ...s, fontSize: size }));
                    else setAuthorStyle(s => ({ ...s, fontSize: size }));
                  }}
                  className="w-16"
                />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <Label>Color:</Label>
                <Input
                  type="color"
                  value={activeText === "title" ? titleStyle.color : authorStyle.color}
                  onChange={e => {
                    const color = e.target.value;
                    if (activeText === "title") setTitleStyle(s => ({ ...s, color }));
                    else setAuthorStyle(s => ({ ...s, color }));
                  }}
                  className="w-10 h-10 p-0"
                />
              </div>
              <div className="flex items-center gap-2">
                <Label>Letter Spacing:</Label>
                <Input
                  type="number"
                  value={
                    activeText === "title" ? titleStyle.letterSpacing : authorStyle.letterSpacing
                  }
                  onChange={e => {
                    const ls = Number(e.target.value);
                    if (activeText === "title") setTitleStyle(s => ({ ...s, letterSpacing: ls }));
                    else setAuthorStyle(s => ({ ...s, letterSpacing: ls }));
                  }}
                  className="w-16"
                />
              </div>
            </div>
          </div>

          <div
            ref={overlayRef}
            className="relative inline-block"
            style={{ border: "1px solid #ccc", overflow: "hidden" }}
          >
            <Image src={imgSrc} alt="cover" width={450} height={384} className="block" />

            <DraggableText
              type="title"
              text={titleText}
              setActiveText={() => setActiveText("title")}
              style={titleStyle}
              ref={titleRef}
              defaultPosition={
                !!initialTitleStyle.x && !!initialTitleStyle.y
                  ? { x: initialTitleStyle.x, y: initialTitleStyle.y }
                  : undefined
              }
            />

            <DraggableText
              type="author"
              text={authorText}
              setActiveText={() => setActiveText("author")}
              style={authorStyle}
              ref={authorRef}
              defaultPosition={
                !!initialAuthorStyle.x && !!initialAuthorStyle.y
                  ? { x: initialAuthorStyle.x, y: initialAuthorStyle.y }
                  : undefined
              }
            />
          </div>
        </div>
      )}

      <div className="mt-4">
        <Button onClick={handleSave}>Save & Next</Button>
      </div>
    </>
  );
}
