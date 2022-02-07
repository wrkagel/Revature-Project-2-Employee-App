import { AxiosError } from "axios";

export default function axiosErrorHandler(error: AxiosError): void {
    let message = "";
    if(error.response) {
        message += error.response.data;
    }
    if(error.message) {
        message += `\n${error.message}`;
    }
    alert(message);
}