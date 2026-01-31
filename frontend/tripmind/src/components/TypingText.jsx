import { useEffect, useState } from "react";

export default function TypingText({ text, speed = 25 }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const words = text.split(" ");

    setDisplayed("");

    const interval = setInterval(() => {
      setDisplayed((prev) => prev + words[i] + " ");
      i++;
      if (i >= words.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <pre className="text-sm leading-relaxed whitespace-pre-wrap font-sans">
      {displayed}
    </pre>
  );
}
