"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Draggable from "react-draggable";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StyleState } from "@/models";

function DraggableText({
  type,
  text,
  ref,
  setActiveText,
  style,
}: {
  type: "title" | "author";
  text: string;
  ref: React.Ref<HTMLDivElement>;
  setActiveText: () => void;
  style: StyleState;
}) {
  return (
    <Draggable nodeRef={ref as React.RefObject<HTMLElement>}>
      <div
        ref={ref}
        onClick={setActiveText}
        className="absolute cursor-move"
        style={{
          top: type === "title" ? 20 : 100,
          left: 20,
          fontSize: `${style.fontSize}px`,
          color: style.color,
          letterSpacing: `${style.letterSpacing}px`,
        }}
      >
        {text}
      </div>
    </Draggable>
  );
}

export default function ChooseCover({ book }: { book?: string }) {
  const [imgSrc, setImgSrc] = useState<string>("");

  const [titleText, authorText] = book?.split(";") ?? ["", ""];
  const [activeText, setActiveText] = useState<"title" | "author">("title");
  const [titleStyle, setTitleStyle] = useState<StyleState>({
    fontSize: 32,
    color: "#ffffff",
    letterSpacing: 0,
  });
  const [authorStyle, setAuthorStyle] = useState<StyleState>({
    fontSize: 24,
    color: "#ffffff",
    letterSpacing: 0,
  });

  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setImgSrc(ev.target!.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!overlayRef.current) return;
    const canvas = await html2canvas(overlayRef.current, { useCORS: true });
    const dataUrl = canvas.toDataURL("image/png");
    const w = window.open("");
    w?.document.write(`<img src=\"${dataUrl}\" />`);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-4 mb-4">
        <Input type="file" accept="image/*" onChange={onFileChange} />
      </div>

      {imgSrc && (
        <div className="flex gap-4 h-[451px]">
          <div className="w-1/3">
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

          <div ref={overlayRef} className="relative w-2/3 border">
            <Image src={imgSrc} alt="cover" width={450} height={384} className="block" />

            <DraggableText
              type="title"
              text={titleText}
              setActiveText={() => setActiveText("title")}
              style={titleStyle}
              ref={titleRef}
            />

            <DraggableText
              type="author"
              text={authorText}
              setActiveText={() => setActiveText("author")}
              style={authorStyle}
              ref={authorRef}
            />
          </div>
        </div>
      )}

      <div className="mt-4">
        <Button onClick={handleSave}>Save &amp; Next</Button>
      </div>
    </>
  );
}
