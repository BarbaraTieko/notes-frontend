import Note from "../../components/Note";
import Formulario from "../../components/Formulario";
import "./index.css";

export default function PaginaPrincipal(props) {
  return (
    <main className="container">
      <Formulario onSubmitFormulario={props.loadData}/>
      <div className="card-container">
        {props.notesList.map((note) => (
          <Note
            key={`note__${note.id}`}
            title={note.title}
            id={note.id}
            reloadData={props.loadData}
            >
            {note.content}
          </Note>
        ))}
      </div>
    </main>
  );
}
