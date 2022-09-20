import React from 'react'
import {useFormik} from 'formik';
import {Link, Navigate} from 'react-router-dom';
import {login} from '../../../s1-main/m1-ui/u1-Route/Variables/routeVariables';
import registration from '../a2-registration/Registration.module.scss'
import {AppRootStateType, useAppDispatch} from '../../../s1-main/m2-bll/store';
import {registrationThunk} from '../../../s1-main/m2-bll/reducers/auth-reducer';
import {useSelector} from 'react-redux';
import {PasswordView} from '../../../s1-main/m1-ui/common/c1-components/passwordView/PasswordView';
import {Input} from '../../../s1-main/m1-ui/common/c1-components/Input/Input';
import {Button} from '../../../s1-main/m1-ui/common/c1-components/Button/Button';
import styleContainer from '../../../s1-main/m1-ui/common/c2-styles/Container.module.css';
import styleBlock from '../../../s1-main/m1-ui/common/c2-styles/Block.module.css';

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
            dispatch(registrationThunk(authData.email, authData.password))
            formik.resetForm()
        }
    })

    const errorEmail = formik.touched.email && formik.errors.email ? formik.errors.email : ''
    const errorPass = formik.touched.password && formik.errors.password ? formik.errors.password : ''
    const errorConfirmPassword = formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : ''

    if (isLoggedIn) {
        return <Navigate to={login}/>
    }

    return (
        <div>
            <div className={`${styleContainer.container} ${registration.mainBlock}`}>
                <div className={`${styleBlock.block} ${registration.childrenBlock}`}>

                    <h1>Sing up</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={registration.nameDirection}>Email</div>
                        <Input type={'email'}
                               error={errorEmail} {...formik.getFieldProps('email')}/>

                        <div className={registration.nameDirection}>Password</div>
                        <PasswordView className={registration.input}
                                      error={errorPass} {...formik.getFieldProps('password')}/>

                        <div className={registration.nameDirection}>Confirm password</div>
                        <PasswordView className={registration.input}
                                      error={errorConfirmPassword} {...formik.getFieldProps('confirmPassword')}/>

                        <Button className={registration.btn}>Sign Up</Button>
                    </form>

                    <div>Already have account?</div>
                    <span className={registration.linkStyle}>
                        <Link style={{textDecoration: 'none', color: '#6b90cc'}} to={login}>Sign In</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}