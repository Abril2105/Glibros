import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../fireBase/config';

const Show = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [libros, setLibros] = useState([]);
  const [filteredLibros, setFilteredLibros] = useState([]);
  const librosCollection = collection(db, 'libro');

  const getLibros = async () => {
    const data = await getDocs(librosCollection);
    const librosData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setLibros(librosData);
    setFilteredLibros(librosData);
  };

  useEffect(() => {
    getLibros();
  }, []);

  const deleteLibro = async (id) => {
    const bookDoc = doc(db, 'libro', id);
    await deleteDoc(bookDoc);
    getLibros();
  };

  useEffect(() => {
    const filterLibros = () => {
      const filtered = libros.filter(
        (libro) =>
          libro.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          libro.autor.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLibros(filtered);
    };

    filterLibros();
  }, [searchTerm, libros]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div id="color2">
              <h2>Buscar Libros</h2>
              <input
                type="text"
                placeholder="Buscar por título o autor"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2">
              <Link to="/Create" className="btn btn-secondary mt-2 mb-2">
                Crear
              </Link>
            </div>

            <table className="table table-dark table-hover">
              <thead>
                <tr>
                  <th>Titulo</th>
                  <th>Autor</th>
                  <th>Genero</th>
                  <th>Año de lanzamiento</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filteredLibros.map((libro) => (
                  <tr key={libro.id}>
                    <td>{libro.titulo}</td>
                    <td>{libro.autor}</td>
                    <td>{libro.genero}</td>
                    <td>{libro.año}</td>
                    <td>
                      <Link to={`/Edit/${libro.id}`} className="btn btn-light">
                        {/* Asegúrate de tener correctamente configurada FontAwesome */}
                        <i className="fas fa-pencil-alt"></i>
                      </Link>
                      <button onClick={() => deleteLibro(libro.id)} className="btn btn-danger">
                        {/* Asegúrate de tener correctamente configurada FontAwesome */}
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Show;