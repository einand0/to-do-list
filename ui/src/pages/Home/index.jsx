import { useEffect, useRef, useState } from 'react';
import api from '../../services/api'
import './style.css'
import { FaTrash } from "react-icons/fa";

function App() {

  const [tasks, setTasks] = useState([])
  const inputTitle = useRef()
  const inputDescription = useRef()
  const formRef = useRef()

  async function getTasks(){
    const tasksFromApi = await api.get('/tasks')
    setTasks(tasksFromApi.data)
  }

  async function createTask(){
    await api.post('/tasks', {
      title: inputTitle.current.value,
      description: inputDescription.current.value
    })

    formRef.current.reset();

    getTasks()
  }

  async function deleteTask(id){
    await api.delete(`/tasks/${id}`)
    getTasks()
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <div className="container">
      <form ref={formRef}>
        <h1>to-do-list</h1>
        <input placeholder="Tarefa" name="task" ref={inputTitle}/>
        <input placeholder="Descrição da tarefa" name="description" ref={inputDescription} />
        <button type="button" onClick={createTask}>Enviar</button>
      </form>

      {tasks.map((task) => (
        <div className="task" key={task.id}>
          <div>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
          </div>
          <button onClick={() => deleteTask(task.id)}><FaTrash size={20} /></button>
        </div>
      ))}
    </div>
  )
}

export default App
