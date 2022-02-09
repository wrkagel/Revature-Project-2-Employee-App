

export default interface WorkLog{
    id: number;
    action: "CHECKIN" | "CHECKOUT";
    timestamp: number;
}