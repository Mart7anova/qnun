import * as React from 'react';
import {useEffect, useState} from 'react';
import Slider from '@mui/material/Slider';
import {getMaxCardsCount, getMinCardsCount} from '../../../../s1-main/m2-bll/selectors/packs-selectors';
import {useAppDispatch, useAppSelector} from '../../../../s1-main/m2-bll/store';
import {useDebounce} from '../../../../s1-main/m2-bll/hooks/hookDebonce';
import {setRangeCards} from '../../../../s1-main/m2-bll/reducers/packs-reducer';
import style from './DoubleRangeFilter.module.scss'
import {InputForFilter} from './InputForFilter';


export function DoubleRangeFilter() {
    const minCardsCount = useAppSelector(getMinCardsCount)
    const maxCardsCount = useAppSelector(getMaxCardsCount)
    const dispatch = useAppDispatch()

    const [value, setValue] = useState<number[]>([minCardsCount, maxCardsCount])
    const debouncedValue = useDebounce<number[]>(value, 1000)

    const onChangeFirstRange = (currentValue: number) => {
        setValue([currentValue, value[1]])
    }

    const onChangeSecondRange = (currentValue: number) => {
        setValue([value[0], currentValue])
    }

    const onChangeDoubleRange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };


    useEffect(() => {
        dispatch(setRangeCards(value[0], value[1]))
    }, [debouncedValue])

    useEffect(() => {
        setValue([minCardsCount, maxCardsCount])
    }, [minCardsCount, maxCardsCount])

    return (
        <div className={style.mainContainer}>
            <InputForFilter cardsCount={value[0]} sentCurrentValue={onChangeFirstRange}/>
            <Slider
                value={value}
                onChange={onChangeDoubleRange}
                valueLabelDisplay="auto"
                min={minCardsCount}
                max={maxCardsCount}
            />
            <InputForFilter cardsCount={value[1]} sentCurrentValue={onChangeSecondRange}/>
        </div>
    );
}
