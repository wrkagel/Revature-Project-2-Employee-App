import axios, { AxiosResponse } from "axios";
import axiosErrorHandler from "../error-handlers/axios-error-handler";
import Activity from "../models/activity";


export default class EventRoutes {

    private static address:string = "http://20.72.189.253:3000";

    public static async getEvents(): Promise<AxiosResponse<Activity[]> | void> {
        return axios.get<Activity[]>(`${this.address}/activities`)
        .then(response => response)
        .catch((error) => axiosErrorHandler(error));
      }
}