import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Register() {
  return <h1>Регистрация администратора</h1>;
}

function Login() {
  return <h1>Вход</h1>;
}

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/register">Регистрация</Link> |{" "}
        <Link to="/login">Вход</Link>
      </nav>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<h1>Админка</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
