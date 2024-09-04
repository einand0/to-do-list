import { useEffect, useState } from "react";
import api from "../../services/api";
import "./style.css";
import { FaTrash, FaSearch } from "react-icons/fa";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { useForm } from "react-hook-form";

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [inputTitle, setInputTitle] = useState();
  const [inputDescription, setInputDescription] = useState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function onSubmit() {
    createTask();
  }

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
  }

  async function createTask() {
    await api.post("/tasks", {
      title: inputTitle,
      description: inputDescription,
    });

    reset();
    getTasks();
  }

  async function deleteTask(id) {
    await api.delete(`/tasks/${id}`);
    getTasks();
  }

  useEffect(() => {
    getTasks();
  }, []);

  console.log(errors.inputTitle);

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>to-do-list</h1>
        <div className="inputWrapper">
          <input
            placeholder="Tarefa"
            name="task"
            {...register("inputTitle", { required: true })}
            onChange={(e) => setInputTitle(e.target.value)}
          />
          {errors.inputTitle && (
            <span className="inputError">
              Você precisa inserir o título da tarefa.
            </span>
          )}
        </div>

        <div className="inputWrapper">
          <input
            placeholder="Descrição"
            name="description"
            {...register("inputDescription", { required: true })}
            onChange={(e) => setInputDescription(e.target.value)}
          />
          {errors.inputDescription && (
            <span className="inputError">
              Você precisa inserir a descrição da tarefa.
            </span>
          )}
        </div>

        <button type="submit">Enviar</button>
      </form>

      <div className="search-wrapper">
        <input
          value={searchTitle}
          placeholder="Procurar tarefa"
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <FaSearch color="#f87060" />
      </div>

      {tasks.length > 0 ? (
        tasks
          .filter((task) =>
            task.title.toLowerCase().includes(searchTitle.toLowerCase())
          )
          .map((task) => (
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
          ))
      ) : (
        <div className="no-tasks">Nenhuma tarefa cadastrada :(</div>
      )}
    </div>
  );
}

export default App;
