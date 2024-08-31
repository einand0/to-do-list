import { useEffect, useRef, useState } from "react";
import api from "../../services/api";
import "./style.css";
import { FaTrash } from "react-icons/fa";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";

function App() {
  const [tasks, setTasks] = useState([]);
  const inputTitle = useRef();
  const inputDescription = useRef();
  const formRef = useRef();

  async function doneTask(id) {
    const taskWrapper = await api.get(`/tasks/?id=${id}`);
    console.log(taskWrapper.data[0].title);

    await api.put(`/tasks/${id}`, {
      title: taskWrapper.data[0].title,
      description: taskWrapper.data[0].description,
      done: !taskWrapper.data[0].done,
    });

    getTasks();
  }

  async function getTasks() {
    const tasksFromApi = await api.get("/tasks");
    setTasks(tasksFromApi.data);
    console.log(tasksFromApi.data);
  }

  async function createTask() {
    await api.post("/tasks", {
      title: inputTitle.current.value,
      description: inputDescription.current.value,
    });

    formRef.current.reset();

    getTasks();
  }

  async function deleteTask(id) {
    await api.delete(`/tasks/${id}`);
    getTasks();
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="container">
      <form ref={formRef}>
        <h1>to-do-list</h1>
        <input placeholder="Tarefa" name="task" ref={inputTitle} />
        <input
          placeholder="Descrição da tarefa"
          name="description"
          ref={inputDescription}
        />
        <button type="button" onClick={createTask}>
          Enviar
        </button>
      </form>

      {tasks.map((task) => (
        <div className="task" key={task.id}>
          {task.done == true ? (
            <div>
              <h2 className="done">{task.title}</h2>
              <p className="done">{task.description}</p>
            </div>
          ) : (
            <div>
              <h2>{task.title}</h2>
              <p>{task.description}</p>
            </div>
          )}
          <div className="done-button-wrapper">
            <button onClick={() => doneTask(task.id)}>
              {task.done == true ? (
                <FaToggleOn size={20} />
              ) : (
                <FaToggleOff size={20} />
              )}
            </button>
            <button onClick={() => deleteTask(task.id)}>
              <FaTrash size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
