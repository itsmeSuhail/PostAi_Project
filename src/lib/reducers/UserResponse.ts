import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface initialuserResponseStateProps {
    data: {
        data: string,
        headers?: string,
        status: number,
        statusText: string,
        time: string
    },
    initial: boolean
}


const initialState: initialuserResponseStateProps = {
    data: {
        data: '', status: 0, statusText: '', time: '0'
    }, initial: true
}

const userResponse = createSlice({
    name: "userResponse",
    initialState,
    reducers: {
        addResponse(state, action: PayloadAction<initialuserResponseStateProps>) {
            state.data = { ...action.payload.data };
            state.initial = action.payload.initial
        },
        clearResponse(state) {
            state.data = {
                data: '', status: 0, statusText: '', time: '0'
            };
            state.initial = true;
        },

    }
});

export const { addResponse } = userResponse.actions;
export default userResponse.reducer;
