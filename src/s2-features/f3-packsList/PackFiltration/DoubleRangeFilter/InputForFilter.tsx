import * as React from 'react';
import {ChangeEvent, useEffect, useState} from 'react';
import {TextField} from '@mui/material';
import style from './DoubleRangeFilter.module.scss'

type PropsType = {
    cardsCount: number
    sentCurrentValue: (value: number) => void
}

export function InputForFilter({cardsCount, sentCurrentValue}: PropsType) {
    const [value, setValue] = useState(cardsCount)

    const onChangeFirstRange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = Number(e.currentTarget.value)

        if (value < -1 || Object.is(value, NaN)) {
            setValue(0)
        } else {
            setValue(value)
        }

        sentCurrentValue(value)
    }

    useEffect(() => {
        setValue(cardsCount)
    }, [cardsCount])

    return (
        <TextField size={'small'}
                   className={style.input}
                   type={'tel'}
                   value={value || '0'}
                   onChange={onChangeFirstRange}
        />
    );
}
