import React from 'react';
import styles from './register.module.css';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className={styles.register_div}>

            <div className={styles.register_form}>
                <div className={styles.form_div}>
                    <form>
                        <h1 className={styles.heading}>Register</h1>
                        <div className={styles.form_container}>
                            <input
                                className={styles.input_login}
                                placeholder="Name"
                                type="text"
                                name="name"
                            // value={name}
                            // onChange={handleFormData}
                            />
                        </div>

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
                        <button className={`btn btn-primary ${styles.login_button}`}>Register</button>
                        <p className={styles.check_status}> Already have Account ? <Link to='/login' className={styles.text_white}>LOGIN</Link> </p>
                    </form>
                </div>

                <div className={styles.image}>
                </div>

            </div>
        </div>
    )
}

export default Register;