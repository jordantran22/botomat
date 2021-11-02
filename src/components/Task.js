import React from 'react'
import { useEffect, useState } from 'react';

const Task = ({task, hoursMinSecs, deleteTask}) => {

    const { hours = 0, minutes = 0, seconds = 0 } = hoursMinSecs;
    const [[hrs, mins, secs], setTime] = React.useState([hours, minutes, seconds]);
    const [showTimer, setShowTimer] = useState(true);
    const [showTask, setShowTask] = useState(true);

    const tick = () => {

        if(secs === 0) {
            deleteTask();
        } else if (secs === 1) {
            onFinishedTask();
        }

        setTime([hrs,mins,secs - 1]);
    };

    React.useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });

    const onFinishedTask = () => {
        setShowTimer(false);
        setShowTask(false);
    }


    return (
        <div>
            <div className="taskNameEtaWithTimer"> 
        
                {showTask ? 
                            <div>
                                <div className="taskDescription">{task.description}</div>
                            </div>
                        : <div className="taskCompleted">
                            <div>Completed!</div>
                            <img className="checkMarkPng" src="checkMark.png" alt="completed" />
                            </div> }

                <div>
                {showTimer ? 
                    <div className="timerWithLoader">
                        <p>{`${hrs.toString().padStart(2, '0')}:${mins
                            .toString()
                            .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</p> 
                        <img className="loadingGif" src="loading.gif" alt="loading" />
                    </div>
                        :
                        <div></div>
                }
                </div>

            </div>

        </div>
    )
}

export default Task
