import Quill from "quill";
import "quill/dist/quill.bubble.css";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import { useEffect, useRef } from "react";

export default function WritePost() {
  const quillRef = useRef<Quill>();

  useEffect(() => {
    if (!quillRef.current)
      quillRef.current = new Quill(`#quill`, {
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            ["image", "code-block"],
          ],
        },
        placeholder: "Compose an epic...",
        theme: "snow", // or 'bubble'
      });
  }, []);

  return (
    <>
      <div id={"quill"}>hello</div>
    </>
  );
}
