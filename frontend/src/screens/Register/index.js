import React, { useState } from 'react';
import styles from './register.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
    let navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    })

    const { name, email } = formData;
    const registerUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/register`, { "name": name, "email": email })
            if (response.status === 200) {
                navigate("/login");
            }
        } catch (err) {
            const error = err.response.data.message;
            toast.error(`${error}`);
        }
        finally {
            setFormData({ ...formData, name: '', email: '' })
        }
    }
    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    return (
        <div className={styles.register_div}>

            <div className={styles.register_form}>
                <div className={styles.form_div}>
                    <form onSubmit={registerUser}>
                        <h1 className={styles.heading}>Register</h1>
                        <div className={styles.form_container}>
                            <input
                                className={styles.input_login}
                                placeholder="Name"
                                type="text"
                                name="name"
                                value={name}
                                onChange={handleFormData}
                                required
                            />
                        </div>

                        <div className={styles.form_container}>
                            <input
                                className={styles.input_login}
                                placeholder="Email"
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleFormData}
                                required
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