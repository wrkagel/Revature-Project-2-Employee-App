import axios, { AxiosResponse } from "axios";
import axiosErrorHandler from "../error-handlers/axios-error-handler";
import Activity from "../models/activity";
import Problem from "../models/problem";




export default class ProblemRoutes{

    private static address:string = "https://wk-revature-functions.azurewebsites.net/api"

    public static async getProblems(): Promise<AxiosResponse<Problem[]> | void> {
        return axios.get<Problem[]>(`${this.address}/problems`)
        .then(response => response)
        .catch((error) => axiosErrorHandler(error));
    }
    public static async updateProblem(problem:Problem): Promise<AxiosResponse<Problem> | void> {
        return axios.patch(`${this.address}/problems/${problem.id}`, {status:problem.status})
        .then(response => response)
        .catch((error) => axiosErrorHandler(error));
    }





}