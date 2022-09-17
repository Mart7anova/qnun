import React, {useState} from 'react'
import {useFormik} from "formik";
import {Link, Navigate} from "react-router-dom";
import {login} from "../../../s1-main/m1-ui/u1-Route/Variables/routeVariables";
import registration from "../a2-registration/Registration.module.scss"
import {AppRootStateType, useAppDispatch} from "../../../s1-main/m2-bll/store";
import {registrationThunk} from "../../../s1-main/m2-bll/reducers/auth-reducer";
import {useSelector} from "react-redux";

type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}
export const Registration = () => {
    const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isAuth)
    const dispatch = useAppDispatch()

    const [isHidePass, setHidePass] = useState<boolean>(true)
    const [isHideConfirmPass, setHideConfirmPass] = useState<boolean>(true)

    const onClickHandlerPass = () => {
        isHidePass ? setHidePass(!true) : setHidePass(true)
    }
    const onClickHandlerConfirmPass = () => {
        isHideConfirmPass ? setHideConfirmPass(!true) : setHideConfirmPass(true)
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: ""
        },
        validate: (values) => {
            const errors: FormikErrorType = {};

            if (!values.email) {
                errors.email = "Required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address"
            }

            if (!values.password) {
                errors.password = "Required";
            } else if (values.password.length < 8) {
                errors.password = "Put more then 8 symbols, please.";
            } else if (!values.password) {
                errors.password = "Symbol required!";
            } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = "Password not matched"
            }

            if (values.confirmPassword.length < 8) {
                errors.confirmPassword = "Put more then 8 symbols, please."
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

    if (isLoggedIn) {
        return <Navigate to={login}/>
    }
    return (
        <div>
            <div className={registration.mainBlock}>
                <div className={registration.childrenBlock}>
                    <h1>SIGN UP</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <div style={{marginLeft: "-135px"}}>Email</div>
                            <input type="email" style={{width: "185px"}} {...formik.getFieldProps("email")}/>
                            {formik.touched.email &&
                            formik.errors.email ?
                                <div style={{
                                    color: "#f03045",
                                    fontSize: "14px"
                                }}>{formik.errors.email}</div> : null}
                        </div>

                        <div>
                            <div style={{marginLeft: "-107px"}}>Password</div>
                            {isHidePass ? <input type="password"  {...formik.getFieldProps("password")}/>
                                : <input {...formik.getFieldProps("confirmPassword")} />}
                            <button type="button" onClick={onClickHandlerPass}>{isHidePass ? <span>+</span> : <span>-</span>}</button>
                            {formik.touched.password &&
                            formik.errors.password ?
                                <div style={{color: "#f03045", fontSize: "14px"}}>{formik.errors.password}</div> : null}
                        </div>

                        <div>
                            <div style={{marginLeft: "-45px"}}>Confirm password</div>
                            {isHideConfirmPass ? <input type="password" {...formik.getFieldProps("confirmPassword")}/>
                                : <input {...formik.getFieldProps("confirmPassword")}/>
                            }
                            <button type="button" onClick={onClickHandlerConfirmPass}>{isHideConfirmPass ? <span>+</span> : <span>-</span>}</button>
                            {formik.touched.confirmPassword &&
                            formik.errors.confirmPassword ?
                                <div style={{
                                    color: "#f03045",
                                    fontSize: "14px"
                                }}>{formik.errors.confirmPassword}</div> : null}
                        </div>

                        <button type="submit" style={{marginTop: "10px", marginBottom: "10px"}}>
                            Sign Up
                        </button>
                    </form>

                    <div>Already have account?</div>
                    <span>
                        <Link style={{textDecoration: "none", color: "#6b90cc"}} to={login}>Sign In</Link> </span>
                </div>
            </div>
        </div>
    )
}