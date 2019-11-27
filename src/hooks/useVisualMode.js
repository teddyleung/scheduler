import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState([initial]);

  const transition = (next, replaceBool = false) => {
    if (replaceBool) {
      setMode(prev => prev.slice(0, prev.length - 1).concat(next));
    } else {
      setMode(prev => [...prev, next]);
    }
  }

  const back = () => {
    setMode(prev => prev.slice(0, Math.max(prev.length - 1, 1)));
  }

  return {
    mode: mode[mode.length - 1],
    transition,
    back
  };
}