import React from 'react'
import styles from './footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer} >
            <div className={styles.copywrite}>
                <p className={styles.padding_one}> Copyright &copy; 2021 Khidki </p>
                <p className={styles.padding_one}> Connect with me @here <i className={`fab fa-connectdevelop ${styles.icon_red}`}></i> </p>
            </div>

            <div>
                <ul className={styles.unorderedlist}>
                    <li className={styles.list_item}>
                        <a href="https://twitter.com/payal_kherajani" target="_blank">
                            <i className={`fab fa-twitter ${styles.icon_styling}`}></i>
                        </a>
                    </li>

                    <li className={styles.list_item}>
                        <a href="https://www.linkedin.com/in/payalkherajani/" target="_blank">
                            <i className={`fab fa-linkedin-in ${styles.icon_styling}`}></i>
                        </a>
                    </li>

                    <li className={styles.list_item}>
                        <a href="https://github.com/payalkherajani" target="_blank">
                            <i className={`fab fa-github ${styles.icon_styling}`}></i>
                        </a>
                    </li>

                    <li className={styles.list_item}>
                        <a href="https://www.instagram.com/" target="_blank">
                            <i className={`fab fa-instagram ${styles.icon_styling}`}></i>
                        </a>
                    </li>
                </ul>
            </div>

        </footer>
    )
}

export default Footer;