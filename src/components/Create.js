import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../fireBase/config";

const Create = () => {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [genero, setGenero] = useState("");
  const [año, setAño] = useState("");
  const navigate = useNavigate();

  const query = collection(db, "libro");

  const crear = async (e) => {
    e.preventDefault();
    await addDoc(query, {
      titulo: titulo,
      autor: autor,
      genero: genero,
      año: año,
    });
    navigate("/home");
  };
  return (
    <div className="container" id="color2">
      <div className="row">
        <div className="col">
          <h1>Crear Libro</h1>

          <form onSubmit={crear}>
            <div className="mb-3">
              <label className="form-label">Titulo</label>
              <input
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Autor</label>
              <input
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Genero</label>
              <input
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Año</label>
              <input
                value={año}
                onChange={(e) => setAño(e.target.value)}
                type="number"
                className="form-control"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Crear
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
