import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface initialUserRequestStateProps {
    method: string;
    url: string;
    id: string;
    date: string;
    data: Object,
    headers: Object,
    params: Object
}

interface InitialState {
    data: initialUserRequestStateProps;
}

const initialState: InitialState = {
    data: {
        data: {}, date: '', headers: {}, id: '', method: '', params: '', url: ''
    }
}

const userRequest = createSlice({
    name: "userRequest",
    initialState,
    reducers: {
        setInitialRequest(state, action: PayloadAction<initialUserRequestStateProps>) {
            state.data = action.payload;
        }
    }
});

export const { setInitialRequest } = userRequest.actions;
export default userRequest.reducer;
