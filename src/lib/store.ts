import { configureStore } from '@reduxjs/toolkit'
import rightBarSlice from './reducers/rightBarSlice'
import UserHistory from './reducers/UserHistory'
import userRequest from "./reducers/UserRequest"
import UserResponse from './reducers/UserResponse'
import initialRequest from "./reducers/InitailRequest"
export const makeStore = () => {
  return configureStore({
    reducer: {rightBarSlice,UserHistory,userRequest,UserResponse,initialRequest},
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']