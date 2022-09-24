import {SliderComponent} from 's1-main/m1-ui/common/c1-components/DoubleRangeSlider/DoubleRangeSlider';
import React from 'react';
import { SearchParams } from './SearchParams/SearchParams';

export const PackFiltration = () => {

    return (
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
            <div>
                <div>search</div>
                <SearchParams/>
            </div>
            <div>
                <div>Show pack cards</div>
                <button>My</button>
                <button>All</button>
            </div>
            <div>
                <div>number of cards</div>
                <SliderComponent/>
            </div>
            <div>
                <button>clear filters</button>
            </div>
        </div>
    )
}