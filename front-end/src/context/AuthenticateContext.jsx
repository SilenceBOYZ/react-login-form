import { createContext, useContext, useState } from "react";

const AuthenticateContext = createContext();


function AuthenticateProvider({ children }) {
  const [userInfor, setUserInfor] = useState(
    sessionStorage.getItem("user-login") || null
  );

  return (
    <AuthenticateContext.Provider value={{ userInfor, setUserInfor }}>
      {children}
    </AuthenticateContext.Provider>
  );
}

function useAuthContext() {
  const context = useContext(AuthenticateContext);
  if (context === undefined)
    throw new Error("The context was used outside of AuthenticateProvider");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthenticateProvider, useAuthContext };
