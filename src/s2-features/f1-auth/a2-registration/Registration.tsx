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
            confirmPassword: ''
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
                        {/*<div>
                            <div style={{marginLeft: '-135px'}}>Email</div>
                            <input type="email" style={{width: '185px'}} {...formik.getFieldProps('email')}/>
                            {formik.touched.email &&
                            formik.errors.email ?
                                <div style={{
                                    color: '#f03045',
                                    fontSize: '14px'
                                }}>{formik.errors.email}</div> : null}
                        </div>*/}

                        <div>Email</div>
                        <Input className={registration.input} type={'email'} error={errorEmail} {...formik.getFieldProps('email')}/>

                        {/*<div>
                            <div style={{marginLeft: '-107px'}}>Password</div>
                            {isHidePass ? <input type="password"  {...formik.getFieldProps('password')}/>
                                : <input {...formik.getFieldProps('password')} />}
                            <button type="button" onClick={onClickHandlerPass}>{
                                isHidePass ?
                                    <img src="https://cdn-icons-png.flaticon.com/512/3945/3945105.png"
                                         style={{width: '20px'}}></img> :
                                    <img src="https://cdn-icons-png.flaticon.com/512/1693/1693945.png"
                                         style={{width: '20px'}}></img>}
                            </button>
                            {formik.touched.password &&
                            formik.errors.password ?
                                <div style={{color: '#f03045', fontSize: '14px'}}>{formik.errors.password}</div> : null}
                        </div>*/}

                        <div>Password</div>
                        <PasswordView className={registration.input} error={errorPass} {...formik.getFieldProps('password')}/>

                        {/*<div>
                            <div style={{marginLeft: '-45px'}}>Confirm password</div>
                            {isHideConfirmPass ? <input type="password" {...formik.getFieldProps('confirmPassword')}/>
                                : <input {...formik.getFieldProps('confirmPassword')}/>
                            }
                            <button type="button" onClick={onClickHandlerConfirmPass}>
                                {isHideConfirmPass ?
                                    <img src="https://cdn-icons-png.flaticon.com/512/3945/3945105.png"
                                         style={{width: '20px'}}></img> :
                                    <img src="https://cdn-icons-png.flaticon.com/512/1693/1693945.png"
                                         style={{width: '20px'}}></img>}
                            </button>
                            {formik.touched.confirmPassword &&
                            formik.errors.confirmPassword ?
                                <div style={{
                                    color: '#f03045',
                                    fontSize: '14px',
                                }}>{formik.errors.confirmPassword}</div> : null}
                        </div>*/}

                        <div>Confirm password</div>
                        <PasswordView className={registration.input} error={errorConfirmPassword} {...formik.getFieldProps('confirmPassword')}/>

                        <Button>Sign Up</Button>
                    </form>

                    <div>Already have account?</div>
                    <span>
                        <Link style={{textDecoration: 'none', color: '#6b90cc'}} to={login}>Sign In</Link> </span>
                </div>
            </div>
        </div>
    )
}