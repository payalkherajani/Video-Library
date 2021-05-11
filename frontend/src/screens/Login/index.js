import React, { useState } from 'react';
import styles from './login.module.css';
import { Link, Navigate } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import { toast } from 'react-toastify';
import useCustomContext from '../../customHooks/Hook';
import axios from 'axios';
import { SET_TOKEN_IN_LOCALSTORAGE } from '../../constants/type';

const Login = () => {
    const [show, setShow] = useState(false);
    const { dispatch } = useCustomContext();
    const [formData, setFormData] = useState({
        email: "",
        otp: ""
    })

    const { email, otp } = formData;

    const onGenerateOTP = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/generateotp`, { "email": email });
            if (response.status) {
                setShow(true)
            }
        } catch (err) {
            const error = err.response.data.message;
            toast.error(`${error}`);
        }
    }

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const { data: { token } } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/login`, { "email": formData.email, "otp": formData.otp });
            dispatch({ type: SET_TOKEN_IN_LOCALSTORAGE, payload: token })
        } catch (err) {
            const error = err.response.data.message;
            toast.error(`${error}`);
        }
        finally {
            setShow(false)
        }
    }

    const handleFormData = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleOTP = (otp) => {
        setFormData({ ...formData, otp: Number(otp) })
    }

    return (
        localStorage.getItem('token') ? (<Navigate to="/landing" />) : (
            <div className={styles.register_div}>
                <div className={styles.register_form}>

                    <div className={styles.form_div}>
                        {
                            show === false ? (
                                <form onSubmit={onGenerateOTP} style={{ padding: "1rem" }}>
                                    <h1 className={styles.heading}>Login</h1>

                                    <div className={styles.form_container}>
                                        <input
                                            className={styles.input_login}
                                            placeholder="Email"
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={handleFormData}
                                        />
                                    </div>
                                    <button className={`btn btn-primary ${styles.login_button}`}>Generate OTP</button>
                                    {/* <p>Note:  You may get OTP in spam folder of your mail</p> */}
                                    <p className={styles.check_status}> Don't have Account ? <Link to='/register' className={styles.text_white}>REGISTER</Link> </p>
                                </form>
                            ) : (
                                <form onSubmit={loginUser}>
                                    <h1 className={styles.heading}>Login</h1>

                                    <div className={styles.form_container} style={{ color: "black" }}>
                                        <OtpInput
                                            onChange={handleOTP}
                                            value={otp}
                                            numInputs={6}
                                            separator={<span>-</span>}
                                            inputStyle={styles.inputStyle}
                                            isInputNum={true}
                                            type="number"
                                            shouldAutoFocus={true}
                                        />
                                    </div>
                                    <button className={`btn btn-primary ${styles.login_button}`}>Login</button>
                                </form>
                            )
                        }
                    </div>

                    <div className={styles.image}>
                    </div>
                </div>
            </div>
        )
    )
}


export default Login