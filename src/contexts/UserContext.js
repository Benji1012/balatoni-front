import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [jwToken, setJwToken] = useState(null);
    const [userName, setUserName] = useState(null);
    const [role, setRole] = useState(null);

    return (
        <UserContext.Provider value={{ userId, setUserId, jwToken, setJwToken, userName, setUserName, role, setRole }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);