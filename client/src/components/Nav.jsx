import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./Nav.module.css";
import SearchBar from "./searchBar";
import logo from '../assets/06.jpg'
import DarkMode from './DarkMode';

function Nav({setCurrentPage}) {

    return (
        <div className={styles.nav_container}>
            <nav className={styles.nav}>
                <div className={styles.navbar}>
                    <div className={styles.logo_container}>
                        <Link to={'/'}>
                            <img src={logo} alt="logo" className={styles.logo} />
                        </Link>
                    </div>
                    <div>
                    <SearchBar setCurrentPage={setCurrentPage}/>
                </div>
                    <div>
                        <Link to={'/add'}>
                            <button className={styles.create_button}>Create Dog</button>
                        </Link>
                    </div>
                    <div>
                        <Link to={'/favorites'}>
                            <button className={styles.fav}>Favs</button>
                        </Link>
                    </div>
                    <div className={styles.search}>
                        <DarkMode/>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Nav