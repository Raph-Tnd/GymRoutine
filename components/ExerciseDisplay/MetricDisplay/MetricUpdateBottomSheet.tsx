import { ExerciseModel } from "@/model/ExerciseModel";
import { MetricModel } from "@/model/MetricModel";
import MetricUpdateBottomSheetStyme from "@/style/ExerciseDisplay/MetricDisplay/MetricUpdateBottomSheetStyle";
import { Text, TouchableOpacity } from "react-native";
import Animated, { SharedValue, useAnimatedStyle, useDerivedValue, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import MetricUpdate from "./MetricUpdate";

export function MetricUpdateBottomSheet({exerciseToUpdate, metricToUpdate, isOpen, toggleSheet, duration = 250, onUpdateMethod} : {exerciseToUpdate: ExerciseModel, metricToUpdate: MetricModel, isOpen : SharedValue<boolean>, toggleSheet : () => void, duration? : number, onUpdateMethod : (exercise: ExerciseModel) => void}) {
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
    const updateMetricOnExercise = (metric : MetricModel) => {
        exerciseToUpdate.metrics[exerciseToUpdate.metrics.findIndex(x => x.name === metric.name)] = metric;
        onUpdateMethod(exerciseToUpdate);
    };
    return (
        <>
            <Animated.View style={[MetricUpdateBottomSheetStyme.backdrop, backdropStyle]}>
                <TouchableOpacity style={MetricUpdateBottomSheetStyme.backdropTouch} onPress={()=> {
                    if(isOpen.value){
                        toggleSheet();
                    }
                }}/>
            </Animated.View>
            <Animated.View
                onLayout={(e) => {
                    height.value = e.nativeEvent.layout.height;
                }}
                style={[MetricUpdateBottomSheetStyme.sheet, sheetStyle]}
            >
                <Text style={MetricUpdateBottomSheetStyme.name}>{metricToUpdate.name}</Text>
                <MetricUpdate metric={metricToUpdate} updateMethod={updateMetricOnExercise}/>
                
            </Animated.View>
        </>
    );
}