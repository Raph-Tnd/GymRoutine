import { ProgramModel } from "@/model/ProgramModel";

const API_URL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "https://mavvin-api-beta-f4702ef3042c.herokuapp.com"
    : "https://mavvin-api-7f66466edb84.herokuapp.com";

interface QueryObject {
  [index: string]: string;
}

type MavvinKey = {
  MAVVIN_KEY: string;
};

export default class APISingleton {
  private static instance: APISingleton;
  private _api_key: string = "";

  public static getInstance() {
    if (!APISingleton.instance) {
      APISingleton.instance = new APISingleton();
    }
    return this.instance;
  }

  public async ApiKey(user_id: string) {
    if (this._api_key == "") {
      let mavvin_key_json = await this.GetApiKey(user_id);
      this._api_key = mavvin_key_json.MAVVIN_KEY;
    }
    return this._api_key;
  }

  private GetApiKey(user_id: string): Promise<MavvinKey> {
    return fetch(API_URL + "/get_api_key?user_id=" + user_id, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
        return undefined;
      });
  }

  public async GetProgramsSaved({
    user_id,
  }: {
    user_id: string;
  }): Promise<ProgramModel[]> {
    let mocked: ProgramModel = require("@/mocked/Program.json");
    let mocked2: ProgramModel = require("@/mocked/Program.json");
    mocked2.name = "Another 12 week programs";
    return [mocked, mocked2];

    let call_url = API_URL + "/programsSaved?user_id=" + user_id;
    try {
      let response = await fetch(call_url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "X-API-Key": await APISingleton.getInstance().ApiKey(user_id),
        },
      });
      return response.ok ? response.json() : [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
