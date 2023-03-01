
import React from 'react';
import styles from './Footer.module.css';

function Footer() {
    let fecha = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.site_footer}>
                <div className={styles.copyright}>
                    <p>
                        Page created by Ignacio Quirelli
                    </p>
                    <p>&copy; {fecha}. All Rights Reserved.</p>
                </div>
                <div className={styles.redes_sociales}>
                    <a href="https://www.linkedin.com/in/ignacio-quirelli-297227247/" target="_blank" rel="noopener noreferrer">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="linkedin" />
                    </a>
                    <a href="https://github.com/Blesial/" target="_blank" rel="noopener noreferrer">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="github" />
                    </a>
                    <a href="https://api.whatsapp.com/send?phone=5493424689163" target="_blank" rel="noopener noreferrer">
                        <img src="https://es.logodownload.org/wp-content/uploads/2018/10/whatsapp-logo-11.png" alt="whatsapp" />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer