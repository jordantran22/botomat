import React from 'react'
import { useEffect, useState } from 'react';
// import TaskComponent from './TaskComponent';
import CountDownTimer from './CountDownTimer';
import Task from './Task';
// import { tasks } from './data/robotData';

const RobotComponent = ({robot, randomTasks}) => {

    const [robotTasks, setRobotTasks] = useState([]);
    const [startTasks, setStartTasks] = useState(false);
  
    const setTaskIds = (randomTasks) => {
        for(var i = 0; i < randomTasks.length; i++) {
            randomTasks[i].id = Math.floor(Math.random() * 10000) + 1;
            randomTasks[i].finished = false;
        }
        randomTasks.sort((a, b) => b.eta - a.eta);

        setRobotTasks(randomTasks);
        console.log(robotTasks);
      
    }

    useEffect(() => {
   
        setTaskIds(randomTasks);
        console.log("settingTaskIds");
      
        
      }, [])

      const onClick = () => {
        setStartTasks(!startTasks);
      }

      const deleteTask = (id) => {
        setRobotTasks(robotTasks.filter((task) => task.id !== id));
        console.log(robotTasks);
        return;
      }


    return (
        <div>
            <div>Robot Name: {robot.name}</div>
            <div>Robot Type: {robot.type}</div>
            <button onClick={onClick}>Start Tasks</button>
            {robotTasks.map((task) =>
               <div>
                
                {startTasks ? 
                <Task task = {task} hoursMinSecs={{hours: 0, minutes: 0, seconds: Math.floor(task.eta / 1000)}} deleteTask={() => deleteTask(task.id)} /> 
                : <div> 
                    <div>{task.description}</div>
                    <div>{Math.floor(task.eta / 1000)}</div>
                  </div>
                }
                </div>
            )}

            {
                robotTasks.length <= 0 ? <div>All task complete!</div> : <div></div>
            }
            
        </div>
    )
}

export default RobotComponent
