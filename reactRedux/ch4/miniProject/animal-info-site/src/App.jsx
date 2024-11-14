import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./page/main"; // Change "Main" to "main"
import Detail from "./page/Detail";
import Search from "./page/Search";

function App () {
  return (
  <>
  <header>
    <h1>I ♥️ Animals</h1>
  </header>
  <Routes>
    <Route path='/' element={<Main />}></Route>
    <Route path='/detail' element={<Detail />}></Route>
    <Route path='/search' element={<Search />}></Route>
  </Routes>
  <footer>all rights reserved to OZ</footer>
  </>
  );
}

export default App;