import { AuthState } from "@/type/type";
import { createSlice , PayloadAction } from "@reduxjs/toolkit";


const initialState: AuthState = {
  token: null,
  userData: null,
};

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        clearData:(state)=>{
            state.token = null ;
            state.userData = null;
        }
    }
})

export const { setToken, clearData } = authSlice.actions;
export const authReducer = authSlice.reducer