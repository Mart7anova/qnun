import {SliderComponent} from 's1-main/m1-ui/common/c1-components/DoubleRangeSlider/DoubleRangeSlider';
import React from 'react';

export const PackFiltration = () => {
		return (
				<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
						<div>
								<div>search</div>
								<input placeholder="provide Your text"/>
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