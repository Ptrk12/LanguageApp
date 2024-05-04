import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <SettingsContext.Provider value={{
            isNotificationsEnabled, 
            setIsNotificationsEnabled,
            isDarkMode, 
            setIsDarkMode
        }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);
