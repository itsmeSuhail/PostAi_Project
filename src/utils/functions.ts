import { HistoryProps } from "@/lib/reducers/UserHistory";
import axios from "axios";
export const saveToHistory = async (request: HistoryProps, setState: any) => {

    try {
        const data = await saveUserHistoryIntoDb({ ...request, timeStamp: Date.now().toString() });
        setState(data);
    } catch (error) {
        setState({ ...request, timeStamp: Date.now().toString() })
    }
}
const saveUserHistoryIntoDb = async (obj: HistoryProps) => {
    try {
        const { data } = await axios.post("/api/userhistory", obj);
        return data;
    } catch (error) {
        throw new Error("something went wrong......")
    }
}