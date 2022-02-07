import axios, { AxiosResponse } from "axios";
import axiosErrorHandler from "../error-handlers/axios-error-handler";
import Employee from "../models/employee";
import WorkLog from "../models/worklog";


export default class EmployeeRoutes {
    
    private static address:string = "http://20.72.189.253:3000"

    public static async logIn(loginPayload:{username:string, password:string}): Promise<AxiosResponse<Employee> | void> {
        
        return axios.patch<Employee>(`${this.address}/login`, loginPayload)
            .then((r) => r)
            .catch((error) => {axiosErrorHandler(error)});
    }

    public static async getWorkLogs(id: number): Promise<AxiosResponse<WorkLog[]> | void>{
        return axios.get<WorkLog[]>(`${this.address}/employees/${id}/worklogs`)
            .then((r) => r)
            .catch((error) => {axiosErrorHandler(error)});

    }

    public static async checkInOut( id: number, submission:{action: "CHECKIN" | "CHECKOUT"}){
        return axios.post(`${this.address}/employees/${id}/worklogs`, submission)
        .then((r) => r)
        .catch((error) => {axiosErrorHandler(error)});
    }

    

}