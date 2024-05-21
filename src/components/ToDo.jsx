import React from "react";
import EditTask from "./EditTask";
import { useState, useEffect } from "react";
import { useDrag } from "react-dnd";
export default function ToDo({ task, index, taskList, setTaskList }) {
  const [time, setTime] = useState(task.duration);
  const [running, setRunning] = useState(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "todo",
    item: {
      id: index,
      projectName: task.projectName,
      taskDescription: task.taskDescription,
      timestamp: task.timestamp,
      duration: task.duration,
    },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));

  const handleStop = () => {
    setRunning(false);
    let taskIndex = taskList.indexOf(task);
    taskList.splice(taskIndex, 1, {
      projectName: task.projectName,
      taskDescription: task.taskDescription,
      timestamp: task.timestamp,
      duration: time,
    });
    localStorage.setItem("taskList", JSON.stringify(taskList));
    window.location.reload();
  };
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);
  function handleDelete(index) {
    const newTask = taskList.filter((t, i) => {
      return i !== index;
    });
    localStorage.setItem("taskList", JSON.stringify(taskList));

    setTaskList(newTask);
  }
  return (
    <>
      <div
        className=" w-64 p-2 m-4  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        ref={drag}
      >
        <h5 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
          {task.projectName}
        </h5>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {task.taskDescription}
        </p>
        <div className="flex justify-center">
          <div>
            <span>{("0" + Math.floor((time / 360000) % 24)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 6000) % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
            <span className="text-sm">
              {("0" + ((time / 10) % 100)).slice(-2)}
            </span>
          </div>
          <div>
            {running ? (
              <button
                className="border rounded-lg py-1 m-1  px-3 text-xs bg-red-300"
                onClick={handleStop}
              >
                Stop
              </button>
            ) : (
              <button
                className="border rounded-lg py-1 m-1 px-3 text-xs bg-green-300"
                onClick={() => {
                  setRunning(true);
                }}
              >
                Start
              </button>
            )}
            <button
              className="border rounded-lg py-1 m-1 px-3 text-xs"
              onClick={() => {
                setTime(0);
              }}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <EditTask
            task={task}
            index={index}
            taskList={taskList}
            setTaskList={setTaskList}
          />
          <button
            type="button"
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br  font-medium rounded-lg text-xs px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => {
              handleDelete(index);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
