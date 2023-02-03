import {authAPI, LoginDataType, ResponseResult} from "../API/api";
import {Dispatch} from "redux";
import {setErrorAppAC, setInitializedAC, setStatusAppAC} from "./appReducer";
import axios from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const InitialStateAuth = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: InitialStateAuth,
    reducers: {
        setLoggedInAC: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    }
})

export const authReducer = slice.reducer
export const {setLoggedInAC} = slice.actions

//Thunk
export const setLoggedInTC = (loginData: LoginDataType) => async (dispatch: Dispatch) => {
    dispatch(setStatusAppAC({statusApp:'loading'}))
    try {
        let res = await authAPI.logIN(loginData)
        if (res.resultCode === ResponseResult.OK) {
            dispatch(setLoggedInAC({isLoggedIn:true}))
            dispatch(setStatusAppAC({statusApp:'succeeded'}))
        } else {
            if (res.messages.length) {
                dispatch(setErrorAppAC({errorApp:res.messages[0]}))
            } else {
                dispatch(setErrorAppAC({errorApp:'Some error'}))
            }
            dispatch(setStatusAppAC({statusApp:'failed'}))
        }
    } catch (e) {
        if (axios.isAxiosError<{ message: string }>(e)) {
            let err = e.response ? e.response?.data.message : e.message
            dispatch(setErrorAppAC({errorApp:err}))
            dispatch(setStatusAppAC({statusApp:'failed'}))
        }
    }
}

export const initializeAppTC = () => async (dispatch: Dispatch) => {
    dispatch(setStatusAppAC({statusApp:'loading'}))
    try {
        let res = await authAPI.me()
        if (res.resultCode === ResponseResult.OK) {
            dispatch(setLoggedInAC({isLoggedIn:true}))
            dispatch(setStatusAppAC({statusApp:'succeeded'}))
        } else {
            if (res.messages.length) {
                dispatch(setErrorAppAC({errorApp:res.messages[0]}))
            } else {
                dispatch(setErrorAppAC({errorApp:'Some error'}))
            }
            dispatch(setStatusAppAC({statusApp:'failed'}))
        }
    } catch (e) {
        if (axios.isAxiosError<{ message: string }>(e)) {
            let err = e.response ? e.response?.data.message : e.message
            dispatch(setErrorAppAC({errorApp:err}))
            dispatch(setStatusAppAC({statusApp:'failed'}))
        }
    } finally {
        dispatch(setInitializedAC({value:true}))
    }
}

export const logOutTC = () => async (dispatch: Dispatch) => {
    dispatch(setStatusAppAC({statusApp:'loading'}))
    try {
        let res = await authAPI.logOUT()
        if (res.resultCode === ResponseResult.OK) {
            dispatch(setLoggedInAC({isLoggedIn:true}))
            dispatch(setStatusAppAC({statusApp:'succeeded'}))
        } else {
            if (res.messages.length) {
                dispatch(setErrorAppAC({errorApp:res.messages[0]}))
            } else {
                dispatch(setErrorAppAC({errorApp:'Some error'}))
            }
            dispatch(setStatusAppAC({statusApp:'failed'}))
        }
    } catch (e) {
        if (axios.isAxiosError<{ message: string }>(e)) {
            let err = e.response ? e.response?.data.message : e.message
            dispatch(setErrorAppAC({errorApp:err}))
            dispatch(setStatusAppAC({statusApp:'failed'}))
        }
    }
}
