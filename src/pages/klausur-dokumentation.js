import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Navbar from "../components/Navbar";

export default function KlausurDokumentation() {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/content/klausurdokuprojekt.md")
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar title="EduGames (DE)" />
      <div className="max-w-5xl mx-auto p-4">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
