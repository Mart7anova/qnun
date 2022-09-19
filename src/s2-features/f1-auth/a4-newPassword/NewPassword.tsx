import React from 'react';

import styleContainer from '../../../s1-main/m1-ui/common/c2-styles/Container.module.css';
import style from './NewPassword.module.scss';
import styleBlock from '../../../s1-main/m1-ui/common/c2-styles/Block.module.css';

import {Button} from '../../../s1-main/m1-ui/common/c1-components/Button/Button';
import {PasswordView} from '../../../s1-main/m1-ui/common/c1-components/passwordView/PasswordView';

export const NewPassword = () => {
    return (
        <div className={`${styleContainer.container} ${style.newPassContainer}`}>
            <div className={`${styleBlock.block} ${style.newPassBlock}`}>
                <h1 className={style.header}>
                    Create new password
                </h1>
                <PasswordView placeholder={'password'}
                              className={style.input}
                />
                <span className={style.informationText}>
                    Create new password and we will send you further instructions to email
                </span>
                <Button>Create new password</Button>
            </div>
        </div>
    );
};