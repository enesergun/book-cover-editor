import { StyleState } from "@/models";
import Draggable from "react-draggable";

export default function DraggableText({
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
