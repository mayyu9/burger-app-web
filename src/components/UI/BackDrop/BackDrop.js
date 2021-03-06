import React from 'react';
import classes from './BackDrop.css';

const BackDrop = (props) => (
    props.show ? <div className={classes.Backdrop} onClick={props.close}></div>:null
);

export default BackDrop;
