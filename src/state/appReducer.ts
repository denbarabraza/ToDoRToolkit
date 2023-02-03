import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = {
    statusApp: RequestStatusType
    errorApp: string | null,
    isInitialized: boolean
}


const initialState: InitialStateType = {
    statusApp: 'loading' as RequestStatusType,
    errorApp: null,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setStatusAppAC: (state, action: PayloadAction<{ statusApp: RequestStatusType }>) => {
            state.statusApp = action.payload.statusApp
        },
        setErrorAppAC: (state, action: PayloadAction<{ errorApp: string | null }>) => {
            state.errorApp = action.payload.errorApp
        },
        setInitializedAC: (state, action: PayloadAction<{ value: boolean }>) => {
            state.isInitialized = action.payload.value
        }
    }
})

export const appReducer = slice.reducer
export const {setStatusAppAC, setErrorAppAC, setInitializedAC} = slice.actions


