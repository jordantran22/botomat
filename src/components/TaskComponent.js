import React from 'react'

const TaskComponent = () => {

    const [robotTasks, setRobotTasks] = useState([]);
    const { hours = 0, minutes = 0, seconds = 60 } = hoursMinSecs;
    const [[hrs, mins, secs], setTime] = React.useState([hours, minutes, seconds]);
    const [showTimer, setShowTimer] = useState(true);
    
    const setTaskIds = (randomTasks) => {
        for(var i = 0; i < randomTasks.length; i++) {
            randomTasks[i].id = Math.floor(Math.random() * 10000) + 1;
            randomTasks[i].finished = false;
        }

        setRobotTasks(randomTasks);
        console.log(robotTasks);
    }

    useEffect(() => {
   
        setTaskIds(randomTasks);
      
        
      }, [])

      const deleteTask = (id) => {
        setRobotTasks(robotTasks.filter((task) => task.id !== id));
        console.log(robotTasks);
        return;
      }

    const tick = () => {
   
        if (hrs === 0 && mins === 0 && secs === 0) {
            // console.log(secs);
            setShowTimer(false);
            deleteTask()
            return onFinished();
        }
      
      
        else if (mins === 0 && secs === 0) {
            setTime([hrs - 1, 59, 59]);
        } else if (secs === 0) {
            setTime([hrs, mins - 1, 59]);
        } else {
            setTime([hrs, mins, secs - 1]);
        }
    };


    const reset = () => setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);

    
    React.useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });


    return (
        <div>
           <div>{task}</div>

           <div>
            {showTimer ? 
                <p>{`${hrs.toString().padStart(2, '0')}:${mins
                    .toString()
                    .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</p> 
                
                    :
                    <div></div>
            }
           
        </div>

        </div>
    )
}

export default TaskComponent
