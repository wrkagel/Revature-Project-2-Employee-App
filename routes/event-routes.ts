import axios, { AxiosResponse } from "axios";
import axiosErrorHandler from "../error-handlers/axios-error-handler";
import Activity from "../models/activity";


export default class EventRoutes {

    private static address:string = "http://20.75.185.122:3000";

    public static async getEvents(): Promise<AxiosResponse<Activity[]> | void> {
        return axios.get<Activity[]>(`${this.address}/activities`)
        .then(response => response)
        .catch((error) => axiosErrorHandler(error));
    }

    public static async createEvent(event:Activity, controller:AbortController): Promise<AxiosResponse<Activity> | void> {
        return axios.post<Activity>(`${this.address}/activities`, event, {signal:controller.signal})
        .then(response => response)
        .catch((error) => axiosErrorHandler(error));
    }

    public static async cancelEvent(id:string): Promise<AxiosResponse<Activity> | void> {
        return axios.patch<Activity>(`${this.address}/activities/${id}/cancel`)
        .then(response => response)
        .catch((error) => axiosErrorHandler(error));
    }
}