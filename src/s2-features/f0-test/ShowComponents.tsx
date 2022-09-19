import React from 'react';
import {Checkbox} from '../../s1-main/m1-ui/common/c1-components/Checkbox/Checkbox';
import {Input} from '../../s1-main/m1-ui/common/c1-components/Input/Input';
import {Button} from '../../s1-main/m1-ui/common/c1-components/Button/Button';
import style from './ShowComponents.module.scss'
import {PasswordView} from '../../s1-main/m1-ui/common/c1-components/passwordView/PasswordView';

export const ShowComponents = () => {
    return (
        <div className={style.showComponents}>
            <div className={style.componentsContainer}>
                <h1>ShowComponents</h1>
                <div className={style.checkboxItem}>
                    <Checkbox>hello</Checkbox>
                </div>
                <Input/>
                <Input error={'some error'}/>
                <div className={style.buttonContainer}>
                    <Button>active</Button>
                    <Button red>red</Button>
                    <Button disabled>disabled</Button>
                </div>
                <PasswordView/>
            </div>
        </div>
    );
};
