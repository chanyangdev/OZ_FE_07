import React, { useState, useEffect } from "react";
import postit from "../assets/post-it.svg";

function PostItWithText() {
  const [quote, setQuote] = useState(""); // State to store the quote
  const [fontSize, setFontSize] = useState("2rem"); // Initial large font size

  // Fetch a random inspirational quote from your API
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch(
          "https://quotes-api-self.vercel.app/quote"
        );
        if (!response.ok) throw new Error("Failed to fetch quote");
        const data = await response.json();
        setQuote(data.quote || "Default fallback quote");
      } catch (error) {
        console.error(error);
        setQuote("Stay positive, work hard, and make it happen!");
      }
    };

    fetchQuote();
  }, []);

  // Adjust font size dynamically to fill the post-it
  useEffect(() => {
    const adjustFontSize = () => {
      const textContainer = document.getElementById("quote-container");
      if (textContainer) {
        const { scrollHeight, scrollWidth, clientHeight, clientWidth } =
          textContainer;

        if (scrollHeight > clientHeight || scrollWidth > clientWidth) {
          setFontSize((prevSize) => {
            const newSize = parseFloat(prevSize) - 0.1;
            return newSize > 0.5 ? `${newSize}rem` : prevSize; // Prevent font size from getting too small
          });
        }
      }
    };

    adjustFontSize();
  }, [quote]);

  return (
    <div
      style={{
        position: "relative",
        width: "300px", // Post-it width
        height: "300px", // Post-it height
      }}
    >
      <img
        src={postit}
        alt="Post-it Note"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      <div
        id="quote-container"
        style={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "80%", // Use almost all of the post-it area
          height: "80%",
          fontSize: fontSize,
          fontWeight: "bold",
          fontFamily: "Courier New, monospace",
          textAlign: "center",
          color: "#333",
          overflow: "hidden",
          wordWrap: "break-word",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column", // Ensures text wraps naturally
        }}
      >
        {quote}
      </div>
    </div>
  );
}

export default PostItWithText;
