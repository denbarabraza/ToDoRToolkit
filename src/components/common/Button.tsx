import React, {memo} from 'react';
import {FilterValueType} from "../../state/taskReducer";
import s from '../Todos/Todolist.module.css'

type ButtonPropsType = {
    title: string,
    callback: () => void
    filter?: FilterValueType
}

export const Button: React.FC<ButtonPropsType> = memo((
    {
        title,
        callback,
        filter
    }) => {
    const onClickHandler = () => {
        callback()
    }

    console.log('Button rendering')
    return (
        <button
            className={filter === title ? s.active : ''}
            onClick={onClickHandler}>
            {title}
        </button>
    );
});

/* <Button
                title={'Active'}
                callback={() => onClickSuperButtonHandler('Active')}
                filter={task[todoID].filter}
            />*/