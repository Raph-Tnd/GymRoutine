CREATE DATABASE gym_routine;

\c gym_routine;

-- Create the user table
CREATE TABLE userApp (
    user_id text PRIMARY KEY,
    user_type text NOT NULL
);

-- Create the program table
CREATE TABLE publicProgram (
    program_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    content JSONB NOT NULL,
	private BOOLEAN NOT NULL
);

CREATE TABLE localProgram (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id text,
	program_id INTEGER,
	content JSONB NOT NULL,
	FOREIGN KEY (program_id) REFERENCES publicProgram (program_id) ON DELETE SET NULL
);

CREATE TABLE privateProgramAccess (
	program_id INTEGER ,
	user_id text ,
	FOREIGN KEY (program_id) REFERENCES publicProgram (program_id) ON DELETE CASCADE,
	FOREIGN KEY (user_id) REFERENCES userApp (user_id) ON DELETE CASCADE,
	PRIMARY KEY (program_id, user_id)
);

