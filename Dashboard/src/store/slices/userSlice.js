/* eslint-disable no-unused-vars */
/* eslint-disable no-self-assign */
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { baseUrl } from "../../utils";

const userSlice = createSlice({
    name : "user",
    initialState : {
        loading : false,
        user: {},
        isAuthenticated: false,
        error : null,
        message: null,
        isUpdated: false,
    },

    reducers: {

        // login
        loginRequest(state){
            // state.loading = true;
            state.user = {},
            state.isAuthenticated = false;
            state.error = null;
            state.message = null;
        },
        loginSuccess(state, action){
            state.loading = false;
            state.user = action.payload.user,
            state.isAuthenticated = true;
            state.error = null;
            state.message = action.payload.message
        },
        loginFailed(state, action){
            state.loading = false;
            state.user = {},
            state.isAuthenticated = false;
            state.error = action.payload;
            state.message = null;
        },


        // Load User
        loadRequest(state){
            state.loading = true;
            state.user = {},
            state.isAuthenticated = false;
            state.error = null;
        },
        loadSuccess(state, action){
            state.loading = false;
            state.user = action.payload,
            state.isAuthenticated = true;
            state.error = null;
        },
        loadFailed(state, action){
            state.loading = false;
            state.user = {},
            state.isAuthenticated = false;
            state.error = action.payload;
        },


        // Log Out User

        logoutSuccess(state, action){
            state.loading = false;
            state.user = {},
            state.isAuthenticated = false;
            state.error = null;
            state.message= action.payload;
        },
        logoutFailed(state, action){
            state.loading = false;
            state.user = state.user,
            state.isAuthenticated = state.isAuthenticated;
            state.error = action.payload;
        },

        // Update Password
        updatePasswordRequest(state, action){
            state.loading = true;
            state.isUpdated = false;
            state.message = null;
            state.error = null;
        },
        updatePasswordSuccess(state, action){
            state.loading = false;
            state.isUpdated = true;
            state.message = action.payload;
            state.error = null;
        },
        updatePasswordFailed(state, action){
            state.loading = false;
            state.isUpdated = false;
            state.message = null;
            state.error = action.payload;
        },


        // Update Profile
        updateProfileRequest(state, action){
            state.loading = true;
            state.isUpdated = false;
            state.message = null;
            state.error = null;
        },
        updateProfileSuccess(state, action){
            state.loading = false;
            state.isUpdated = true;
            state.message = action.payload;
            state.error = null;
        },
        updateProfileFailed(state, action){
            state.loading = false;
            state.isUpdated = false;
            state.message = null;
            state.error = action.payload;
        },

        updateProfileResetAfterUpdate(state, action){
            state.isUpdated = false;
            state.message = null;
            state.error = null;
        },

        clearAllErrors(state){
            state.error=null;
            // eslint-disable-next-line no-self-assign
            state.user=state.user;
        }
    }
})

export const login = (email, password) => async (dispatch)=>{
    dispatch(userSlice.actions.loginRequest());
    try {
        const {data} = await axios.post(
            `${baseUrl}/api/user/login`,
            {email, password},
            {
                withCredentials: true,
                headers : {
                    "Content-Type" : "application/json",
                }
            }
        );

        dispatch(userSlice.actions.loginSuccess(data));
        dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(userSlice.actions.loginFailed(error.response.data.message));
    }
};

export const getUser = () => async (dispatch)=>{
    dispatch(userSlice.actions.loadRequest());
    try {
        const {data} = await axios.get(
            `${baseUrl}/api/user/me`,
            { withCredentials: true, }
        );

        dispatch(userSlice.actions.loadSuccess(data.user));
        dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(userSlice.actions.loadFailed(error.response.data.message));
    }
};

export const logout = () => async (dispatch)=>{
    try {
        const {data} = await axios.get(
            `${baseUrl}/api/user/logout`,
            { withCredentials: true, }
        );

        dispatch(userSlice.actions.logoutSuccess(data.message));
        dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(userSlice.actions.logoutFailed(error.response.data.message));
    }
};


export const updatePassword = (currentPassword, newPassword, confirmNewPassword) => async(dispatch)=>{
    dispatch(userSlice.actions.updatePasswordRequest());
    try {
        const {data} = await axios.put(
            `${baseUrl}/api/user/update/password`,
            {currentPassword, newPassword, confirmNewPassword},
            {
                withCredentials : true,
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );

        dispatch(userSlice.actions.updatePasswordSuccess(data.message));
        dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(userSlice.actions.updatePasswordFailed(error.response.data.message));
    }
}

export const updateProfile = (formData) => async (dispatch) => {
    dispatch(userSlice.actions.updateProfileRequest());
    try {
      const response = await axios.put(
        `${baseUrl}/api/user/update/me`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      dispatch(userSlice.actions.updateProfileSuccess(response.data.message));
      dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(userSlice.actions.updateProfileFailed(error.response.data.message));
    }
  };

export const resetProfile = () => (dispatch) =>{
    dispatch(userSlice.actions.updateProfileResetAfterUpdate());
};

export const clearAllErrors = () => (dispatch) => {
    dispatch(userSlice.actions.clearAllErrors());
};

export default userSlice.reducer;