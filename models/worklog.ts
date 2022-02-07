

export default interface WorkLog{
    wId: number;
    action: "CHECKIN" | "CHECKOUT";
    timestamp: number;
}