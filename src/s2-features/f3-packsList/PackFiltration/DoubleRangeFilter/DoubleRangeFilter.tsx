import * as React from 'react';
import {useEffect, useState} from 'react';
import Slider from '@mui/material/Slider';
import {
    getCurrentMaxCount,
    getCurrentMinCount,
    getMaxCardsCount,
    getMinCardsCount
} from '../../../../s1-main/m2-bll/selectors/packs-selectors';
import {useAppDispatch, useAppSelector} from '../../../../s1-main/m2-bll/store';
import {useDebounce} from '../../../../s1-main/m2-bll/hooks/hookDebonce';
import {setRangeCards} from '../../../../s1-main/m2-bll/reducers/packs-reducer';
import style from './DoubleRangeFilter.module.scss'
import {InputForRangeFilter} from './InputForRangeFilter';


export function DoubleRangeFilter() {
    const minCardsCount = useAppSelector(getMinCardsCount)
    const maxCardsCount = useAppSelector(getMaxCardsCount)
    const currentMinCount = useAppSelector(getCurrentMinCount)
    const currentMaxCount = useAppSelector(getCurrentMaxCount)

    const [value, setValue] = useState<number[]>([minCardsCount, maxCardsCount])

    const debouncedValue = useDebounce<number[]>(value, 1000)
    const dispatch = useAppDispatch()

    const onChangeFirstRange = (newValue: number) => {
        setValue([newValue, value[1]])
    }

    const onChangeDoubleRange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const onChangeSecondRange = (newValue: number) => {
        setValue([value[0], newValue])
    }

    useEffect(() => {
        dispatch(setRangeCards(value[0], value[1]))
    }, [debouncedValue])

    useEffect(() => {
        setValue([currentMinCount, currentMaxCount])
    }, [currentMinCount, currentMaxCount])

    return (
        <div className={style.mainContainer}>
            <InputForRangeFilter currentValue={value[0]} setCurrentValue={onChangeFirstRange}/>
            <Slider
                value={value}
                onChange={onChangeDoubleRange}
                valueLabelDisplay="auto"
                min={minCardsCount}
                max={maxCardsCount}
            />
            <InputForRangeFilter currentValue={value[1]} setCurrentValue={onChangeSecondRange}/>
        </div>
    );
}
