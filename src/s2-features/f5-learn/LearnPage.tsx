import React, {useEffect, useState} from 'react';
import {LinkBackTo} from '../../s1-main/m1-ui/common/c1-components/LinkBackTo/LinkBackTo';
import {PATH} from '../../s1-main/m1-ui/u1-Route/Variables/routeVariables';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../s1-main/m2-bll/store';
import {CardType} from '../../s1-main/m3-dal/cardsApi';
import {fetchCards} from '../../s1-main/m2-bll/reducers/cards-reducer';
import {getCard} from './getCardRandom/getCardRamdom';
import {Button} from '../../s1-main/m1-ui/common/c1-components/Button/Button';
import {Checkbox} from '../../s1-main/m1-ui/common/c1-components/Checkbox/Checkbox';
import style from './LearnPage.module.scss'
import styleContainer from '../../s1-main/m1-ui/common/c2-styles/Container.module.css';
import styleBlock from '../../s1-main/m1-ui/common/c2-styles/Block.module.css';

const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer'];

export const LearnPage = () => {
    const {packId} = useParams() as { packId: string }

    const dispatch = useAppDispatch()

    const cards = useAppSelector(state => state.cards.cardsState.cards)
    const packName = useAppSelector(state => state.cards.cardsState.packName)

    const [card, setCard] = useState<CardType>({...cards[0]})
    const [isChecked, setIsChecked] = useState(false)

    const onShowAnswerClick = () => {
        setIsChecked(true)
    }
    const onNextClick = () => {
        setIsChecked(false)
        setCard(getCard(cards))
    }

    useEffect(() => {
        dispatch(fetchCards(packId))
        setCard(getCard(cards))
    }, [packId])

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
                        Количество попыток ответов на вопрос: <span className={style.infoNumber}>{card.shots}</span>
                    </span>
                    {
                        !isChecked && <Button onClick={onShowAnswerClick} className={style.button}>Show answer</Button>
                    }
                    {
                        isChecked && (
                            <>
                                <span className={style.textContainer}>
                                    Answer: <span className={style.text}>{card.answer}</span>
                                </span>

                                {
                                    grades.map((g, i) => (
                                        <span className={style.checkbox}>
                                            <Checkbox key={i}>{g}</Checkbox>
                                        </span>
                                    ))
                                }
                                <Button onClick={onNextClick} className={style.button}>Next</Button>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
};
