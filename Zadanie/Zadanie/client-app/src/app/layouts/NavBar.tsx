import React from "react";

interface Props {
    openForm: () => void
}

export default function NavBar({openForm} : Props) {

    return (
        <header className="headerRow ">
            <h1>ToDoApp</h1>
            <nav className="navHeader">
                <button onClick={openForm} className="createBtn">Create</button>
            </nav>
        </header>
    )
}