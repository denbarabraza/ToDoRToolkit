import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {taskReducer} from "./taskReducer";
import {todoReducer} from "./todoReducer";
import thunk, {ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "./appReducer";
import {authReducer} from "./authReducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    task: taskReducer,
    todolist: todoReducer,
    app: appReducer,
    auth: authReducer
})

export const store=configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware().prepend(thunk)
})

export type RootStoreType = ReturnType<typeof rootReducer>
export type RootDispatchThunkType = ThunkDispatch<RootStoreType, any, AnyAction>
export const useAppSelector: TypedUseSelectorHook<RootStoreType> = useSelector
export const RootDispatch = () => useDispatch<RootDispatchThunkType>()


