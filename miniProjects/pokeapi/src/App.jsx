import "./App.scss";
import { useEffect } from "react";
import { fetchMultiplePokemonById } from "./RTK/thunk";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Search from "./pages/Search";
import Favorite from "./pages/Favorite";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(fetchMultiplePokemonById(151));
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-center">포캣몬 도감</h1>
      <nav className="flex justify-center gap-4">
        <Link to={"/"}>메인</Link>
        <Link to={"/detail/:pokemon"}>상세정보</Link>
        <Link to={"/search"}>검색</Link>
        <Link to={"/favorite"}>찜목록</Link>
      </nav>
      <main className="flex justify-center">
        <Routes>
          <Route path={"/"} element={<Main />} />
          <Route path={"/detail/:pokemon"} element={<Detail />} />
          <Route path={"/search"} element={<Search />} />
          <Route path={"/favorite"} element={<Favorite />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
