import * as React from 'react';
import {ChangeEvent, useEffect, useState} from 'react';
import {TextField} from '@mui/material';
import style from './DoubleRangeFilter.module.scss'

type PropsType = {
    currentValue: number
    setCurrentValue: (currentValue: number) => void
}

export function InputForRangeFilter({currentValue, setCurrentValue}: PropsType) {
    const [value, setValue] = useState(currentValue)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = Number(e.currentTarget.value)
        if (newValue < -1 || Object.is(newValue, NaN)) {
            setValue(newValue)
            setCurrentValue(value)
        }
    };

    useEffect(() => {
        setValue(currentValue)
    }, [currentValue])

    return (
        <TextField size={'small'}
                   className={style.input}
                   type={'tel'}
                   value={value || 0}
                   onChange={onChangeHandler}
        />
    );
}
