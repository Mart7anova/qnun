import React from 'react';
import s from './Login.module.scss'
import {Input} from 's1-main/m1-ui/common/c1-components/Input/Input';
import {Checkbox} from 's1-main/m1-ui/common/c1-components/Checkbox/Checkbox';
import {Button} from 's1-main/m1-ui/common/c1-components/Button/Button';
import {Link, Navigate} from 'react-router-dom';
import {useFormik} from 'formik';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from 's1-main/m2-bll/store';
import {forgotPassword, profile, registration} from 's1-main/m1-ui/u1-Route/Variables/routeVariables';
import {loginThunk} from 's1-main/m2-bll/reducers/auth-reducer';


export const Login = () => {
		const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn)
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
		if (isLoggedIn) return <Navigate to={profile}/>
		return (
				<div className={s.loginPage}>
						<div className={s.formWrapper}>
								<form onSubmit={formik.handleSubmit} className={s.form}>
										<h1 className={s.title}>Sign in</h1>
										<span className={s.label}>Email</span>
										<Input {...formik.getFieldProps('email')}/>
										<span className={s.label}>Password</span>
										<Input type="password" {...formik.getFieldProps('password')}/>
										<Checkbox {...formik.getFieldProps('rememberMe')}>Remember me</Checkbox>
										<Link to={forgotPassword}>
												<span>Forgot Password?</span>
										</Link>
										<Button>Sign in</Button>
										<span>If you don't have an account?</span>
										<Link to={registration}>
											<span className={s.signUpButton}>Sign Up</span>
										</Link>
								</form>
						</div>
				</div>
		);
};
