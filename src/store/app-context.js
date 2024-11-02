// AppContext.js
import React, { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({
  children,
  value
}) => {
  return (
    <AppContext.Provider
      value={value}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
