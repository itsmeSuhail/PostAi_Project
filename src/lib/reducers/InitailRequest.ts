import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface initialUserRequestStateProps {
    method: string;
    url: string;
    id: string;
    timeStamp: string;
    headers?: string,
    params?: string,
    data?: string
}

interface InitialState {
    loading: boolean,
    Requestdata: initialUserRequestStateProps[];
}

const initialState: InitialState = {
    loading: false,
    Requestdata: []
}

const initialRequest = createSlice({
    name: "initialRequest",
    initialState,
    reducers: {
        setInitialLoading(state) {
            state.loading = true;
        },
        setInitialRequest(state, action: PayloadAction<initialUserRequestStateProps>) {
            state.Requestdata.unshift(action.payload)
            state.loading = false;
        },
        clearInitialState(state) {
            // state.Requestdata = null;
        }
    }
});

export const { setInitialRequest, clearInitialState, setInitialLoading } = initialRequest.actions;
export default initialRequest.reducer;
