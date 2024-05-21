import React from "react";
import { useState, useEffect } from "react";
export default function EditTask({ task, index, taskList, setTaskList }) {
  const [editModal, setEditModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  /* action */
  useEffect(() => {
    setProjectName(task.projectName);
    setTaskDescription(task.taskDescription);
  }, []);

  function handleInput(e) {
    const { name, value } = e.target;
    if (name === "projectName") setProjectName(value);
    if (name === "taskDescription") setTaskDescription(value);
  }
  function handleUpdate(e) {
    e.preventDefault();
    let taskIndex = taskList.indexOf(task);
    taskList.splice(taskIndex, 1, {
      projectName: projectName,
      taskDescription: taskDescription,
      timestamp: task.timestamp,
      duration: task.duration,
    });
    localStorage.setItem("taskList", JSON.stringify(taskList));
    window.location.reload();
    setEditModal(false);
  }

  return (
    <>
      <button
        onClick={() => {
          setEditModal(true);
        }}
        type="button"
        className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br  font-medium rounded-lg text-xs px-5 py-2.5 text-center me-2 mb-2"
      >
        Edit
      </button>
      {editModal ? (
        <>
          <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100">
            <div className="w-9/12 max-w-lg bg-white rounded-lg shadow-md relative flex flex-col">
              <div className="flex flex-row justify-between p-5 border-b border-slate-200">
                <h3 className="bg-white text-2xl font-semibold"> Edit Task</h3>
                <button
                  className="px-1 text-gray-400 float-right text-3xl leading-none font-semibold block"
                  onClick={() => {
                    setEditModal(false);
                  }}
                >
                  X
                </button>
              </div>
              <form action="" className="p-6">
                <div>
                  <label
                    className="track-wide uppercase text-gray-700 text-xs font-semibold mb-2 block"
                    htmlFor="project-name"
                  >
                    Project Name
                  </label>
                  <input
                    className="w-full
                bg-gray-200 text-gray-700 border border-gray-200 rounded px-3 py-3 mb-5
                leaing-tight focus:outline-none focus:bg-white"
                    type="text"
                    id="project-name"
                    placeholder="Project name"
                    required
                    name="projectName"
                    value={projectName}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label
                    className="track-wide uppercase text-gray-700 text-xs font-semibold mb-2 block"
                    htmlFor="project-name"
                  >
                    Task description
                  </label>
                  <textarea
                    className="w-full
                bg-gray-200 text-gray-700 border border-gray-200 rounded px-3 py-3 mb-5
                leaing-tight focus:outline-none focus:bg-white"
                    name="taskDescription"
                    value={taskDescription}
                    onChange={handleInput}
                    id="task-description"
                    cols="10"
                    rows="4"
                    placeholder="Task description"
                    required
                  ></textarea>
                </div>
              </form>
              <div className="flex justify-end p-6 border-t border-slate-300">
                <button
                  disabled={false}
                  className="bg-blue-500 text-white font-semibold uppercase text-sm rounded px-6 py-3 hover:opacity-70 "
                  onClick={handleUpdate}
                >
                  Update Task
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
