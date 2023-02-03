import React, {ChangeEvent, useEffect, useState} from 'react';
import {todoAPI} from "../API/api";

export default {
    title: 'API/TODO',
}

export const GetTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        console.log
        todoAPI.getTodo()
            .then((data) => setState(data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolists = () => {

    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')

    const onClickHandler = () => {
        todoAPI.createTodo(title)
            .then((data) => setState(data))
    }
    const onChangeTitleValue = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <input
                value={state}
                placeholder={'Title'}
                onChange={onChangeTitleValue}
            />
            <button onClick={onClickHandler}>
                Send value
            </button>
        </div>
    )
}

export const DeleteTodolists = () => {

    const [state, setState] = useState<any>(null)
    const [todoID, setTodoID] = useState<string>('')


    const onClickHandler = () => {
        todoAPI.deleteTodo(todoID)
            .then((data) => setState(data))
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

export const UpdateTodolists = () => {

    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const [todoID, setTodoID] = useState<string>('')

    const onClickHandler = () => {
        todoAPI.updateTodo(todoID, title)
            .then((data) => setState(data))
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


