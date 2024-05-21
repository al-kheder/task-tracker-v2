import AddTask from "./components/AddTask";
import { React, useState, useEffect } from "react";
import ToDo from "./components/ToDo";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { useDrop } from "react-dnd";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [completed, setCompleted] = useState([]);
  useEffect(() => {
    let array = localStorage.getItem("taskList");
    if (array) {
      setTaskList(JSON.parse(array));
    }
  }, []);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "todo",
    drop: (item) =>
      addToCompleted(
        item.id,
        item.projectName,
        item.taskDescription,
        item.timestamp,
        item.timestamp,
        item.duration
      ),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addToCompleted = (
    id,
    projectName,
    taskDescription,
    timestamp,
    duration
  ) => {
    const moveTask = taskList.filter((task) => id === task.id);
    setCompleted((completed) => [
      ...completed,
      { moveTask, projectName, taskDescription, timestamp, duration },
    ]);
  };
  return (
    <>
      <h1 className="text-2xl font-bold py-4 pl-6 ">The Task-Tracker</h1>
      <p className="text-xl pl-6">Hi there!</p>

      <div className="flex flex-row items-center">
        <p className="text-xl pl-6">Click </p>
        <AddTask taskLists={taskList} setTaskLists={setTaskList} />
        <p className="text-xl my-2 ">to add a new task</p>
      </div>
      <div className="flex flex-row">
        <div className="w-full">
          <h2 className="ml-4 text-xl font-semibold w-3/5 max-w-lg py-1 px-2 my-2 bg-gray-200">
            TO DO:
          </h2>
          {taskList.map((task, i) => (
            <ToDo
              key={i}
              task={task}
              index={i}
              taskList={taskList}
              setTaskList={setTaskList}
            />
          ))}
        </div>
        <div className="w-full" ref={drop}>
          <h2 className="ml-4 text-xl font-semibold w-3/5 max-w-lg py-1 px-2 my-2 bg-gray-200">
            Completed:
          </h2>
          {completed.map((task, i) => (
            <ToDo
              key={i}
              task={task}
              index={i}
              taskList={taskList}
              setTaskList={setTaskList}
            />
          ))}
          <div></div>
        </div>
      </div>
    </>
  );
}

export default App;
