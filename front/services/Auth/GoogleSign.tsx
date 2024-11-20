import { useGoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { Button, Pressable, StyleProp, ViewStyle } from "react-native";
import { AuthContext, User } from "@/components/global/Provider/AuthProvider";
import { removeValue } from "@/components/global/Storage";
import APISingleton from "../APISingleton";
import React from "react";

function TokenToUser(userInfo: JwtPayload): User {
	let newUser: User = {
		user: {
			id: "sub" in userInfo ? (userInfo.sub as string) : "",
			email: "email" in userInfo ? (userInfo.email as string) : "",
			familyName:
				"family_name" in userInfo
					? (userInfo.family_name as string)
					: null,
			givenName:
				"given_name" in userInfo
					? (userInfo.given_name as string)
					: null,
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
	const googleLogin = useGoogleLogin({
		flow: "auth-code",
		redirect_uri: "http://localhost:8081",
		onSuccess: async (codeResponse) => {
			let idToken = await APISingleton.getInstance().getConnect({
				code: codeResponse.code,
			});
			if (idToken != "") {
				setCurrentUser(TokenToUser(jwtDecode(idToken)));
			}
		},
		onError: (errorResponse) => console.log(errorResponse),
	});
	return <Button title={"Login with Google"} onPress={googleLogin} />;
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
