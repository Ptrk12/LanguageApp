import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [language, setLanguage] = useState("English");

    console.log('Language set to:', language);

    return (
        <SettingsContext.Provider value={{
            isNotificationsEnabled, 
            setIsNotificationsEnabled,
            isDarkMode, 
            setIsDarkMode,
            language,
            setLanguage
        }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);
