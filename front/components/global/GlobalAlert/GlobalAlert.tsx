import BottomSheetStyle from "@/style/global/BottomSheet/BottomSheetStyle";
import GlobalAlertStyle from "@/style/global/GlobalAlert/GlobalAlertStyle";
import { TouchableOpacity, View } from "react-native";
import Animated, {
	SharedValue,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withDelay,
	withTiming,
} from "react-native-reanimated";

export function GlobalAlert({
	isOpen,
	toggleSheet,
	duration = 250,
	children,
}: {
	isOpen: SharedValue<boolean>;
	toggleSheet: () => void;
	duration?: number;
	children?: React.ReactElement;
}) {
	const progress = useDerivedValue(() =>
		withTiming(isOpen.value ? 0 : 1, { duration }),
	);
	const backdropStyle = useAnimatedStyle(() => ({
		opacity: 1 - progress.value,
		zIndex: isOpen.value
			? 3
			: withDelay(duration, withTiming(-1, { duration: 0 })),
	}));

	return (
		<>
			<Animated.View style={[GlobalAlertStyle.backdrop, backdropStyle]}>
				<TouchableOpacity
					style={BottomSheetStyle.backdropTouch}
					onPress={() => {
						if (isOpen.value) {
							toggleSheet();
						}
					}}
				>
					<View style={GlobalAlertStyle.sheet}>{children}</View>
				</TouchableOpacity>
			</Animated.View>
		</>
	);
}
