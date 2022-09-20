import React from 'react';
import s from './Login.module.scss'
import {Input} from '../../../s1-main/m1-ui/common/c1-components/Input/Input';
import {Checkbox} from '../../../s1-main/m1-ui/common/c1-components/Checkbox/Checkbox';
import {Button} from '../../../s1-main/m1-ui/common/c1-components/Button/Button';
import {Link, Navigate} from 'react-router-dom';
import {useFormik} from 'formik';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from '../../../s1-main/m2-bll/store';
<<<<<<<<< Temporary merge branch 1
import {profile, registration} from '../../../s1-main/m1-ui/u1-Route/Variables/routeVariables';
=========
import {forgotPassword, profile} from '../../../s1-main/m1-ui/u1-Route/Variables/routeVariables';
>>>>>>>>> Temporary merge branch 2
import {loginThunk} from '../../../s1-main/m2-bll/reducers/auth-reducer';


export const Login = () => {
		const isAuth = useSelector<AppRootStateType>(state => state.auth.isAuth)
		const dispatch = useAppDispatch()

		const formik = useFormik({
				initialValues: {
						email: '',
						password: '',
						rememberMe: false,
				},
				// validate: values => {
				// },
				onSubmit: (values) => {
						dispatch(loginThunk(values.email, values.password, values.rememberMe))
				}
		})
		if (isAuth) return <Navigate to={profile}/>
		return (
				<div className={s.loginPage}>
						<div className={s.formWrapper}>
								<form onSubmit={formik.handleSubmit} className={s.form}>
										<h1>Sign In</h1>
										<span>Email</span>
										<Input {...formik.getFieldProps('email')}/>
										<span>Password</span>
										<Input type="password" {...formik.getFieldProps('password')}/>
										<Checkbox {...formik.getFieldProps('rememberMe')}>Remember me</Checkbox>
										<Link to={forgotPassword}>
												<span>Forgot Password?</span>
										</Link>
										<Button>Sign In</Button>
										<span>If you don't have an account?</span>
										<Link to={registration}>
											<span className={s.signUpButton}>Sign Up</span>
										</Link>
								</form>
						</div>
				</div>
		);
};
