import React from 'react'
import {useFormik} from "formik";
import {Link} from "react-router-dom";
import {login} from "../../../s1-main/m1-ui/u1-Route/Variables/routeVariables";

export const Registration = () => {
    // const dispatch = store.dispatch

    type FormikErrorType = {
        password?: string
        username?: string
        displayName?: string
        confirmPassword?: string
    }

    const formik = useFormik({
        initialValues: {
            password: "",
            username: "",
            displayName: "",
            confirmPassword: ""
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.displayName) {
                errors.displayName = "Required";
            } else if (values.displayName.length < 3) {
                errors.displayName = "Put more then 3 symbols, please.";
            } else if (!values.displayName) {
                errors.displayName = "Symbol required!";
            }
            if (!values.username) {
                errors.username = "Required";
            } else if (values.username.length < 3) {
                errors.username = "Put more then 3 symbols, please.";
            } else if (!values.username) {
                errors.username = "Symbol required!";
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
                username: values.username,
                password: values.password,
                displayName: values.displayName,
            }
            // dispatch(authThunk(authData) as any);
            formik.resetForm()
        },
    })

    return (

        <form onSubmit={formik.handleSubmit}>
            <input {...formik.getFieldProps("displayName")}/>
            {formik.touched.displayName &&
            formik.errors.displayName ?
                <div style={{color: "#f03045"}}>{formik.errors.displayName}</div> : null}

            <input {...formik.getFieldProps("username")}/>
            {formik.touched.username &&
            formik.errors.username ?
                <div style={{color: "#f03045"}}>{formik.errors.username}</div> : null}

            <input  {...formik.getFieldProps("password")}
            />
            {formik.touched.password &&
            formik.errors.password ?
                <div style={{color: "#f03045"}}>{formik.errors.password}</div> : null}

            <input  {...formik.getFieldProps("confirmPassword")}
            />
            {formik.touched.confirmPassword &&
            formik.errors.confirmPassword ?
                <div style={{color: "#f03045"}}>{formik.errors.confirmPassword}</div> : null}

            <button style={{marginTop: "10px", marginBottom: "10px"}} type={"submit"}>
                Sign Up
            </button>
            {/*<span>I have an account. <Link*/}
            {/*    style={{textDecoration: "none", color: "#6b90cc"}}*/}
            {/*    to={login}>Go to Sign In</Link> </span>*/}

        </form>
)
}
