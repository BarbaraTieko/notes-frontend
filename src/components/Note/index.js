import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import "./index.css";

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default function Note(props) {
  const [rotation, setRotation] = useState(0);
  const [color, setcolor] = useState(0);

  useEffect(() => {
    setRotation(randomInt(-5, 5));
    setcolor(randomInt(1, 5));
  }, []);

  const style = { transform: `rotate(${rotation}deg)` };

  const deleteNote = () => {
    //deleta nota
    //para isso funcionar você deve implementar a ação de deletar no Django REST
    //Note que o comando abaixo envia uma requisição com o verbo DELETE
    axios
      .delete(`http://localhost:8000/api/notes/${props.id}`)
      .then((res) => props.reloadData());
  };

  return (
    <div className={`card card-color-${color}`} style={style}>
      <div className="card-action">
        <h3 className="card-title">{props.title}</h3>
        <div className="icons">
          <Link to={`edit/${props.id}`} className="btn-icon btn-edit"><i className="fas fa-edit"></i></Link>
          <span className="btn-icon btn-edit" onClick={deleteNote}><i className="fas fa-trash-alt"></i></span>
        </div>
      </div>
      <div className="card-content">
        <p>
          {props.children}
        </p>
      </div>
    </div>
  );
}
