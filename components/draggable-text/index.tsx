import { StyleState } from "@/models";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

export default function DraggableText({
  type,
  text,
  ref,
  setActiveText,
  style,
  defaultPosition,
}: {
  type: "title" | "author";
  text: string;
  ref: React.Ref<HTMLDivElement>;
  setActiveText: () => void;
  style: StyleState;
  defaultPosition?: { x: number; y: number };
}) {
  const handleDrag = (e: DraggableEvent, ui: DraggableData) => {
    const { x, y } = ui;
    sessionStorage.setItem(`${type}DragStyle`, JSON.stringify({ x, y, style }));
  };
  return (
    <Draggable
      defaultPosition={defaultPosition}
      nodeRef={ref as React.RefObject<HTMLElement>}
      onStop={(e, ui) => handleDrag(e, ui)}
    >
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
