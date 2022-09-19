import React from 'react';

import styleContainer from '../../../s1-main/m1-ui/common/c2-styles/Container.module.css';
import style from './ForgotPassword.module.scss';
import styleBlock from '../../../s1-main/m1-ui/common/c2-styles/Block.module.css';

import {Input} from '../../../s1-main/m1-ui/common/c1-components/Input/Input';
import {Button} from '../../../s1-main/m1-ui/common/c1-components/Button/Button';

import {Link} from 'react-router-dom';
import {login} from '../../../s1-main/m1-ui/u1-Route/Variables/routeVariables';

export const ForgotPassword = () => {
    return (
        <div className={`${styleContainer.container} ${style.forgotPassContainer}`}>
            <div className={`${styleBlock.block} ${style.forgotPassBlock}`}>
                <h1 className={style.header}>
                    Forgot your password?
                </h1>
                <Input name={'email'}
                       placeholder={'email'}
                       className={style.input}
                />
                <span className={style.instructionBlock}>
                    Enter your email address and we will send you further instruction
                </span>

                <Button>Send Instruction</Button>

                <span className={style.informationText}>
                    <b>Did you remember your password?</b>
                </span>
                <Link to={login}>
                    <span className={style.linkToLogin}>Try logging in</span>
                </Link>
            </div>
        </div>
    );
};
