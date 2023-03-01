import React from 'react'
import { useState, useEffect } from 'react'
import styles from './Scroll.module.css';
import scroll from '../assets/Scroll.png'

function Scroll() {
    const [showScroll, setShowScroll] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            const isTop = window.scrollY < 220;
            if (isTop !== true) {
                setShowScroll(true);
            } else {
                setShowScroll(false);
            }
        } );
    }, [showScroll]);

    const scrollTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
    return (
        <div >
            {
                showScroll && (
                    <div className={styles.scroll_top} onClick={scrollTop}>
                        <img src={scroll} alt="scroll to top" />
                    </div>
                )
            }
        </div>
    )
}

export default Scroll