import {FormControl, MenuItem, Select, SelectChangeEvent, TextField} from '@mui/material';
import React, {ChangeEvent, useState} from 'react';
import {BasicModal} from '../BaseModal';
import style from './CardModal.module.scss'
import {Button} from '../../../s1-main/m1-ui/common/c1-components/Button/Button';

type PropsType = {
    title: string
    sentChanges: (question: string, answer: string) => void
    open: boolean
    closeModal: () => void
}

export const CardModal = ({title, sentChanges, open, closeModal}: PropsType) => {
    const [format, setFormat] = useState('text')
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [error, setError] = useState('')

    const onFormatChange = (e: SelectChangeEvent) => {
        setFormat(e.target.value)
    }
    const onQuestionChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setError('')
        setQuestion(e.currentTarget.value)
    }
    const onAnswerChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setError('')
        setAnswer(e.currentTarget.value)
    }

    const onClickHandler = () => {
        if(question && answer){
            const newQuestion = question.trim()
            const newAnswer = answer.trim()
            sentChanges(newQuestion, newAnswer)
            setFormat('text')
            setQuestion('')
            setAnswer('')
        } else {
            setError('required field')
        }
    }

    return (
        <BasicModal open={open} closeModal={closeModal} title={title}>
            <div className={style.infoText}>Choose a question format</div>
            <FormControl fullWidth size={'small'} className={style.formSelect}>
                <Select value={format} onChange={onFormatChange}>
                    <MenuItem value={'text'}>text</MenuItem>
                    <MenuItem value={'img'}>img</MenuItem>
                </Select>
            </FormControl>

            <div className={style.infoText}>
                Question:
                {error && <span className={style.errorText}> {error}</span>}
            </div>
            <TextField variant={'standard'} value={question} onChange={onQuestionChange} error={!!error} style={{width: '100%', marginBottom: '10px'}}/>

            <div className={style.infoText}>
                Answer:
                {error && <span className={style.errorText}> {error}</span>}
            </div>
            <TextField variant={'standard'} className={style.input} value={answer} onChange={onAnswerChange} error={!!error} style={{width: '100%', marginBottom: '30px'}}/>

            <div className={style.btnGroup}>
                <Button onClick={closeModal} white>Cansel</Button>
                <Button onClick={onClickHandler}>{title.split(' ')[0]}</Button>
            </div>
        </BasicModal>
    );
};
