import React from 'react';
import {Button} from 's1-main/m1-ui/common/c1-components/Button/Button';
import {useAppSelector} from '../../s1-main/m2-bll/store';
import {getAppStatus} from '../../s1-main/m2-bll/selectors/app-selectors';

type EmptyPackPropsType = {
    isOwner: boolean
    addNewCardHandle: () => void
}

export const EmptyPack = ({isOwner, addNewCardHandle}: EmptyPackPropsType) => {
    const appStatus = useAppSelector(getAppStatus)

    return (
        <div style={{textAlign: 'center', marginTop: '80px'}}>
            {isOwner
                ? <>
                    <h2>This pack is empty. Click add new card to fill
                        this pack</h2>
                    <Button onClick={addNewCardHandle} disabled={appStatus==='loading'}>Add new card</Button>
                </>
                : <h2>This pack is empty</h2>
            }
        </div>
    );
};
