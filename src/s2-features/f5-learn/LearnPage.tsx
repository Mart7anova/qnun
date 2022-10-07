import React, {ChangeEvent, useState} from 'react';
import {LinkBackTo} from '../../s1-main/m1-ui/common/c1-components/LinkBackTo/LinkBackTo';
import {PATH} from '../../s1-main/m1-ui/u1-Route/Variables/routeVariables';
import {Navigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../s1-main/m2-bll/store';
import {CardType} from '../../s1-main/m3-dal/cardsApi';
import {updateCardGrade} from '../../s1-main/m2-bll/reducers/cards-reducer';
import {getRandomCard} from './getCardRandom/getCardRamdom';
import {Button} from '../../s1-main/m1-ui/common/c1-components/Button/Button';
import style from './LearnPage.module.scss'
import styleContainer from '../../s1-main/m1-ui/common/c2-styles/Container.module.css';
import styleBlock from '../../s1-main/m1-ui/common/c2-styles/Block.module.css';
import {FormControlLabel, Radio, RadioGroup} from '@mui/material';
import {getIsLoggedIn} from '../../s1-main/m2-bll/selectors/auth-selectors';
import {getAppStatus} from '../../s1-main/m2-bll/selectors/app-selectors';
import {getCards, getPackName} from '../../s1-main/m2-bll/selectors/cards-selectors';

const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer'];

export const LearnPage = () => {
    const {packId} = useParams() as { packId: string }

    const dispatch = useAppDispatch()

    const cards = useAppSelector(getCards)
    const packName = useAppSelector(getPackName)
    const isLoggedIn = useAppSelector(getIsLoggedIn)
    const appStatus = useAppSelector(getAppStatus)

    const [card, setCard] = useState<CardType>(getRandomCard(cards))
    const [isChecked, setIsChecked] = useState(false)
    const [grade, setGrade] = useState(-1)

    const onShowAnswerClick = () => {
        setIsChecked(true)
    }

    const onGradesChange = (e: ChangeEvent<HTMLInputElement>, i: number) => {
        if (e.currentTarget.checked) {
            setGrade(i)
        } else {
            setGrade(-1)
        }
    }

    const onNextClick = () => {
        setIsChecked(false)
        dispatch(updateCardGrade(card._id, grade + 1, packId))
        if (cards.length > 0) {
            setCard(getRandomCard(cards))
        }
        setGrade(-1)
    }

    console.log(cards)
    if (!isLoggedIn) return <Navigate to={PATH.LOGIN}/>

    return (
        <div className={styleContainer.container}>
            <div className={style.learnContainer}>
                <LinkBackTo link={PATH.PACKS_LIST}/>

                <h1 className={style.packName}>{packName}</h1>

                <div className={`${styleBlock.block} ${style.learnBlock}`}>
                    <span className={style.textContainer}>
                        Question: <span className={style.text}>{card.question}?</span>
                    </span>
                    <span className={style.infoText}>
                        Number of attempts to answer the question: <span
                        className={style.infoNumber}>{card.shots}</span>
                    </span>
                    {
                        !isChecked && <Button onClick={onShowAnswerClick} className={style.button} disabled={appStatus==='loading'}>Show answer</Button>
                    }
                    {
                        isChecked && (
                            <>
                                <span className={style.textContainer}>
                                    Answer: <span className={style.text}>{card.answer}</span>
                                </span>

                                {
                                    grades.map((g, i) => (
                                        <RadioGroup key={i} value={grade} onChange={(e) => onGradesChange(e, i)}>
                                            <FormControlLabel control={<Radio/>} label={g} value={i}/>
                                        </RadioGroup>
                                    ))
                                }
                                <Button onClick={onNextClick} className={style.button} disabled={grade === -1}>Next</Button>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
};
