import style from './Box.module.css';
import React from 'react';



function Box(props) {

    return (
        <div className={style.box} style={{ width: props.width, paddingBottom: props.padding }}>
            {props.children}
        </div>

    );
}

export default Box;