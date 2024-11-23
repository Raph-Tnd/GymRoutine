import { useEffect } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { Button, Pressable, StyleProp, ViewStyle } from "react-native";
import { removeValue } from "@/components/global/Storage";
import React from "react";
import { useDispatch } from "react-redux";
import { reset, setUser, User } from "@/features/auth/authSlice";
import { AppDispatch } from "@/app/store";
import * as AuthSession from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { mainApi } from "@/features/api/apiSlice";

WebBrowser.maybeCompleteAuthSession();
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
	const dispatch = useDispatch<AppDispatch>();
	const [request, response, promptAsync] = AuthSession.useIdTokenAuthRequest({
		webClientId:
			"620859170647-2ih3o74dhd7qmhf4vglrh3ag1jse9bk7.apps.googleusercontent.com",
	});
	useEffect(() => {
		const validateUser = async () => {
			if (response?.type === "success") {
				const { id_token } = response.params;
				try {
					const result = await dispatch(
						mainApi.endpoints.connect.initiate(id_token),
					);
					if (result.isSuccess) {
						const user = TokenToUser(jwtDecode(id_token));
						dispatch(setUser(user));
					}
				} catch (error) {
					console.error("Failed to connect:", error);
				}
			}
		};
		validateUser();
	}, [response]);
	return <Button title={"Login with Google"} onPress={() => promptAsync()} />;
}

export function GoogleSignOut({
	children,
	style,
}: {
	children: React.ReactElement;
	style: StyleProp<ViewStyle>;
}) {
	const dispatch = useDispatch<AppDispatch>();
	const signOut = async () => {
		try {
			dispatch(reset());
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
