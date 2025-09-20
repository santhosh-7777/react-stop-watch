import React, { useState, useRef } from "react";

export default function App() {
  const [time, setTime] = useState(0); // time in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);

  const formatTime = (ms) => {
    const hrs = String(Math.floor(ms / 3600000)).padStart(2, "0");
    const mins = String(Math.floor((ms % 3600000) / 60000)).padStart(2, "0");
    const secs = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
    const milli = String(ms % 1000).padStart(3, "0");
    return `${hrs}:${mins}:${secs}.${milli}`;
  };

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      const startTime = Date.now() - time; // continue from current time
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10); // update every 10ms
    }
  };

  const pause = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const reset = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const lap = () => {
    if (isRunning) {
      setLaps([...laps, formatTime(time)]);
    }
  };

  return (
    <div style={styles.container}>
      <h1>⏱ Stopwatch</h1>
      <div style={styles.time}>{formatTime(time)}</div>
      <div>
        <button style={styles.start} onClick={start}>Start</button>
        <button style={styles.pause} onClick={pause}>Pause</button>
        <button style={styles.reset} onClick={reset}>Reset</button>
        <button style={styles.lap} onClick={lap}>Lap</button>
      </div>
      <ul style={styles.laps}>
        {laps.map((lap, index) => (
          <li key={index}>Lap {index + 1}: {lap}</li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
    width: "350px",
    margin: "50px auto",
    fontFamily: "Arial, sans-serif"
  },
  time: {
    fontSize: "2rem",
    marginBottom: "20px"
  },
  start: {
    background: "#4caf50", color: "white", margin: "5px", padding: "10px 20px", border: "none", borderRadius: "6px", cursor: "pointer"
  },
  pause: {
    background: "#ff9800", color: "white", margin: "5px", padding: "10px 20px", border: "none", borderRadius: "6px", cursor: "pointer"
  },
  reset: {
    background: "#f44336", color: "white", margin: "5px", padding: "10px 20px", border: "none", borderRadius: "6px", cursor: "pointer"
  },
  lap: {
    background: "#2196f3", color: "white", margin: "5px", padding: "10px 20px", border: "none", borderRadius: "6px", cursor: "pointer"
  },
  laps: {
    textAlign: "left",
    listStyle: "none",
    padding: "0",
    marginTop: "15px"
  }
};
