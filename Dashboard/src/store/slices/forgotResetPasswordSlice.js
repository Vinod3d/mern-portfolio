/* eslint-disable no-unused-vars */
/* eslint-disable no-self-assign */
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const forgotResetPasswordSlice = createSlice({
    name : "forgotPassword",
    initialState : {
        loading : false,
        error : null,
        message: null,
    },

    reducers: {

        // forget password
        forgotPasswordRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        forgotPasswordSuccess(state, action) {
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        forgotPasswordFailed(state, action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },


        // reset password
        resetPasswordRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        resetPasswordSuccess(state, action) {
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        resetPasswordFailed(state, action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },

        clearAllErrors(state){
            state.error=null;
            // eslint-disable-next-line no-self-assign
            state.user=state.user;
        }
    }
})

export const forgotPassword = (email) => async (dispatch)=>{
   dispatch(forgotResetPasswordSlice.actions.forgotPasswordRequest());
   try {
        const {data } = await axios.post(
            "/api/user/password/forgot",
            {email},
            {
                withCredentials: true,
                headers : {
                    'Content-Type': 'application/json',
                }
            }
        )
        dispatch(forgotResetPasswordSlice.actions.forgotPasswordSuccess(data.message));
        dispatch(forgotResetPasswordSlice.actions.clearAllErrors());
   } catch (error) {
    dispatch(forgotResetPasswordSlice.actions.forgotPasswordFailed(error.response.data.message));
   }
};

export const resetPassword = (token, password, confirmPassword) => async (dispatch)=>{
    dispatch(forgotResetPasswordSlice.actions.resetPasswordRequest());
   try {
        const {data } = await axios.put(
            `/api/user/password/reset/${token}`,
            {password, confirmPassword},
            {
                withCredentials: true,
                headers : {
                    'Content-Type': 'application/json',
                }
            }
        )
        dispatch(forgotResetPasswordSlice.actions.resetPasswordSuccess(data.message));
        dispatch(forgotResetPasswordSlice.actions.clearAllErrors());
   } catch (error) {
    dispatch(forgotResetPasswordSlice.actions.resetPasswordFailed(error.response.data.message));
   }
};

export const clearAllForgotPasswordErrors = () => (dispatch) => {
    dispatch(forgotResetPasswordSlice.actions.clearAllErrors());
};

export default forgotResetPasswordSlice.reducer;