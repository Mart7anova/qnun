import * as React from 'react';
import {useEffect} from 'react';
import Slider from '@mui/material/Slider';
import {getMaxCardsCount, getMinCardsCount} from '../../../../s1-main/m2-bll/selectors/packs-selectors';
import {useAppDispatch, useAppSelector} from '../../../../s1-main/m2-bll/store';
import {useDebounce} from '../../../../s1-main/m2-bll/hooks/hookDebonce';
import {setRangeCards} from '../../../../s1-main/m2-bll/reducers/packs-reducer';


export function DoubleRangeFilter() {
    const [value, setValue] = React.useState<number[]>([0,10])

    const minCardsCount = useAppSelector(getMinCardsCount)
    const maxCardsCount = useAppSelector(getMaxCardsCount)
    const debouncedValue = useDebounce<number[]>(value, 1000)

    const dispatch = useAppDispatch()

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    useEffect(() => {
        dispatch(setRangeCards(value[0], value[1]))
    }, [debouncedValue])

    return (
        <Slider
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={minCardsCount}
            max={maxCardsCount}
        />
    );
}
