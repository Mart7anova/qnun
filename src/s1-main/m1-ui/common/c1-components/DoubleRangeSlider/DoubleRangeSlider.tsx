import * as React from 'react';
import Slider from '@mui/material/Slider';


export function SliderComponent() {
		const [value, setValue] = React.useState<number[]>([0, 125])

		const handleChange1 = (
				event: Event,
				newValue: number | number[],
				activeThumb: number,
		) => {
				if (!Array.isArray(newValue)) {
						return
				}
				if (activeThumb === 0) {
						setValue([Math.min(newValue[0], value[1]), value[1]]);
				} else {
						setValue([value[0], Math.max(newValue[1], value[0])]);
				}
		};

		return (
				<Slider
						value={value}
						onChange={handleChange1}
						valueLabelDisplay="auto"
						max={200}
				/>
		);
}
