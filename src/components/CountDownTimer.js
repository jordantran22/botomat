import React from 'react'
import {useState} from 'react';

const CountDownTimer = ({hoursMinSecs, onFinished, taskId}) => {
   
    const { hours = 0, minutes = 0, seconds = 60 } = hoursMinSecs;
    const [[hrs, mins, secs], setTime] = React.useState([hours, minutes, seconds]);
    const [showTimer, setShowTimer] = useState(true);
    

    const tick = (taskId) => {
   
        if (secs === 0) {
            // console.log(secs);
            // setShowTimer(false);
            onFinished(taskId);
            return;
            // return null;
        }
         else {
            setTime([hrs, mins, secs - 1]);
        }
    };


    const reset = () => setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);

    
    React.useEffect(() => {
        console.log("timer set interval");
        const timerId = setInterval(() => tick(), 1000);
        // clearInterval(timerId);
        return () => clearInterval(timerId);
    });

    
    return (
        <div>
            {showTimer ? 
                <p>{`${hrs.toString().padStart(2, '0')}:${mins
                    .toString()
                    .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</p> 
                
                    :
                    <div></div>
            }
           
        </div>
    );
}

export default CountDownTimer;