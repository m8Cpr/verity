import React, { createContext, useState} from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {

    const getInitialTheme = () => {
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return prefersDarkScheme;
    };

    const [isDark, setDark] = useState(getInitialTheme);

    return (
        <ThemeContext.Provider value={{isDark, setDark}}>
            { children }
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeProvider };