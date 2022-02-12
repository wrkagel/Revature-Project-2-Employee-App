export default interface Problem {
  id: string;
  category: string;
  submittedTime: number;
  desc: string;
  status: "new" | "reviewed";
  photoLink: string;
}
