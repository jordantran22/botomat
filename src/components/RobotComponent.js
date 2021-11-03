import React from 'react'
import { useEffect, useState } from 'react';
import Task from './Task';

const RobotComponent = ({robot, randomTasks, deleteRobot}) => {

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

      const deleteThisRobot = () => {
         return deleteRobot();
      }

    return (
        <div>
            <div className="submitButton delete" onClick={deleteThisRobot}>X</div>
            <div className="robotNameAndType">
                <div>Robot Name: {robot.name}</div>
                <div>Robot Type: {robot.type}</div>
            </div>
            <button className="submitButton" onClick={onClick}>Start Tasks</button>
            <div className="tasksEtaColumn">
              <div>Tasks</div>
              <div>ETA</div>
            </div>
          
            {robotTasks.map((task) =>
               <div>
                
                {startTasks ? 
                <Task task = {task} hoursMinSecs={{hours: 0, minutes: 0, seconds: Math.floor(task.eta / 1000)}} deleteTask={() => deleteTask(task.id)} /> 
                : <div className="taskNameAndETA"> 
                    <div>{task.description}</div>
                    <div>{Math.floor(task.eta / 1000)} seconds</div>
                  </div>
                }
                </div>
            )}

            {
                robotTasks.length <= 0 ?
                 <div className="taskCompleted">
                   <div>
                      All task complete!
                   </div>

                   <img className="checkMarkPng" src="checkMark.png" alt="checked" />
                 </div> : <div></div>
            }
            
        </div>
    )
}

export default RobotComponent
