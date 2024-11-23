import { storeData } from "@/components/global/Storage";
import { GoogleToken } from "@/model/Auth/GoogleToken";
import { ProgramModel } from "@/model/ProgramModel";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

interface QueryObject {
	[index: string]: string;
}

const url =
	!process.env.NODE_ENV || process.env.NODE_ENV === "development"
		? "http://141.145.201.163:8080/GymRoutine"
		: "http://141.145.201.163:8080/GymRoutine";
export default class APISingleton {
	private static instance: APISingleton;
	private access_token: string = "";
	private access_token_expire_time: number = Date.now() / 1000;

	public static getInstance() {
		if (!APISingleton.instance) {
			APISingleton.instance = new APISingleton();
		}
		return this.instance;
	}

	public async getConnect({ code }: { code: string }): Promise<string> {
		try {
			let response = await fetch(url + "/connectionToken?code=" + code, {
				method: "GET",
				headers: {
					Accept: "application/json",
				},
			});
			if (response.ok) {
				let token: GoogleToken = await response.json();
				this.access_token = token.accessToken;
				this.access_token_expire_time =
					Date.now() / 1000 + token.expiresIn - 60;
				if(Platform.OS === 'web'){
					await storeData("google_refresh_token", token.refreshToken);
				}
				else{
					await SecureStore.setItemAsync(
						"google_refresh_token",
						token.refreshToken,
					);
				}
				return token.idToken;
			} else {
				return "";
			}
		} catch (error) {
			console.error(error);
			return "";
		}
	}
	public async getProgramsSaved({
		user_id,
	}: {
		user_id: string;
	}): Promise<ProgramModel[]> {
		/* let mocked: ProgramModel = require("@/mocked/Program.json");
		return [mocked]; */

		try {
			let response = await fetch(
				url + "/programsSaved?user_id=" + user_id,
				{
					method: "GET",
					headers: {
						Accept: "application/json",
					},
				},
			);
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
		return fetch(url + "/saveProgram", {
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
		return fetch(url + "/deleteProgram", {
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
		/* let mocked: ProgramModel = require("@/mocked/Program.json");
		return [mocked]; */
		return fetch(
			url + "/searchProgram?user_id=" + user_id + "&query=" + query,
			{
				method: "GET",
				headers: {
					Accept: "application/json",
				},
			},
		)
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
