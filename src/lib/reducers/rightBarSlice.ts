import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const initialState={
    open:false
}
const rightModel=createSlice({
    name:"rightModal",
    initialState,
    reducers:{
        openModal:(state,action:PayloadAction<boolean>)=>{
            state.open=action.payload;
        }
    }
});
export const {openModal}=rightModel.actions;
export default rightModel.reducer;