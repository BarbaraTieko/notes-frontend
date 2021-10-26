import { useEffect, useState } from "react";
import axios from "axios";
import Note from "./components/Note";
import Formulario from "./components/Formulario";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]); // Remova o array de notes que existia na versão anterior

  const loadData = () => {
    axios
      .get("http://localhost:8000/api/notes/")
      .then((res) => setNotes(res.data));
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="App">
      <div className="appbar">
        <img src="/logo-getit.png" className="logo" />
        <span className="subtitle">Como o Post-it, mas com outro verbo</span>
      </div>
      <main className="container">
        <Formulario onSubmitFormulario={loadData}/>
        <div className="card-container">
          {notes.map((note) => (
            <Note key={`note__${note.id}`} title={note.title}>
              {note.content}
            </Note>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;