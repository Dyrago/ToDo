import React, { ChangeEvent, FormEvent, useEffect } from 'react'
import { Task } from '../../../app/models/task'
import TaskForm from '../form/TaskForm'
import TaskList from '../list/TaskList'
import DateForm from '../form/DateForm'

interface Props {
    tasks : Task[]
    editMode : boolean
    createMode : boolean
    taskToEdit : Task | undefined
    formOpen: (id : number) => void
    closeForm: () => void
    filterDate : string
    setFilterDate: (date:string) => void
    filterTasks: () => void
    setCreateMode: (value: React.SetStateAction<boolean>) => void
    setEditMode: (value: React.SetStateAction<boolean>) => void
}

export default function Dashboard({tasks, taskToEdit, formOpen, closeForm, editMode, createMode,
     filterDate,setFilterDate, filterTasks, setEditMode, setCreateMode} : Props) {

    return (
        <div className='dashboard'>
            <TaskList
             tasks={tasks}
             formOpen={formOpen}
             filterTasks={filterTasks}
             />
            <TaskForm 
             taskToEdit={taskToEdit}
             closeForm={closeForm}
             editMode={editMode}
             createMode={createMode}
             filterDate={filterDate}
             filterTasks={filterTasks}
             setCreateMode={setCreateMode}
             setEditMode={setEditMode}
            />
            <DateForm
             filterDate={filterDate} 
             setFilterDate={setFilterDate}
             filterTasks={filterTasks}
            />
        </div>
    )
}