

export default interface WorkLog{
    wId: number;
    type: "CHECKIN" | "CHECKOUT";
    timestamp: number;
}