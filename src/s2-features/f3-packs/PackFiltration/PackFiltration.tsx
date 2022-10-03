import {DoubleRangeFilter} from 's2-features/f3-packs/PackFiltration/DoubleRangeFilter/DoubleRangeFilter';
import React from 'react';
import {SearchInput} from 's1-main/m1-ui/common/c1-components/SearchInput/SearchInput';
import {useAppDispatch} from 's1-main/m2-bll/store';
import {clearFilters, setSearchByPacksNameFilter} from 's1-main/m2-bll/reducers/packs-reducer';
import {FilterByMyCards} from './FilterByMyCards/FilterByMyCards';


export const PackFiltration = () => {
    const dispatch = useAppDispatch()

    const clearFiltersHandle = () => {
        dispatch(clearFilters())
    }

    return (
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
            <div>
                <div>search</div>
                <SearchInput setSearch={setSearchByPacksNameFilter}/>
            </div>
            <div>
                <div>Show pack cards</div>
                <FilterByMyCards/>
            </div>
            <div>
                <div>number of cards</div>
                <DoubleRangeFilter/>
            </div>
            <div>
                <button onClick={clearFiltersHandle}>clear filters</button>
            </div>
        </div>
    )
}