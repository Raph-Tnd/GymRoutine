import { ProgramModel } from "@/model/ProgramModel";

interface QueryObject {
	[index: string]: string;
}

export default class APISingleton {
	private static instance: APISingleton;

	public static getInstance() {
		if (!APISingleton.instance) {
			APISingleton.instance = new APISingleton();
		}
		return this.instance;
	}

	public async getProgramsSaved({
		user_id,
	}: {
		user_id: string;
	}): Promise<ProgramModel[]> {
		let mocked: ProgramModel = require("@/mocked/Program.json");
		return [mocked];

		try {
			let response = await fetch("/programsSaved?user_id=" + user_id, {
				method: "GET",
				headers: {
					Accept: "application/json",
				},
			});
			return response.ok ? response.json() : [];
		} catch (error) {
			console.log(error);
			return [];
		}
	}

	public async postSaveProgram({
		user_id,
		program,
	}: {
		user_id: string;
		program: ProgramModel;
	}): Promise<boolean> {
		const body: QueryObject = {
			user_id: user_id,
			program: JSON.stringify(program),
		};
		const formBody = Object.keys(body)
			.map(
				(key) =>
					encodeURIComponent(key) +
					"=" +
					encodeURIComponent(body[key]),
			)
			.join("&");

		return true;
		return fetch("/saveProgram", {
			method: "POST",
			headers: {
				Accept: "application/json",
				body: formBody,
			},
		})
			.then((response) => {
				return response.ok;
			})
			.catch((error) => {
				console.log(error);
				return false;
			});
	}
	public async deleteSavedProgram({
		user_id,
		program,
	}: {
		user_id: string;
		program: ProgramModel;
	}): Promise<boolean> {
		const body: QueryObject = {
			user_id: user_id,
			program: JSON.stringify(program),
		};
		const formBody = Object.keys(body)
			.map(
				(key) =>
					encodeURIComponent(key) +
					"=" +
					encodeURIComponent(body[key]),
			)
			.join("&");
		return true;
		return fetch("/deleteProgram", {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				body: formBody,
			},
		})
			.then((response) => {
				return response.ok;
			})
			.catch((error) => {
				console.log(error);
				return false;
			});
	}

	public async getSearchedPrograms({
		user_id,
		query,
	}: {
		user_id: string;
		query: string;
	}): Promise<ProgramModel[]> {
		let mocked: ProgramModel = require("@/mocked/Program.json");
		return [mocked];
		return fetch("/searchProgram?user_id=" + user_id + "&query=" + query, {
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		})
			.then((response) => response.json())
			.then((response) => {
				return response.ok ? response.json() : [];
			})
			.catch((error) => {
				console.log(error);
				return [];
			});
	}
}
