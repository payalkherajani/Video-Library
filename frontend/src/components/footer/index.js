import React from 'react'
import styles from './footer.module.css'


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
                        <a href="/">
                            <i class="fab fa-twitter" style={{ color: "white", fontSize: "2rem" }}></i>
                        </a>
                    </li>

                    <li className={styles.list_item}>
                        <a href="/">
                            <i class="fab fa-linkedin-in" style={{ color: "white", fontSize: "2rem" }}></i>
                        </a>
                    </li>

                    <li className={styles.list_item}>
                        <a href="/">
                            <i class="fab fa-github" style={{ color: "white", fontSize: "2rem" }}></i>
                        </a>
                    </li>

                    <li className={styles.list_item}>
                        <a href="/">
                            <i class="fab fa-instagram" style={{ color: "white", fontSize: "2rem" }}></i>
                        </a>
                    </li>
                </ul>
            </div>

        </footer>
    )
}

export default Footer;