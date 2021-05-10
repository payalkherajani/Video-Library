import React from 'react';
import styles from './login.module.css';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className={styles.register_div}>
            <div className={styles.register_form}>

                <div className={styles.form_div}>
                    <form>
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
                </div>

                <div className={styles.image}>
                </div>

            </div>
        </div>
    )
}


export default Login