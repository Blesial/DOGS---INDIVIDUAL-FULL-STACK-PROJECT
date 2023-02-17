import React from "react";
import {Link} from 'react-router-dom';
import styles from './Landing.module.css';

export default function Landing () {
    console.log(styles)

    return (
                <body className={styles.body} >
                
            <h1 className={styles.title}>Welcome to my Dogs Page</h1>    
            <button className={styles.btn}> <Link style={{
                padding: '0 10px',
                textDecoration:'None',
                color: 'white',
            }} to='/home'>Enter App</Link> </button> 
        </body>
    )
}