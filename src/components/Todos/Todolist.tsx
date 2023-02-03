import {useSelector} from "react-redux";
import {RootDispatch, RootStoreType} from "../../state/store";
import {changeFilterValueAC, createTasksTC, FilterValueType, setTasksTC, TaskCommonType} from "../../state/taskReducer";
import React, {FC, memo, useCallback, useEffect} from "react";
import {deleteTodoTC, updateTodoTC} from "../../state/todoReducer";
import {InputItemForm} from "../common/InputItemForm";
import {SuperEditbleSpan} from "../common/SuperEditbleSpan";
import {Task} from "../Tasks/Task";
import {TaskStatuses} from "../../API/api";
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";

type TodolistPropsType = {
    todoID: string
    title: string
}

export const Todolist: FC<TodolistPropsType> = memo((
    {
        todoID,
        title
    }) => {

    const task = useSelector<RootStoreType, TaskCommonType>(state => state.task)
    const dispatch = RootDispatch()

    useEffect(() => {
        dispatch(setTasksTC(todoID))
    }, [])

    const onClickSuperButtonHandler = useCallback((filter: FilterValueType) => {
        dispatch(changeFilterValueAC(todoID, filter))
    }, [todoID])
    const onClickRemoveTodo = useCallback(() => {
        dispatch(deleteTodoTC(todoID))
    }, [todoID])
    const addTaskHandler = useCallback((value: string) => {
        dispatch(createTasksTC(todoID, value))
    }, [todoID])

    const setUpTodoTitle = useCallback((upValue: string) => {
        dispatch(updateTodoTC(todoID, upValue))
    }, [])

    let filteredTask = task[todoID].data
    if (task[todoID].filter === 'Active') {
        filteredTask = task[todoID].data.filter(e => e.status === TaskStatuses.New)
    }
    if (task[todoID].filter === 'Completed') {
        filteredTask = task[todoID].data.filter(e => e.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3>
                <SuperEditbleSpan title={title} callback={setUpTodoTitle}/>
                <IconButton aria-label="delete" onClick={onClickRemoveTodo} disabled={task[todoID].entityStatus==='loading'}>
                    <Delete/>
                </IconButton>
            </h3>

            <InputItemForm callback={addTaskHandler} entityStatus={task[todoID].entityStatus}/>

            <div>
                {filteredTask.map(t => <Task key={t.id} task={t} todoID={todoID} disabled={task[todoID].entityStatus==='loading'}/>)}
            </div>

            <Button variant={task[todoID].filter === 'All' ? 'contained' : 'outlined'}
                    onClick={() => onClickSuperButtonHandler('All')}
                    color={'primary'}
                    size="small"
                    style={{margin: '1px'}}
            >All
            </Button>
            <Button variant={task[todoID].filter === 'Completed' ? 'contained' : 'outlined'}
                    onClick={() => onClickSuperButtonHandler('Completed')}
                    color={'primary'}
                    size="small"
                    style={{margin: '1px'}}
            >Completed
            </Button>
            <Button variant={task[todoID].filter === 'Active' ? 'contained' : 'outlined'}
                    onClick={() => onClickSuperButtonHandler('Active')}
                    color={'primary'}
                    size="small"
                    style={{margin: '1px'}}
            >Active
            </Button>
        </div>
    )
})

