import React, { ChangeEvent, useEffect, useState } from 'react'

interface Props {
    filterDate : string
    setFilterDate : (date:string) => void
    filterTasks : () => void
}

export default  function DateForm({filterDate, setFilterDate, filterTasks} : Props){

    function handleDate(e : ChangeEvent<HTMLInputElement>){
        setFilterDate(e.target.value)
    }
    
    useEffect(() => { filterTasks()}, [filterDate])

    return(
        <div className='dateForm'>
            <div id="dateFilter" className='datePicker'>
                <h2>Choose date</h2>
                <input className='input' type='date' value={filterDate} onChange={(event) => handleDate(event)}/>
            </div>
        </div>
    )
}