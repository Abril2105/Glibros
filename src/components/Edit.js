import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../fireBase/config";

const Edit = () => {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [genero, setGenero] = useState("");
  const [año, setAño] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  const actualizar = async (e) => {
    e.preventDefault();
    const libros = doc(db, "libro", id);
    const data = {
      titulo: titulo,
      autor: autor,
      genero: genero,
      año: año,
    };
    await updateDoc(libros, data);
    navigate("/home");
  };

  const getLibroById = async (id) => {
    const libros = await getDoc(doc(db, "libro", id));
    if (libros.exists()) {
      setTitulo((await libros).data().titulo);
      setAutor((await libros).data().autor);
      setGenero((await libros).data().genero);
      setAño((await libros).data().año);
    } else {
      console.log("El libro no existe");
    }
  };

  useEffect(() => {
    getLibroById(id);
  }, []);
  return (
    <div className="container" id="color2">
      <div className="row">
        <div className="col">
          <h1>Actualizar Libro</h1>

          <form onSubmit={actualizar}>
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
              Actualizar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
