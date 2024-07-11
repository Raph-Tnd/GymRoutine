import MetricUpdateStyle from "@/style/ExerciseDisplay/MetricUpdateStyle";
import { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import Animated, { SharedValue, useAnimatedStyle, useDerivedValue, useSharedValue, withDelay, withTiming } from "react-native-reanimated";

export function MetricUpdate({isOpen, toggleSheet, duration = 500} : {isOpen : SharedValue<boolean>, toggleSheet : () => void, duration? : number}) {
    const height = useSharedValue(0);
    const progress = useDerivedValue(() =>
        withTiming(isOpen.value ? 0 : 1, { duration })
    );
    const sheetStyle = useAnimatedStyle(() => ({
                transform: [{ translateY: progress.value * 2 * height.value }],
    }));
    const backdropStyle = useAnimatedStyle(() => ({
        opacity: 1 - progress.value,
        zIndex: isOpen.value
            ? 1
            : withDelay(duration, withTiming(-1, { duration: 0 })),
    }));
    useEffect(() => {
        console.log(isOpen.value);
    })
    return (
        <>
            <Animated.View style={[MetricUpdateStyle.backdrop, backdropStyle]}>
                <TouchableOpacity style={MetricUpdateStyle.backdropTouch} onPress={toggleSheet}/>
            </Animated.View>
            <Animated.View
            onLayout={(e) => {
                height.value = e.nativeEvent.layout.height;
            }}
            style={[MetricUpdateStyle.sheet, sheetStyle]}>
                <Text>This is a Test</Text>
            </Animated.View>
        </>
    );
}