import { SessionModel } from "./SessionModel";

export interface ProgramModel {
    name: string;
    author: string;
    sessions: SessionModel[];
}