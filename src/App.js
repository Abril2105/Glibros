import  React from "react";
import Show from "./components/Show";
import Edit from "./components/Edit";
import Create from "./components/Create";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Show />} />
          <Route path='/create' element={<Create/>}/>
          <Route path='/edit/:id' element={<Edit/>}/>
        </Routes>
      </Router>
    </div>
  );
}


