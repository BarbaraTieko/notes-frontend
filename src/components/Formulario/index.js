import {useState} from "react";
import axios from "axios";

import "./index.css";
export default function Formulario(props){
    const [titleNote, setTitle] = useState("");
    const [contentNote, setContent] = useState("");
    

    const titleChanged = (event) =>{
        setTitle(event.target.value);
    }

    const contentChanged = (event) =>{
        setContent(event.target.value);
    }

    const CreateNote = (event) => {
        event.preventDefault();
        axios
            .post("http://localhost:8000/api/notes/", {title:titleNote, content:contentNote})
            .then((response) => {
                setTitle("");
                setContent("");
                props.onSubmitFormulario();
            });
    }

    return (
        <form className="form-card" onSubmit={CreateNote}>
            <input
            className="form-card-title"
            type="text"
            name="titulo"
            placeholder="Título"
            value={titleNote}
            onChange={titleChanged}
            />
            <textarea
            className="autoresize"
            name="detalhes"
            placeholder="Digite o conteúdo..."
            onChange={contentChanged}
            value={contentNote}
            ></textarea>
            <button className="btn" type="submit">Criar</button>
        </form>
    );
}