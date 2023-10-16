import React, { useEffect } from 'react'
import { Task } from '../../../app/models/task'
import axios from 'axios';

interface Props
{
    tasks: Task[]
    formOpen: (id: number) => void
    filterTasks: () => void
}

export default function TaskList({tasks, formOpen, filterTasks} : Props)
{
    async function handleDelete(id: number){
        await axios.delete(`http://localhost:5000/api/Tasks/${id}`)
        .then(response => {
            filterTasks();
        })
      }
    

    if(tasks.length > 0)
    return (
        <div className='taskList'>
            {tasks.map((task) => (
            <div className='taskTile' key={task.id}>
                <h3>{task.title}</h3>
                <p>{task.dateToDo.toString()}</p>
                <div className='tileDsc'>
                    <p>{task.description}</p>
                </div>
                {task.taskStatus ? (<p>Done</p>) : (<p>TODO</p>)}
                
                <button onClick={() => handleDelete(task.id)}className='deleteBtn'>Delete</button>
                <button onClick={() => {formOpen(task.id)}} className='editBtn'>Edit</button>
            </div>) 
        )}
        </div>
    )
    else
        return (
        <div className='info'>
            <h3 className='tile'>No tasks to display for this day</h3>
        </div>
        )
}