import React, { useState, createContext } from "react";

// Create context to store projects and tasks
const TimeTrackerContext = createContext();

function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  function handleProjectSubmit(e) {
    e.preventDefault();
    const name = e.target.elements.name.value;
    setProjects((prevProjects) => [...prevProjects, { id: Date.now(), name }]);
    e.target.reset();
  }

  function handleTaskSubmit(e) {
    e.preventDefault();
    const project = selectedProject;
    const name = e.target.elements.name.value;
    const time = e.target.elements.time.value;
    const description = e.target.elements.description.value;
    const date = new Date().toLocaleDateString();
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now(), project, name, time, description, date },
    ]);
    e.target.reset();
  }

  function handleProjectSelect(id) {
    setSelectedProject(id);
  }

  // Calculate total hours covered for the current day
  const today = new Date().toLocaleDateString();
  const totalHoursToday = tasks
    .filter((task) => task.project === selectedProject && task.date === today)
    .reduce((total, task) => total + parseFloat(task.time), 0);

  return (
    <TimeTrackerContext.Provider value={{ projects, tasks }}>
      <div>
        <h1>Time Tracking App React sljdhkj</h1>
        <form onSubmit={handleProjectSubmit}>
          <input type="text" name="name" placeholder="Enter project name" />
          <button type="submit">Create Project</button>
        </form>
        <ul className="Projects">
          {projects.map((project) => (
            <li
              className="Project-List"
              key={project.id}
              onClick={() => handleProjectSelect(project.id)}
            >
              {project.name}
            </li>
          ))}
        </ul>
        {selectedProject && (
          <div>
            <h2>
              Selected Project:{" "}
              {projects.find((project) => project.id === selectedProject).name}
            </h2>
            <form onSubmit={handleTaskSubmit}>
              <input type="text" name="name" placeholder="Enter task name" />
              <input type="number" name="time" placeholder="Enter time spent" />
              <input
                type="text"
                name="description"
                placeholder="Enter task description"
              />
              <button type="submit">Create Task</button>
            </form>
            <h3>Total Hours Today: {totalHoursToday}</h3>
            <ul>
              {tasks
                .filter(
                  (task) =>
                    task.project === selectedProject && task.date === today
                )
                .map((task) => (
                  <li key={task.id}>
                    <p>{`Task Name: ${task.name}`}</p>
                    <p>{`Task Time: ${task.time} hours`}</p>
                    <p>{`Task Description: ${task.description}`}</p>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </TimeTrackerContext.Provider>
  );
}

export default App;
