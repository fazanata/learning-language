import React from 'react';
import s from './ContentBlock.module.css';

const ContentBlock = ({title, text, chidren}) => {
    return (
        <div >
            <div >
                
                <h1 className={s.header}>{props.title }</h1>
                <p className={s.descr}>{props.data.text.map((item) => '\u00b7' +item)}</p>
                {children}
            </div>
        </div>
    )
}

export default ContentBlock;