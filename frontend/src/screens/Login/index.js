import React, { useState } from 'react';
import styles from './login.module.css';
import { Link } from 'react-router-dom';
import OtpInput from 'react-otp-input';

const Login = () => {
    const [show, setShow] = useState(false);

    const onGenerateOTP = (e) => {
        e.preventDefault();
        setShow(true)
    }

    return (
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
                                    // value={email}
                                    // onChange={handleFormData}
                                    />
                                </div>
                                <button className={`btn btn-primary ${styles.login_button}`}>Generate OTP</button>
                                {/* <p>Note:  You may get OTP in spam folder of your mail</p> */}
                                <p className={styles.check_status}> Don't have Account ? <Link to='/register' className={styles.text_white}>REGISTER</Link> </p>
                            </form>
                        ) : (
                            <form>
                                <h1 className={styles.heading}>Login</h1>

                                <div className={styles.form_container}>
                                    <OtpInput
                                        // value={this.state.otp}
                                        // onChange={this.handleChange}
                                        numInputs={6}
                                        separator={<span>-</span>}
                                        inputStyle={styles.inputStyle}
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
}


export default Login