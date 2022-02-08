import axios, { AxiosResponse } from "axios";
import axiosErrorHandler from "../error-handlers/axios-error-handler";
import ServiceRequest from "../models/service-request";


export default class OrderRoutes{

    private static address:string = "http://20.72.189.253:3000"

    public static async getOrders(): Promise<AxiosResponse<ServiceRequest[]> | void> {
        return axios.get<ServiceRequest[]>(`${this.address}/servicerequests`)
        .then(response => response)
        .catch((error) => axiosErrorHandler(error));
    }

    public static async updateOrder(order:ServiceRequest): Promise<AxiosResponse<ServiceRequest> | void> {
        return axios.patch(`${this.address}/servicerequests/${order.id}`, {status:order.status})
        .then(response => response)
        .catch((error) => axiosErrorHandler(error));
    }



}