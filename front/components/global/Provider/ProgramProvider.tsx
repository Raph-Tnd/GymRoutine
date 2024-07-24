import { createContext, useEffect, useState } from "react";
import { getMyStringValue, storeData } from "../Storage";
import { ProgramModel } from "@/model/ProgramModel";

export type ProgramContextType = {
	currentProgram: ProgramModel | undefined;
	setCurrentProgram: (program: ProgramModel | undefined) => void;
	currentSessionIndex: number;
	setCurrentSessionIndex: (index: number) => void;
};

export const ProgramContext = createContext<ProgramContextType>(
	{} as ProgramContextType,
);

export function ProgramProvider({
	children,
}: {
	children: React.ReactElement;
}) {
	const [currentProgram, setCurrentProgram] = useState<ProgramModel>();
	const [currentSessionIndex, setCurrentSessionIndex] = useState(0);

	useEffect(() => {
		if (currentProgram != undefined) {
			storeData("program", JSON.stringify(currentProgram));
			storeData("sessionIndex", JSON.stringify(currentSessionIndex));
		}
	}, [currentProgram, currentSessionIndex]);

	useEffect(() => {
		const getStoredProgram = async () => {
			let storedProgram = await getMyStringValue("program");
			let storedIndex = await getMyStringValue("sessionIndex");
			if (storedProgram) {
				let newProgram: ProgramModel = JSON.parse(storedProgram);
				setCurrentProgram(newProgram);
				let newSessionIndex: number = storedIndex
					? JSON.parse(storedIndex)
					: 0;
				setCurrentSessionIndex(newSessionIndex);
			}
		};
		if (!currentProgram) {
			getStoredProgram();
		}
	}, []);
	return (
		<ProgramContext.Provider
			value={{
				currentProgram,
				setCurrentProgram,
				currentSessionIndex,
				setCurrentSessionIndex,
			}}
		>
			{children}
		</ProgramContext.Provider>
	);
}
