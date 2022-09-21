import React from 'react';

import styleContainer from '../../../s1-main/m1-ui/common/c2-styles/Container.module.css';
import style from './NewPassword.module.scss';
import styleBlock from '../../../s1-main/m1-ui/common/c2-styles/Block.module.css';

import {Button} from '../../../s1-main/m1-ui/common/c1-components/Button/Button';
import {PasswordView} from '../../../s1-main/m1-ui/common/c1-components/passwordView/PasswordView';
import {useAppDispatch, useAppSelector} from '../../../s1-main/m2-bll/store';
import {Navigate, useParams} from 'react-router-dom';
import {useFormik} from 'formik';
import {statusRequestAC, updatePassword} from '../../../s1-main/m2-bll/reducers/auth-reducer';
import {login} from '../../../s1-main/m1-ui/u1-Route/Variables/routeVariables';

type FormikErrorType = {
    password?: string
    confirmPassword?: string
}

export const NewPassword = () => {
    const statusRequest = useAppSelector(state => state.auth.statusRequest)
    const dispatch = useAppDispatch()
    const params = useParams()


    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};

            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 8) {
                errors.password = 'Put more then 8 symbols, please.'
            } else if (!values.password) {
                errors.password = 'Symbol required!'
            }
            if (!values.confirmPassword) {
                errors.confirmPassword = 'Required'
            } else if (values.confirmPassword.length < 8) {
                errors.confirmPassword = 'Put more then 8 symbols, please.'
            } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Password not matched'
            }
            return errors
        },
        onSubmit: values => {
            if (params['*'] !== undefined) {
                dispatch(updatePassword(values.password, params['*']))
            }
            formik.resetForm()
        }
    })

    const errorPass = formik.touched.password && formik.errors.password ? formik.errors.password : ''
    const errorConfirmPassword = formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : ''

    if(statusRequest === 'setNewPassword success —ฅ/ᐠ.̫ .ᐟฅ—'){
        dispatch(statusRequestAC(null))
        return <Navigate to={login}/>
    }

    return (
        <div className={`${styleContainer.container} ${style.newPassContainer}`}>
            <form onSubmit={formik.handleSubmit}>
                <div className={`${styleBlock.block} ${style.newPassBlock}`}>
                    <h1 className={style.header}>
                        Create new password
                    </h1>
                    <PasswordView placeholder={'password'}
                                  className={style.input}
                                  error={errorPass}
                                  {...formik.getFieldProps('password')}
                    />
                    <PasswordView placeholder={'repeat the password'}
                                  className={style.input}
                                  error={errorConfirmPassword}
                                  {...formik.getFieldProps('confirmPassword')}
                    />
                    <span className={style.informationText}>
                        Create new password and we will send you further instructions to email
                    </span>
                    <Button type={'submit'}>Create new password</Button>
                </div>
            </form>
        </div>
    );
};