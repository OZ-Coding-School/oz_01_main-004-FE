import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CustomToolbar } from "./custom";

function Write() {
  const module = {
    toolbar: {
      container: "#toolbar",
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "align",
    "color",
    "background",
    "image",
  ];

  const [text, setText] = useState<string>("");

  const handleText = (value: any) => {
    console.log(value);
    setText(value);
  };

  return (
    <>
      <div>
        <CustomToolbar />
        <ReactQuill
          modules={module}
          formats={formats}
          value={text}
          onChange={handleText}
        />
      </div>
    </>
  );
}

export default Write;
