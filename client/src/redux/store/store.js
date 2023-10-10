import { configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { userSlice } from "../actionsReducer/action";
export const store = configureStore({
    reducer:{
        user: userSlice.reducer
    }
})