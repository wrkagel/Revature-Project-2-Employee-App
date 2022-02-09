import axios, { AxiosResponse } from "axios";
import axiosErrorHandler from "../error-handlers/axios-error-handler";
import Employee from "../models/employee";
import WorkLog from "../models/worklog";


export default class EmployeeRoutes {
    
    private static address:string = "http://20.75.185.122:3000"

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

    public static async getLatestWorkLogByEmployee(): Promise<AxiosResponse<(WorkLog & {fname:string, lname:string})[]> | void>{
        return axios.get<(WorkLog & {fname:string, lname:string})[]>(`https://wk-revature-functions.azurewebsites.net/api/latest-worklog-query`)
        .then((r) => r)
        .catch((error) => {axiosErrorHandler(error)});
    }

}