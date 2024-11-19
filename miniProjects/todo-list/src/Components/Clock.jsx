import React, { useState, useEffect } from "react";

function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  return (
    <div
      style={{
        fontSize: "1.2rem",
        fontWeight: "bold",
        marginBottom: "20px",
        marginLeft: "40px",
        color: "black",
        fontFamily: "Courier New",
      }}
    >
      <div>{currentTime.toLocaleDateString()}</div>
      <div>{currentTime.toLocaleTimeString()}</div>
    </div>
  );
}

export default Clock;
