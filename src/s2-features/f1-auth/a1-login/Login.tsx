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
import styleContainer from 's1-main/m1-ui/common/c2-styles/Container.module.css';
import {PasswordView} from 's1-main/m1-ui/common/c1-components/passwordView/PasswordView';


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
						dispatch(loginThunk(values.email, values.password, values.rememberMe, formik.setStatus))
				}
		})
		if (isLoggedIn) return <Navigate to={profile}/>

		return (
				<div className={s.loginPage}>
						<div className={styleContainer.container}>
								<div className={s.formWrapper}>
										<form onSubmit={formik.handleSubmit} className={s.form}>
												<h1 className={s.title}>Sign in</h1>

												<span className={s.label}>Email</span>
												<Input {...formik.getFieldProps('email')}/>

												<span className={s.label}>Password</span>
												<PasswordView type="password" {...formik.getFieldProps('password')}/>
												<div>
														<Checkbox {...formik.getFieldProps('rememberMe')}>Remember
																me</Checkbox>
												</div>

												<Link to={forgotPassword} className={s.forgotPasswordLink}>
														<span>Forgot Password?</span>
												</Link>
												{formik.status && <span className={s.generalFormError}>{formik.status.error}</span>}
												<Button>Sign in</Button>

												<span className={s.alreadyHaveAccount}>Already have an account?</span>
												<Link to={registration} className={s.signUpButton}>
														Sign Up
												</Link>
										</form>
								</div>
						</div>
				</div>
		);
};
