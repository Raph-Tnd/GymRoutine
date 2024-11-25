import { View, Text, Pressable } from "react-native";
import { createContext, useEffect, useLayoutEffect, useState } from "react";
import { SessionModel } from "@/model/SessionModel";
import { FlatList } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import { MetricModel } from "@/model/MetricModel";
import { ExerciseModel, exerciseEquals } from "@/model/ExerciseModel";
import { ToolModel } from "@/model/ToolModel";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import {
	setCurrentProgram,
	setSessionIndex,
	updateSession,
} from "@/features/program/currentProgramSlice";
import SessionStyle from "@/style/Program/session/SessionStyle";
import { useNavigation } from "expo-router";
import { Colors } from "@/style/Colors";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { storeData } from "@/components/global/Storage";
import GlobalStyle from "@/style/global/GlobalStyle";
import Exercise from "@/components/exercise/Exercise";

export type TimerContextType = {
	currentTimer: number;
	setCurrentTimer: (timer: number) => void;
};

export const TimerContext = createContext<TimerContextType>(
	{} as TimerContextType,
);

export default function Session() {
	const navigation = useNavigation();
	const dispatch = useDispatch<AppDispatch>();
	const currentProgram = useSelector(
		(state: RootState) => state.currentProgram,
	);
	const [currentSession, setCurrentSession] = useState<SessionModel>();
	const [exerciseToUpdate, setExerciseToUpdate] = useState<ExerciseModel>();
	const [metricToUpdate, setMetricToUpdate] = useState<MetricModel>();
	const [toolToDisplay, setToolToDisplay] = useState<ToolModel>();
	const [currentTimer, setCurrentTimer] = useState(0);
	const isBottomSheetOpen = useSharedValue(false);
	const toggleSheet = () => {
		isBottomSheetOpen.value = !isBottomSheetOpen.value;
	};
	const onUpdateMetricHandler = (
		exercise: ExerciseModel,
		metric: MetricModel,
	) => {
		setToolToDisplay(undefined);
		setExerciseToUpdate(exercise);
		setMetricToUpdate(metric);
		toggleSheet();
	};
	const updateExercise = (
		exercise: Partial<ExerciseModel>,
		index: number,
	) => {
		setCurrentSession((prev) => {
			if (prev) {
				return {
					...prev,
					exercises: prev?.exercises.map((ex, i) =>
						i === index ? { ...ex, ...exercise } : ex,
					),
				};
			}
		});
	};
	/* const onUpdateToolHandler = (tool: ToolModel) => {
		setExerciseToUpdate(undefined);
		setMetricToUpdate(undefined);
		setToolToDisplay(tool);
		toggleSheet();
	}; */

	useEffect(() => {
		if (
			currentSession == undefined &&
			currentProgram.program.sessions.length > 0
		) {
			//Update session when data finished fetching

			setCurrentSession(
				JSON.parse(
					JSON.stringify(
						currentProgram.program.sessions[
							currentProgram.sessionIndex
						],
					),
				),
			);
		} else {
			//Store localy and call api when data is saved
			storeData("currentProgram", JSON.stringify(currentProgram.program));
			//TODO : call api
		}
	}, [currentProgram.program]);

	//Update session when user change index
	useEffect(() => {
		if (currentProgram.program.sessions.length > 0) {
			setCurrentSession(
				JSON.parse(
					JSON.stringify(
						currentProgram.program.sessions[
							currentProgram.sessionIndex
						],
					),
				),
			);
		}
	}, [currentProgram.sessionIndex]);

	//Update store when user input
	useEffect(() => {
		if (currentSession) {
			dispatch(updateSession(currentSession));
		}
	}, [currentSession]);
	useLayoutEffect(() => {
		if (currentProgram.program.sessions.length > 0) {
			navigation.setOptions({
				headerLeft: () => {
					return (
						currentProgram.sessionIndex > 0 && (
							<Pressable
								style={GlobalStyle.headerPressable}
								onPress={() =>
									dispatch(
										setSessionIndex(
											currentProgram.sessionIndex - 1,
										),
									)
								}
							>
								<ChevronLeft color={Colors.button_icon} />
							</Pressable>
						)
					);
				},
				headerRight: () => {
					return (
						currentProgram.sessionIndex <
							currentProgram.program.sessions.length - 1 && (
							<Pressable
								style={GlobalStyle.headerPressable}
								onPress={() =>
									dispatch(
										setSessionIndex(
											currentProgram.sessionIndex + 1,
										),
									)
								}
							>
								<ChevronRight color={Colors.button_icon} />
							</Pressable>
						)
					);
				},
			});
		}
	}, [currentProgram]);
	return (
		<TimerContext.Provider value={{ currentTimer, setCurrentTimer }}>
			<View style={[GlobalStyle.body, SessionStyle.body]}>
				{currentSession && (
					<>
						<Text style={SessionStyle.titleLabel}>
							{currentSession.name}
						</Text>
						<FlatList
							showsVerticalScrollIndicator={false}
							contentContainerStyle={SessionStyle.listContainer}
							style={GlobalStyle.list}
							data={currentSession.exercises}
							renderItem={({ item, index }) => (
								<Exercise
									exercise={item}
									index={index}
									updateExerciseMethod={updateExercise}
									callUpdateMetricMethod={
										onUpdateMetricHandler
									}
								/>
							)}
						/>
						{/* <ToolList
								callUpdateMethod={onUpdateToolHandler}
								exerciseTimers={currentSession.exercises.map(
									(ex) => ex.pauseTime,
								)}
							/> */}
						{/* Has to be in Session because absolute position inside a scrollview/flatlist isn't working */}
						{/* <BottomSheet
								isOpen={isBottomSheetOpen}
								toggleSheet={toggleSheet}
							>
								{metricToUpdate != undefined ? (
									<MetricUpdate
										metric={metricToUpdate}
										updateMethod={updateMetricOnExercise}
									/>
								) : toolToDisplay != undefined ? (
									<ToolDisplay
										tool={toolToDisplay}
										applyMethod={toggleSheet}
									/>
								) : undefined}
							</BottomSheet> */}
					</>
				)}
			</View>
		</TimerContext.Provider>
	);
}
