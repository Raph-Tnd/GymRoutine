import { ExerciseModel } from "@/model/ExerciseModel";
import { MetricModel } from "@/model/MetricModel";
import BottomSheetStyle from "@/style/global/BottomSheetStyle";
import { Text, TouchableOpacity } from "react-native";
import Animated, { SharedValue, useAnimatedStyle, useDerivedValue, useSharedValue, withDelay, withTiming } from "react-native-reanimated";

export function MetricUpdateBottomSheet({isOpen, toggleSheet, duration = 250, children} : {isOpen : SharedValue<boolean>, toggleSheet : () => void, duration? : number, children : React.ReactElement}) {
    const height = useSharedValue(0);
    const progress = useDerivedValue(() =>
        withTiming(isOpen.value ? 0 : 1, { duration })
    );
    const sheetStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: progress.value * 2 * height.value }],
    }));
    const backdropStyle = useAnimatedStyle(() => ({
        opacity: 1 - progress.value,
        zIndex: isOpen.value ? 1 : withDelay(duration, withTiming(-1, { duration: 0 })),
    }));
    
    return (
        <>
            <Animated.View style={[BottomSheetStyle.backdrop, backdropStyle]}>
                <TouchableOpacity style={BottomSheetStyle.backdropTouch} onPress={()=> {
                    if(isOpen.value){
                        toggleSheet();
                    }
                }}/>
            </Animated.View>
            <Animated.View
                onLayout={(e) => {
                    height.value = e.nativeEvent.layout.height;
                }}
                style={[BottomSheetStyle.sheet, sheetStyle]}
            >
            {children}
            </Animated.View>
        </>
    );
}