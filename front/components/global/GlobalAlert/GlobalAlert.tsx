import { AppDispatch, RootState } from "@/app/store";
import { resetAlertMessage } from "@/features/alert/globalAlertSlice";
import BottomSheetStyle from "@/style/global/BottomSheet/BottomSheetStyle";
import GlobalAlertStyle from "@/style/global/GlobalAlert/GlobalAlertStyle";
import GlobalStyle from "@/style/global/GlobalStyle";
import { useEffect } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Animated, {
	SharedValue,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withDelay,
	withTiming,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";

export function GlobalAlert({
	duration = 250,
	children,
}: {
	duration?: number;
	children?: React.ReactElement;
}) {
	const dispatch = useDispatch<AppDispatch>();
	const isOpen = useSharedValue<boolean>(false);
	const globalAlertMessage = useSelector(
		(state: RootState) => state.globalAlert,
	);
	const backdropStyle = useAnimatedStyle(() => ({
		opacity: isOpen.value ? withTiming(1, { duration }) : 0,
		zIndex: isOpen.value
			? 3
			: withDelay(duration, withTiming(-1, { duration: 0 })),
	}));

	useEffect(() => {
		isOpen.value = globalAlertMessage != "";
	}, [globalAlertMessage]);
	return (
		<>
			<Animated.View style={[GlobalAlertStyle.backdrop, backdropStyle]}>
				<TouchableOpacity
					style={BottomSheetStyle.backdropTouch}
					onPress={() => {
						if (isOpen.value) {
							dispatch(resetAlertMessage());
						}
					}}
				>
					<View style={GlobalAlertStyle.sheet}>
						<Text style={GlobalAlertStyle.information}>
							{globalAlertMessage}
						</Text>
						<Pressable
							style={[GlobalAlertStyle.pressable]}
							onPress={() => {
								if (isOpen.value) {
									dispatch(resetAlertMessage());
								}
							}}
						>
							<Text style={GlobalStyle.pressableMainLabel}>
								Ok
							</Text>
						</Pressable>
					</View>
				</TouchableOpacity>
			</Animated.View>
		</>
	);
}
