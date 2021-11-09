import { useParams, useHistory } from 'react-router-dom';
import {useState, useEffect} from "react";
import axios from "axios";
import "./index.css";

export default function Editar(props) {
  const params = useParams();
  const history = useHistory();

  const [idNote, setId] = useState(0);
  const [titleNote, setTitle] = useState("");
  const [contentNote, setContent] = useState("");

  const titleChanged = (event) =>{
      setTitle(event.target.value);
  }

  const contentChanged = (event) =>{
      setContent(event.target.value);
  }

  const UpdateNote = (event) => {
      event.preventDefault();
      axios
          .post(`http://localhost:8000/api/notes/${params.note_id}/`, {id:idNote, title:titleNote, content:contentNote})
          .then((response) => {
              //recarrega as notas
              props.reloadData();

              //volta para a página principal
              history.push("/");
          });
  }

  const loadNoteData = () => {
    // Carrega informações de uma nota
    axios
      .get(`http://localhost:8000/api/notes/${params.note_id}/`)
      .then((res) =>{
        let note = res.data;
        setId(note.id);
        setTitle(note.title);
        setContent(note.content);
      });
  }

  useEffect(() => {
    loadNoteData();
  }, []);

  return (
      <form className="form-card" onSubmit={UpdateNote}>
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
          <button className="btn" type="submit">Atualizar</button>
      </form>
  );
}
