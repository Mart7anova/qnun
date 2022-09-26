import * as React from 'react';
import {ChangeEvent, useEffect} from 'react';
import Slider from '@mui/material/Slider';
import {getMaxCardsCount, getMinCardsCount} from '../../../../s1-main/m2-bll/selectors/packs-selectors';
import {useAppDispatch, useAppSelector} from '../../../../s1-main/m2-bll/store';
import {useDebounce} from '../../../../s1-main/m2-bll/hooks/hookDebonce';
import {setRangeCards} from '../../../../s1-main/m2-bll/reducers/packs-reducer';
import {TextField} from '@mui/material';
import style from './DoubleRangeFilter.module.scss'


export function DoubleRangeFilter() {
    const [value, setValue] = React.useState<number[]>([0, 10])

    const minCardsCount = useAppSelector(getMinCardsCount)
    const maxCardsCount = useAppSelector(getMaxCardsCount)
    const debouncedValue = useDebounce<number[]>(value, 1000)

    const dispatch = useAppDispatch()

    const onChangeFirstRange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const firstValue = Number(e.currentTarget.value)

        if (firstValue < -1 || Object.is(firstValue, NaN)) {
            setValue([0, value[1]])
        } else {
            setValue([firstValue, value[1]])
        }
    }

    const onChangeDoubleRange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const onChangeSecondRange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const secondValue = Number(e.currentTarget.value)

        if (secondValue < -1 || Object.is(secondValue, NaN) || secondValue > maxCardsCount) {
            setValue([value[0], maxCardsCount])
        } else {
            setValue([value[0], secondValue])
        }
    }

    useEffect(() => {
        dispatch(setRangeCards(value[0], value[1]))
    }, [debouncedValue])

    return (
        <div className={style.mainContainer}>
            <TextField size={'small'}
                       className={style.input}
                       type={'tel'}
                       value={value[0]}
                       onChange={onChangeFirstRange}
            />
            <Slider
                value={value}
                onChange={onChangeDoubleRange}
                valueLabelDisplay="auto"
                min={minCardsCount}
                max={maxCardsCount}
            />
            <TextField size={'small'}
                       className={style.input}
                       type={'tel'}
                       value={value[1]}
                       onChange={onChangeSecondRange}
            />
        </div>
    );
}
