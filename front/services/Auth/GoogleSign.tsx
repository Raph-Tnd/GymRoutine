import {
	GoogleSignin,
	GoogleSigninButton,
	statusCodes,
} from "@react-native-google-signin/google-signin";
import { useContext } from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import APISingleton from "../services/APISingleton";
import { AuthContext } from "@/components/global/Provider/AuthProvider";

GoogleSignin.configure({
	scopes: [], // what API you want to access on behalf of the user, default is email and profile
	// webClientId: '<FROM DEVELOPER CONSOLE>', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
});

export const getCurrentUser = async () => {
	const currentUser = await GoogleSignin.getCurrentUser();
	return currentUser;
};

export function GoogleSign() {
	const { setCurrentUser, setIsValidatingUser } = useContext(AuthContext);
	const signIn = async () => {
		setIsValidatingUser(true);
		try {
			await GoogleSignin.hasPlayServices();
			const userInfo = await GoogleSignin.signIn();
			if (
				await APISingleton.getInstance().PostUserInfo(
					userInfo.user.email,
				)
			) {
				setCurrentUser(userInfo);
			}
		} catch (error: any) {
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
				// user cancelled the login flow
			} else if (error.code === statusCodes.IN_PROGRESS) {
				// operation (e.g. sign in) is in progress already
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
				// play services not available or outdated
			} else {
				// some other error happened
			}
		}
		setIsValidatingUser(false);
	};
	return (
		<>
			{
				<GoogleSigninButton
					size={GoogleSigninButton.Size.Wide}
					color={GoogleSigninButton.Color.Dark}
					onPress={signIn}
				/>
			}
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
			await GoogleSignin.signOut();
			setCurrentUser(undefined);
			// setState({ user: null }); // Remember to remove the user from your app's state as well
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
