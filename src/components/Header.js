import React from 'react'
import {useState, useEffect} from 'react';
import RobotComponent from './RobotComponent';

const Header = () => {
      const robotTypes= { 
        UNIPEDAL: 'Unipedal',
        BIPEDAL: 'Bipedal',
        QUADRUPEDAL: 'Quadrupedal',
        ARACHNID: 'Arachnid',
        RADIAL: 'Radial',
        AERONAUTICAL: 'Aeronautical'
      };

      const tasks = [
        {
          description: 'do the dishes',
          eta: 1000,
        },{
          description: 'sweep the house',
          eta: 3000,
        },{
          description: 'do the laundry',
          eta: 10000,
        },{
          description: 'take out the recycling',
          eta: 4000,
        },{
          description: 'make a sammich',
          eta: 7000,
        },{
          description: 'mow the lawn',
          eta: 20000,
        },{
          description: 'rake the leaves',
          eta: 18000,
        },{
          description: 'give the dog a bath',
          eta: 14500,
        },{
          description: 'bake some cookies',
          eta: 8000,
        },{
          description: 'wash the car',
          eta: 20000,
        },
      ];

    
      const [robotName, setRobotName] = useState("");
      const [robotType, setRobotType] = useState("");
      const [robots, setRobots] = useState([]);
      const [randomTasks, setRandomTasks] = useState([]);

      const getRobotTasks = () => {
        setRandomTasks(getRandom(tasks, 5));
    }

    function getRandom(arr, n) {
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }
      
      const onSubmit = (e) => {
        e.preventDefault()
        getRobotTasks();

        const newRobotCreated = {
            id:  Math.floor(Math.random() * 10000) + 1,
            name: robotName,
            type: robotType
        }
        addRobot(newRobotCreated);
    }

    const addRobot = (newRobot) => {
        setRobots([...robots, newRobot]);
        console.log(robots);
    }
      
    return (
        <div>

            <div className="logoTitle">
              <h1>Bot-o-mat!</h1>
              <img className="logo" src="robot.gif" alt="robot" />
            </div>

            <form className="robotForm" onSubmit={onSubmit}>
                <div className="enterNameLabel">Enter Robot Name: </div>
                <input className="robotNameInput" type="text" value={robotName} onChange={((e) => setRobotName(e.target.value))}/>

                <div className="enterNameLabel">Select Robot Type: </div>
                <select className="robotSelect" value={robotType} onChange={((e) => setRobotType(e.target.value))}>
                <option value="" selected disabled hidden>Choose here</option>
                    {Object.entries(robotTypes).map(([key, value]) => {
                        return (
                        <option className="robotOption" value={key}>
                            {value}
                        </option>
                        );
                    })}
                </select>
                
                <input type="submit" value="Create"className="submitButton"></input>
            </form>
                

            {robots.map((robot) =>
              <div className="robotComponent">
               <RobotComponent robot={robot} randomTasks={randomTasks} /> 
               </div>
               )
            }


        </div>
    )
}

export default Header
