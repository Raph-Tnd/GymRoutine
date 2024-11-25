import { useEffect } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { Pressable, StyleProp, Text, ViewStyle } from "react-native";
import { removeValue } from "@/components/global/Storage";
import React from "react";
import { useDispatch } from "react-redux";
import { reset, setUser, User } from "@/features/auth/authSlice";
import { AppDispatch } from "@/app/store";
import * as AuthSession from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { mainApi } from "@/features/api/apiSlice";
import { makeRedirectUri } from "expo-auth-session";
import { ArrowRight } from "lucide-react-native";
import { Colors } from "@/style/Colors";
import LoginStyle from "@/style/LoginStyle";
import Svg, { Path } from "react-native-svg";
import { useRouter } from "expo-router";

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
	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();
	const [request, response, promptAsync] = AuthSession.useIdTokenAuthRequest({
		webClientId:
			"620859170647-2ih3o74dhd7qmhf4vglrh3ag1jse9bk7.apps.googleusercontent.com",
		iosClientId:
			"620859170647-a6dn90fvk2p64klujjie3hefm603cvvc.apps.googleusercontent.com",
		redirectUri: makeRedirectUri(),
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
						router.replace("/");
					}
				} catch (error) {
					console.error("Failed to connect:", error);
				}
			}
		};
		validateUser();
	}, [response]);
	return (
		<Pressable onPress={() => promptAsync()} style={LoginStyle.loginButton}>
			<Svg width={24} height={24} viewBox="0 0 24 24">
				<Path
					d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
					fill="#4285F4"
				/>
				<Path
					d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
					fill="#34A853"
				/>
				<Path
					d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
					fill="#FBBC05"
				/>
				<Path
					d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
					fill="#EA4335"
				/>
			</Svg>
			<Text style={LoginStyle.loginLabel}>Login with Google</Text>
			<ArrowRight color={Colors.text_primary} />
		</Pressable>
	);
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
