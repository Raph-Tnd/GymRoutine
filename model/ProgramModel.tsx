import { SessionModel } from "./SessionModel";

export interface ProgramModel {
    name: string;
    sessions : SessionModel[];
}