import React from 'react';
import styleContainer from '../../../s1-main/m1-ui/common/c2-styles/Container.module.css';
import style from './ForgotPassword.module.scss';
import styleBlock from '../../../s1-main/m1-ui/common/c2-styles/Block.module.css';
import {Input} from '../../../s1-main/m1-ui/common/c1-components/Input/Input';
import {Button} from '../../../s1-main/m1-ui/common/c1-components/Button/Button';
import {Link, Navigate} from 'react-router-dom';
import {checkEmail, login} from '../../../s1-main/m1-ui/u1-Route/Variables/routeVariables';
import {useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from '../../../s1-main/m2-bll/store';
import {forgotPass} from '../../../s1-main/m2-bll/reducers/auth-reducer';

type FormikErrorType = {
    email?: string
}

export const ForgotPassword = () => {
    const statusRequest = useAppSelector(state => state.auth.statusRequest)
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: values => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            return errors
        },
        onSubmit: (values) => {
            dispatch(forgotPass(values.email))
        }
    })

    const errorEmail = formik.touched.email && formik.errors.email ? formik.errors.email : ''

    console.log(statusRequest)
    if (statusRequest === 'request has been sent') {
        return <Navigate to={checkEmail}/>
    }

    return (
        <div className={`${styleContainer.container} ${style.forgotPassContainer}`}>
            <form onSubmit={formik.handleSubmit}>
                <div className={`${styleBlock.block} ${style.forgotPassBlock}`}>
                    <h1 className={style.header}>
                        Forgot your password?
                    </h1>

                    <Input placeholder={'email'}
                           className={style.input}
                           error={errorEmail}
                           {...formik.getFieldProps('email')}
                    />
                    <span className={style.instructionBlock}>
                    Enter your email address and we will send you further instruction
                </span>

                    <Button type={'submit'}>Send Instruction</Button>

                    <span className={style.informationText}>
                    <b>Did you remember your password?</b>
                </span>
                    <Link to={login}>
                        <span className={style.linkToLogin}>Try logging in</span>
                    </Link>
                </div>
            </form>
        </div>
    );
};
