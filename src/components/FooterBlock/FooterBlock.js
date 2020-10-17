import React from 'react';
import s from './FooterBlock.module.css';

const FooterBlock = ({ text }) => {
    
    return (
        <div>
            <div className={s.header}>
                {text}
            </div>
        </div>
    )
}

export default FooterBlock;