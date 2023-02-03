import React, {ChangeEvent, FC, memo, useState} from 'react';
import TextField from "@mui/material/TextField";


type SuperEditbleSpanPropsType = {
    title: string
    callback: (upValue: string) => void
}

export const SuperEditbleSpan: FC<SuperEditbleSpanPropsType> = memo((
    {
        title,
        callback
    }) => {
    const [edit, setEdit] = useState(false)
    const [upValue, setValue] = useState(title)

    const setUpTitle = () => {
        callback(upValue)
    }

    const onDoubleClickHandler = () => {
        setEdit(!edit)
        edit && setUpTitle()
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return (
        edit
            ? <TextField
                value={upValue}
                onChange={onChangeInputHandler}
                onBlur={onDoubleClickHandler}
                autoFocus
                size={'small'}
            />
            : <span onDoubleClick={onDoubleClickHandler}>{title}</span>
    );
});

