import { useEffect, useState } from 'react'
import './index.css'
import axios from 'axios';
import { Task } from '../models/task';
import NavBar from './NavBar';
import Dashboard from '../../features/tasks/dashboard/Dashboard';

function App() {

  const[tasks, setTasks] = useState<Task[]>(() => []);
  const[editMode, setEditMode] = useState(() => false);
  const[createMode, setCreateMode] = useState(() => false);
  const[taskToEdit, setTaskToEdit] = useState<Task | undefined>(() => undefined)
  const[filterDate, setFilterDate] = useState<string>(() => "")

  useEffect(() => {
    axios.get('http://localhost:5000/api/Date')
    .then(response => {
      setFilterDate(prev => prev = response.data)
    })
  }, [])

  useEffect(() => {
    Notification.requestPermission().then(perm => {
      if(perm === 'granted' && tasks.length > 0){
        new Notification("Tasks TODO for today",
        {body: tasks.filter(task => task.taskStatus === false).length.toString() + " task(s) TODO for today!"})
      }
      }
    )
  },[])
  
  function handleCreateFormOpen(){
    setCreateMode(prev => prev = true);
    setEditMode(prev => prev = false);
  }

function handleSetTaskToEdit(id: number){
    setTaskToEdit(prev => prev = tasks.find(task => task.id === id));
  }

function handleDateChange(date : string){
  setFilterDate(prev => prev = date)
}

function handleEditFormOpen(id: number){
    handleSetTaskToEdit(id);
    setEditMode(prev => prev = true);
    setCreateMode(prev => prev = false);
  }
  
  function handleFormClose() {
    if (editMode === true)
      setEditMode(prev => prev = false);
    if (createMode === true)
      setCreateMode(prev => prev = false);
  }

async function filterTasks(){
  await axios.get<Task[]>('http://localhost:5000/api/Tasks', {params: {date: filterDate}})
  .then(response => {
    if (response.data.length > 0){
      response.data.forEach(task => task.dateToDo = task.dateToDo.split('T')[0]);
      setTasks(prev => prev = response.data);
    }
    else
      setTasks(prev => prev = []);
  }
  )
}

  return (
    <div className='container'>
      <NavBar openForm={handleCreateFormOpen} />
      <Dashboard 
        tasks={tasks}
        formOpen={handleEditFormOpen}
        editMode = {editMode}
        createMode = {createMode}
        closeForm={handleFormClose}
        taskToEdit={taskToEdit}
        filterDate={filterDate}
        setFilterDate={handleDateChange}
        filterTasks={filterTasks}
        setCreateMode={setCreateMode}
        setEditMode={setEditMode}
      />
    </div>
  )
}

export default App
