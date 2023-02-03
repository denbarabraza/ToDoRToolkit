import React, {ChangeEvent, useState} from 'react';
import {taskAPI, UpdateTaskModelType} from "../API/api";

export default {
    title: 'API/TASK',
}

export const GetTask = () => {

    const [state, setState] = useState<any>(null)
    const [todoID, setTodoID] = useState<string>('')


    const onClickHandler = () => {
        taskAPI.getTask(todoID)
            .then((data) => setState(data.items))
    }
    const onChangeTodoValue = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoID(e.currentTarget.value)
    }

    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <input
                value={todoID}
                placeholder={'TodoID'}
                onChange={onChangeTodoValue}
            />
            <button onClick={onClickHandler}>
                Send value
            </button>
        </div>
    )
}

export const CreateTask = () => {

    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const [todoID, setTodoID] = useState<string>('')

    const onClickHandler = () => {
        taskAPI.createTask(todoID, title)
            .then((data) => {
                return setState(data)
            })
    }
    const onChangeTitleValue = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onChangeTodoValue = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoID(e.currentTarget.value)
    }

    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <input
                value={todoID}
                placeholder={'TodoID'}
                onChange={onChangeTodoValue}
            />
            <input
                value={title}
                placeholder={'Title'}
                onChange={onChangeTitleValue}
            />
            <button onClick={onClickHandler}>
                Send value
            </button>
        </div>
    )
}

export const UpdateTask = () => {

    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const [todoID, setTodoID] = useState<string>('')
    const [taskID, setTaskID] = useState<string>('')

    let obj: UpdateTaskModelType = {
        title: title,
        description: 'blal',
        status: 1,
        priority: 1,
        startDate: null,
        deadline: null
    }

    const onClickHandler = () => {
        taskAPI.updateTask(todoID, taskID, obj)
            .then((data) => setState(data))
    }
    const onChangeTitleValue = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onChangeTodoValue = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoID(e.currentTarget.value)
    }
    const onChangeTaskValue = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskID(e.currentTarget.value)
    }

    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <input
                value={todoID}
                placeholder={'TodoID'}
                onChange={onChangeTodoValue}
            />
            <input
                value={taskID}
                placeholder={'TaskID'}
                onChange={onChangeTaskValue}
            />
            <input
                value={title}
                placeholder={'Title'}
                onChange={onChangeTitleValue}
            />
            <button onClick={onClickHandler}>
                Send value
            </button>
        </div>
    )
}

export const DeleteTask = () => {

    const [state, setState] = useState<any>(null)
    const [todoID, setTodoID] = useState<string>('')
    const [taskID, setTaskID] = useState<string>('')

    const onClickHandler = () => {
        taskAPI.deleteTask(todoID, taskID)
            .then((data) => setState(data))
    }
    const onChangeTodoValue = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoID(e.currentTarget.value)
    }
    const onChangeTaskValue = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskID(e.currentTarget.value)
    }

    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <input
                value={todoID}
                placeholder={'TodoID'}
                onChange={onChangeTodoValue}
            />
            <input
                value={taskID}
                placeholder={'TaskID'}
                onChange={onChangeTaskValue}
            />
            <button onClick={onClickHandler}>
                Send value
            </button>
        </div>
    )
}