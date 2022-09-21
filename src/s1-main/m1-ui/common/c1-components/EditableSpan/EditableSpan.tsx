import React, {ChangeEvent, useEffect, useState} from 'react';
import {Input} from '../Input/Input';
import pen from '../../c3-image/photo/pen.png';
import style from './EditableSpan.module.scss'

type PropsType = {
    value: string
    onChange: (value: string) => void
    className?: string
}

export const EditableSpan = (props: PropsType) => {

    const [value, setValue] = useState(props.value)
    const [isEditingMode, setIsEditingMode] = useState(false)

    const onValueChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value)
    }

    const deactivatedEditMode = () => {
        setIsEditingMode(false)
        props.onChange(value)
    }

    const activeEditMode = () => {
        setIsEditingMode(true)
    }

    useEffect(() => {
        setValue(props.value)
    }, [props.value])

    return (
        <>
            {
                isEditingMode
                    ? <Input defaultValue={value}
                             onBlur={deactivatedEditMode}
                             onKeyUp={e => e.key === 'Enter' && deactivatedEditMode()}
                             autoFocus
                             onChange={onValueChange}
                             className={props.className}
                    />
                    : <span onDoubleClick={activeEditMode} className={style.text}>
                        {props.value}
                        <img src={pen} alt={'pen'} className={style.penImg}/>
                      </span>
            }
        </>
    )
        ;
};
