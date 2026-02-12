import React, { useState, createContext } from "react";

export const CursorContext = createContext();

export const CursorProvider = ({ children }) => {
  const [cursorState, setCursorState] = useState("default");
  const [cursorText, setCursorText] = useState("");

  return (
    <CursorContext.Provider
      value={{ cursorState, setCursorState, cursorText, setCursorText }}
    >
      {children}
    </CursorContext.Provider>
  );
};
