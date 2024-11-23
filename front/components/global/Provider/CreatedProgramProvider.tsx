import { createContext, useEffect, useState } from "react";
import { getMyStringValue, storeData } from "../Storage";
import { ProgramModel, newProgram } from "@/model/ProgramModel";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

export type CreatedProgramContextType = {
	currentCreatedProgram: ProgramModel | undefined;
	setCurrentCreatedProgram: (program: ProgramModel) => void;
};

export const CreatedProgramContext = createContext<CreatedProgramContextType>(
	{} as CreatedProgramContextType,
);

export function CreatedProgramProvider({
	children,
}: {
	children: React.ReactElement;
}) {
	const [currentCreatedProgram, setCurrentCreatedProgram] =
		useState<ProgramModel>();
	const user = useSelector((state: RootState) => state.auth.user);

	useEffect(() => {
		if (currentCreatedProgram != undefined) {
			storeData("createdProgram", JSON.stringify(currentCreatedProgram));
		}
	}, [currentCreatedProgram]);

	useEffect(() => {
		const getStoredProgram = async () => {
			let storedProgram = await getMyStringValue("createdProgram");
			if (storedProgram) {
				let newProgram: ProgramModel = JSON.parse(storedProgram);
				setCurrentCreatedProgram(newProgram);
			} else {
				if (user) setCurrentCreatedProgram(newProgram(user.user.email));
			}
		};
		if (!currentCreatedProgram) {
			getStoredProgram();
		}
	}, []);
	return (
		<CreatedProgramContext.Provider
			value={{
				currentCreatedProgram,
				setCurrentCreatedProgram,
			}}
		>
			{children}
		</CreatedProgramContext.Provider>
	);
}
