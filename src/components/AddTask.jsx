import { React, useState } from "react";

export default function AddTask({ taskLists, setTaskLists }) {
  const [addModal, setaddModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  /* action */

  function handleInput(e) {
    const { name, value } = e.target;
    if (name === "projectName") {
      setProjectName(value);
      setErrorMessage("");
    }
    if (name === "projectName" && value === "") {
      setErrorMessage("Enter Project name to continue!");
    }
    if (name === "taskDescription") setTaskDescription(value);
  }

  function handleAdd(e) {
    e.preventDefault();
    if (!projectName) {
      setErrorMessage("Enter Project name to continue!");
    } else {
      let timestamp = new Date().getTime();
      let temList = taskLists;
      temList.push({
        projectName,
        taskDescription,
        timestamp: timestamp,
        duration: 0,
      });

      localStorage.setItem("taskList", JSON.stringify(temList));
      window.location.reload();
      /*     setTaskLists([
        ...taskLists,
        { projectName, taskDescription, timestamp: timestamp },
      ]); */
      setaddModal(false);
      setProjectName("");
      setTaskDescription("");
    }
  }
  return (
    <>
      <button
        className="bg-blue-500 text-white uppercase text-sm font-semibold py-1 mx-1.5 pr-2.5 rounded hover:opacity-70 "
        type="button"
        onClick={() => {
          setaddModal(true);
        }}
      >
        +New
      </button>
      {addModal ? (
        <>
          <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100">
            <div className="w-9/12 max-w-lg bg-white rounded-lg shadow-md relative flex flex-col">
              <div className="flex flex-row justify-between p-5 border-b border-slate-200">
                <h3 className="bg-white text-2xl font-semibold">
                  {" "}
                  Add New Task
                </h3>
                <button
                  className="px-1 text-gray-400 float-right text-3xl leading-none font-semibold block"
                  onClick={() => {
                    setaddModal(false);
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
                  <p className="mb-5 text-red-500">{errorMessage}</p>
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
                  onClick={handleAdd}
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
