import React from 'react';
import {Button} from 's1-main/m1-ui/common/c1-components/Button/Button';

type EmptyPackPropsType = {
		isOwner: boolean
		addNewCardHandle: () => void
}

export const EmptyPack = ({isOwner, addNewCardHandle}: EmptyPackPropsType) => {
		return (
				<div style={{textAlign: 'center', marginTop: '80px'}}>
						{isOwner
								? <>
										<h2>This pack is empty. Click add new card to fill
												this pack</h2>
										<Button onClick={addNewCardHandle}>Add new card</Button>
								</>
								: <h2>This pack is empty</h2>
						}
				</div>
		);
};
