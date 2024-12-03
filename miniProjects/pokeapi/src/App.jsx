import "./App.scss";
import { useEffect } from "react";
import { fetchMultiplePokemonById } from "./RTK/thunk";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Search from "./pages/Search";
import Favorite from "./pages/Favorite";
import { useState } from "react";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchMultiplePokemonById(151));
  }, [dispatch]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim()) {
      navigate(`/search?query=${encodeURIComponent(value)}`);
    } else {
      navigate("/");
    }
  };

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-center">포켓몬 도감</h1>
      <nav className="flex justify-center gap-4">
        <Link to={"/"}>메인</Link>
        <Link to={"/favorite"}>찜목록</Link>
        <span>🔍</span>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="포켓몬 검색"
          className="border-b border-[darkgray] w-[200px] text-center"
        />
      </nav>
      <main className="flex flex-wrap justify-center gap-[20px] pt-[20px]">
        <Routes>
          <Route path={"/"} element={<Main />} />
          <Route path={"/pokemon/:id"} element={<Detail />} />
          <Route path={"/search"} element={<Search />} />
          <Route path={"/favorite"} element={<Favorite />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
