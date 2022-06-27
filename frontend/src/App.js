import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import ResourcePage from "./components/resource/ResourcePage";
import AddResource from "./components/AddResource";
import About from './components/About'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Header />} exact />
        <Route path="/:id" element={<ResourcePage />} exact />
        <Route path="/add" element={<AddResource />} exact />
        <Route path="/about" element={<About />} exact />
      </Routes>
    </>
  );
}

export default App;
