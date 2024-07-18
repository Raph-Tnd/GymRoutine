import { GoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { AuthContext, User } from "@/components/global/Provider/AuthProvider";
import { removeValue } from "@/components/global/Storage";

function TokenToUser(userInfo: JwtPayload): User {
  let newUser: User = {
    user: {
      id: "sub" in userInfo ? (userInfo.sub as string) : "",
      email: "email" in userInfo ? (userInfo.email as string) : "",
      familyName:
        "family_name" in userInfo ? (userInfo.family_name as string) : null,
      givenName:
        "given_name" in userInfo ? (userInfo.given_name as string) : null,
      name: "name" in userInfo ? (userInfo.name as string) : null,
      photo: "picture" in userInfo ? (userInfo.picture as string) : null,
    },
    scopes: [],
    idToken: null,
    serverAuthCode: null,
  };
  return newUser;
}

export function GoogleSign() {
  const { setCurrentUser, setIsValidatingUser } = useContext(AuthContext);
  const ValidateUserAccount = async (user: User) => {
    setIsValidatingUser(true);
    //TODO : Validate user
    setCurrentUser(user);
    setIsValidatingUser(false);
  };
  return (
    <>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (credentialResponse.credential) {
            let newUser = TokenToUser(jwtDecode(credentialResponse.credential));
            ValidateUserAccount(newUser);
          }
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </>
  );
}

export function GoogleSignOut({
  children,
  style,
}: {
  children: React.ReactElement;
  style: StyleProp<ViewStyle>;
}) {
  const { setCurrentUser } = useContext(AuthContext);
  const signOut = async () => {
    try {
      setCurrentUser(undefined);
      removeValue("user");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Pressable style={style} onPress={signOut}>
      {children}
    </Pressable>
  );
}
