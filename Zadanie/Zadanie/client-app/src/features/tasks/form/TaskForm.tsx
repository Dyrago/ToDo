import React, { ChangeEvent, FormEvent, TextareaHTMLAttributes, useEffect, useState } from 'react'
import { Task } from '../../../app/models/task'
import axios from 'axios'

interface Props{
    editMode : boolean
    createMode : boolean
    closeForm : () => void
    taskToEdit: Task | undefined
    filterDate: string
    filterTasks: () => void
    setCreateMode: (value: React.SetStateAction<boolean>) => void
    setEditMode: (value: React.SetStateAction<boolean>) => void
}

export default function TaskForm({editMode , createMode, closeForm, taskToEdit, filterDate, filterTasks, setCreateMode, setEditMode}: Props){
    
    const initialData = {
        id: '',
        title: '',
        description: '',
        dateToDo: filterDate,
        taskStatus: false
    }
    
    const [task, setTask] = useState(() => taskToEdit);
    const [taskToCreate, setTaskToCreate] = useState(() => initialData);
    const [formDateEdit, setFormDateEdit] = useState<string>(() => filterDate)
    const [checked, setChecked] = useState<boolean>(() => false)

    useEffect(() => setTask(taskToEdit), [taskToEdit])

    function handleOnChangeEdit(event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
    {
        let name = event?.target.name;
        let value = event.target.value;

        setTask((prev : any) => {
            return {...prev, [name]: value}
        })
    }

    function handleOnChangeCreate(event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
    {
        let name = event?.target.name;
        let value = event.target.value;

        setTaskToCreate((prev : any) => {
            return {...prev,  [name]: value}
        })
    }

    function handleChekboxChangeEdit(event : ChangeEvent<HTMLInputElement>){
        event.persist();

        setTask((prev : any) => {
            return {...prev, taskStatus: event.target.checked}
        })

        console.log("Edit: " + task?.taskStatus)
    }

    function handleChekboxChangeCreate(event : ChangeEvent<HTMLInputElement>){
        setChecked(event.target.checked)
        setTaskToCreate((prev : any) => {
            return {...prev, taskStatus: event.target.checked}
        })

        console.log("create: " + taskToCreate.taskStatus + "|" + event.target.checked)
    }

    function handleDateChangeEdit(event : ChangeEvent<HTMLInputElement>){
        setFormDateEdit(prev => prev = event.target.value)

        setTask((prev : any) => {
            return {...prev, dateToDo: formDateEdit}
        })
    }

    async function handleEdit(event : FormEvent<HTMLFormElement>) {
        event.preventDefault()
        await axios.put<Task>(`http://localhost:5000/api/Tasks/${task?.id}`, task)
        .then(response => {
            setEditMode(false);
            filterTasks();
        })
    }
    
    async function handleCreate(event : FormEvent<HTMLFormElement>) {
        event.preventDefault()
        await axios.post<Task>('http://localhost:5000/api/Tasks', taskToCreate)
        .then(response => {
            setCreateMode(false);
            setTaskToCreate((prev : any) => {
                return {...prev, taskStatus: false}
            })
            setChecked(false)
            filterTasks();
        })
    }

    return (
        <div className='addFormBox'>
            {
                createMode && (
            <form className='addForm' method='POST' onSubmit={(event) => handleCreate(event)}>
                <h2>Add new task</h2>
                <input className='input' maxLength={120} type='text' placeholder='Title' name='title' onChange={(e) => handleOnChangeCreate(e)}/>
                <textarea className='contentBox' maxLength={1500} placeholder='Content' name='description' onChange={(e) => handleOnChangeCreate(e)}></textarea>
                <input id="datePicker" className='input' type='date' name='dateToDo' onChange={(e) => handleOnChangeCreate(e)} />
                <br />
                <div className='formBox'>
                    <label htmlFor="taskStatus">Done</label>
                    <input type='checkbox' name='taskStatus' checked={checked} onChange={(e) => handleChekboxChangeCreate(e)}/>
                    <br />
                    <br />
                    <input className="formCreateBtn" type='submit' value="Create" />
                    <button onClick={closeForm} className='deleteBtn'>Cancel</button>
                </div>
            </form>
                )
            }
            {
                editMode && (
                    <form className='addForm' method='PUT' onSubmit={handleEdit} autoComplete='off'>
                        <h2>Edit task</h2>
                        <input className='input' type='text' maxLength={120} placeholder='Title' value={task?.title} name='title' onChange={(e) => handleOnChangeEdit(e)}/>
                        <textarea className='contentBox' placeholder='Content' maxLength={1500} value={task?.description} name='description' onChange={(e) => handleOnChangeEdit(e)}></textarea>
                        <input className='input' type='date' value={task?.dateToDo} name='dateToDo' onChange={(e) => handleDateChangeEdit(e)}/>
                        <br />
                        <div className='formBox'>
                            <label htmlFor="taskStatus">Finished</label>
                            <input type='checkbox' checked={task?.taskStatus} name='taskStatus' onChange={(e) => handleChekboxChangeEdit(e)}/>
                            <br />
                            <br />
                            <input className="formCreateBtn" type='submit' value="Edit" />
                            <button onClick={closeForm} className='deleteBtn'>Cancel</button>
                        </div>
                    </form>
                        )
            }
        </div>
    )
}