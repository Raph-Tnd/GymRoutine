import { GoogleOAuthProvider } from "@react-oauth/google";
import { createContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import { getMyStringValue, storeData } from "../Storage";

export type User = {
  user: {
    id: string;
    name: string | null;
    email: string;
    photo: string | null;
    familyName: string | null;
    givenName: string | null;
  };
  scopes: string[];
  /**
   * JWT (JSON Web Token) that serves as a secure credential for your user's identity.
   */
  idToken: string | null;
  /**
   * Not null only if a valid webClientId and offlineAccess: true was
   * specified in configure().
   */
  serverAuthCode: string | null;
};

export type AuthContextType = {
  currentUser: User | undefined;
  setCurrentUser: (user: User | undefined) => void;
  isValidatingUser: boolean;
  setIsValidatingUser: (bool: boolean) => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export function AuthProvider({ children }: { children: React.ReactElement }) {
  const [currentUser, setCurrentUser] = useState<User>();
  const [isValidatingUser, setIsValidatingUser] = useState<boolean>(false);
  useEffect(() => {
    if (currentUser) {
      storeData("user", JSON.stringify(currentUser));
    }
  }, [currentUser]);
  useEffect(() => {
    const getStoredUser = async () => {
      let storedUser = await getMyStringValue("user");
      if (storedUser) {
        setIsValidatingUser(true);
        let newUser: User = JSON.parse(storedUser);
        //TODO : Validate User
        setCurrentUser(newUser);
        setIsValidatingUser(false);
      }
    };
    if (!currentUser) {
      getStoredUser();
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isValidatingUser,
        setIsValidatingUser,
      }}
    >
      {Platform.OS != "ios" && Platform.OS != "android" ? (
        <GoogleOAuthProvider clientId="620859170647-2ih3o74dhd7qmhf4vglrh3ag1jse9bk7.apps.googleusercontent.com">
          {children}
        </GoogleOAuthProvider>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
