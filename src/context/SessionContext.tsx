import React, { createContext, useContext, useState } from 'react';

const SessionContext = createContext({
  mSessionToken: '0',
  setmSessionToken: (token: string) => {},
});

export const SessionProvider = ({ children, initialToken = '0' }) => {
  const [mSessionToken, setmSessionToken] = useState(initialToken);

  return (
    <SessionContext.Provider value={{ mSessionToken, setmSessionToken }}>
      {children}
    </SessionContext.Provider>
  );
};


export const useSession = () => useContext(SessionContext);
