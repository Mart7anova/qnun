import React from 'react'
import {useFormik} from 'formik';
import {Link, Navigate} from 'react-router-dom';
import {PATH} from 's1-main/m1-ui/u1-Route/Variables/routeVariables';
import style from '../a2-registration/Registration.module.scss'
import {AppRootStateType, useAppDispatch} from 's1-main/m2-bll/store';
import {registration} from 's1-main/m2-bll/reducers/auth-reducer';
import {useSelector} from 'react-redux';
import {PasswordView} from 's1-main/m1-ui/common/c1-components/passwordView/PasswordView';
import {Input} from 's1-main/m1-ui/common/c1-components/Input/Input';
import {Button} from 's1-main/m1-ui/common/c1-components/Button/Button';
import styleContainer from 's1-main/m1-ui/common/c2-styles/Container.module.css';
import styleBlock from 's1-main/m1-ui/common/c2-styles/Block.module.css';

type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export const Registration = () => {
    const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isAuth)
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};

            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }

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
            let authData = {
                email: values.email,
                password: values.password
            }
            dispatch(registration(authData.email, authData.password))
            formik.resetForm()
        }
    })

    const errorEmail = formik.touched.email && formik.errors.email ? formik.errors.email : ''
    const errorPass = formik.touched.password && formik.errors.password ? formik.errors.password : ''
    const errorConfirmPassword = formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : ''

    if (isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }
    return (
        <div>
            <div className={`${styleContainer.container} ${style.mainBlock}`}>
                <div className={`${styleBlock.block} ${style.childrenBlock}`}>
                    <h1 className={style.title}>Sing up</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={style.nameDirection}>Email</div>
                        <Input type={'email'}
                               error={errorEmail} {...formik.getFieldProps('email')}/>

                        <div className={style.nameDirection}>Password</div>
                        <PasswordView className={style.input}
                                      error={errorPass} {...formik.getFieldProps('password')}/>

                        <div className={style.nameDirection}>Confirm password</div>
                        <PasswordView className={style.input}
                                      error={errorConfirmPassword} {...formik.getFieldProps('confirmPassword')}/>

                        <Button className={style.btn}>Sign Up</Button>
                    </form>

                    <div className={style.infoBlock}>Already have account?</div>
                    <Link to={PATH.LOGIN} className={style.linkStyle}>Sign In</Link>
                </div>
            </div>
        </div>
    )
}