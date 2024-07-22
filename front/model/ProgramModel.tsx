import { SessionModel, newSession, validateSession } from "./SessionModel";

export interface ProgramModel {
  name: string;
  author: string;
  sessions: SessionModel[];
}

export function validateProgram(program: ProgramModel): boolean {
  return (
    program.name != "" &&
    program.sessions.reduce(
      (previous, session) => previous && validateSession(session),
      true,
    )
  );
}

export function newProgram(user: string): ProgramModel {
  return {
    name: "",
    author: user,
    sessions: [newSession(1)],
  };
}
