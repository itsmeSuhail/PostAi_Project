import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface HistoryProps {
    method: string;
    url: string;
    id: string;
    timeStamp: string;
    headers?: string,
    params?: string,
    data?: string
}

interface InitialState {
    data: HistoryProps[];
}

const initialState: InitialState = {
    data: []
}

const rightModel = createSlice({
    name: "userHistory",
    initialState,
    reducers: {
        addHistory(state, action: PayloadAction<HistoryProps>) {
            state.data.unshift(action.payload);
        },
        clearHistory(state) {
            state.data = [];
        },
        deleteUserHistory(state, action: PayloadAction<string>) {
            const arr: HistoryProps[] = state.data.filter(data => data.id != action.payload);
            state.data = arr;
        },
        initialData: (state, action: PayloadAction<HistoryProps[]>) => {

            state.data = action.payload
        }
    }
});

export const { addHistory, clearHistory, deleteUserHistory, initialData } = rightModel.actions;
export default rightModel.reducer;
