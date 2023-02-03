import React, {useCallback, useEffect} from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist";
import {useSelector} from "react-redux";
import {RootDispatch, RootStoreType, useAppSelector} from "../../state/store";
import {TodoType} from "../../API/api";
import {InputItemForm} from "../common/InputItemForm";
import {createTodoTC, setTodosTC} from "../../state/todoReducer";
import {Navigate} from "react-router-dom";

export const TodolistItem = () => {

    const todolist = useSelector<RootStoreType, TodoType[]>(state => state.todolist)
    let isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const dispatch = RootDispatch()

    useEffect(() => {
        if(!isLoggedIn) return
        dispatch(setTodosTC())
    }, [])

    const addNewTodo = useCallback((value: string) => {
        dispatch(createTodoTC(value))
    }, [])

    if(!isLoggedIn){
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <InputItemForm callback={addNewTodo}/>
            </Grid>
            <Grid container spacing={3}>
                {todolist.map(t => {
                        return <Grid item key={t.id}>
                            <Paper style={{padding: '10px'}} elevation={3}>
                                <Todolist
                                    todoID={t.id}
                                    title={t.title}
                                />
                            </Paper>
                        </Grid>
                    }
                )}
            </Grid>
        </>
    );
};

