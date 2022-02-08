

export default interface ServiceRequest {
    id: string;
    room: string;
    created: number;
    status: "Ordered" | "Processing" | "Completed" | "Cancelled";
    requestedOfferings: {desc:string, amount:number}[];
} 