import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CookieList from "./components/CookieList";
import CookieForm from "./components/CookieForm";
import CookieDetail from "./components/CookieDetail";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        
        <header className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
          <div className="container">
            <Link className="navbar-brand d-flex align-items-center my-2" to="/">
              <img src="/imgs/logo.png" height="60" alt="Yup Logo"/>
            </Link>
            <nav>
              <Link to="/" className="btn btn-sm btn-outline-dark me-2">Início</Link>
              <Link to="/add" className="btn btn-sm btn-dark">Administrar</Link>
            </nav>
          </div>
        </header>

        <main className="container flex-grow-1 py-4">
          <Routes>
            <Route path="/" element={<CookieList />} />
            <Route path="/add" element={<CookieForm />} />
            <Route path="/edit/:id" element={<CookieForm />} />
            <Route path="/detail/:id" element={<CookieDetail />} />
          </Routes>
        </main>

        <footer id="footer" className="text-center">
          <p id="copyright" className="m-0">Victor Ryuki Tamezava</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;