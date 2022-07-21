import Navbar from "./Navbar.js";
import Home from "./pages/Home.js"
import Users from "./pages/Users.js"
import Books from "./pages/Books.js"
import Error from "./pages/Error.js"
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

export default function App() {
    return (<>
        <Navbar />
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<Books />} />
                <Route path="/users" element={<Users />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </div>
    </>);
}