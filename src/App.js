import { BrowserRouter, Route } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import Appbar from "./components/Appbar";
import PaginaPrincipal from "./components/PaginaPrincipal";
import Editar from "./components/Editar";
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
      <Appbar />
      <div>
        <BrowserRouter>
          <Route path="/" exact>
            <PaginaPrincipal notesList={notes} loadData={loadData}/>
          </Route>
          <Route path="/edit/:note_id">
            <Editar
              reloadData={loadData}
            />
          </Route>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
