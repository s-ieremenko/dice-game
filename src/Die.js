import React from 'react';

const Die = (props) => {
    const styles = {
        background: props.isHeld && '#59E391'
    }
    return (
        <div className='die-face' style={styles} onClick={props.holdDice}>
            <h2 className='die-num'>{props.value}</h2>
        </div>
    );
};

export default Die;