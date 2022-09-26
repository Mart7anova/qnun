import {SliderComponent} from 's1-main/m1-ui/common/c1-components/DoubleRangeSlider/DoubleRangeSlider';
import React from 'react';
import {SearchInput} from 's2-features/f3-packsList/PackFiltration/SearchInput/SearchInput';
import {useAppDispatch} from 's1-main/m2-bll/store';
import {clearFilters} from 's1-main/m2-bll/reducers/packs-reducer';

type PackFiltrationPropsType = {
		packName: string
}

export const PackFiltration = ({packName}: PackFiltrationPropsType) => {
		const dispatch = useAppDispatch()

		const clearFiltersHandle = () => {
				dispatch(clearFilters())
		}
		return (
				<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
						<div>
								<div>search</div>
								<SearchInput packName={packName}/>
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
								<button onClick={clearFiltersHandle}>clear filters</button>
						</div>
				</div>
		)
}