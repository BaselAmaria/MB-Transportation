import React, { createContext, useRef, useContext } from 'react';

// Create a context to store section refs
const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  // Create refs for the sections
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);

  return (
    <ScrollContext.Provider value={{ section1Ref, section2Ref }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollContext = () => useContext(ScrollContext);
