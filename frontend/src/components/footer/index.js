import React from 'react'
import styles from './footer.module.css';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <footer className={styles.footer} >
            <div className={styles.copywrite}>
                <p className={styles.padding_one}>  Copyright &copy; 2021 Khidki </p>
                <p className={styles.padding_one}> Connect with me @here <i className="fab fa-connectdevelop" style={{ color: "red" }}></i> </p>
            </div>

            <div>
                <ul className={styles.unorderedlist}>
                    <li className={styles.list_item}>
                        <Link to="/">
                            <i className="fab fa-twitter" style={{ color: "white", fontSize: "2rem" }}></i>
                        </Link>
                    </li>

                    <li className={styles.list_item}>
                        <Link to="/">
                            <i className="fab fa-linkedin-in" style={{ color: "white", fontSize: "2rem" }}></i>
                        </Link>
                    </li>

                    <li className={styles.list_item}>
                        <Link to="/">
                            <i className="fab fa-github" style={{ color: "white", fontSize: "2rem" }}></i>
                        </Link>
                    </li>

                    <li className={styles.list_item}>
                        <Link to="/">
                            <i className="fab fa-instagram" style={{ color: "white", fontSize: "2rem" }}></i>
                        </Link>
                    </li>
                </ul>
            </div>

        </footer>
    )
}

export default Footer;