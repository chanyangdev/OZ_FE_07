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
  // Initialize Redux dispatch and get loading state
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading);
  const navigate = useNavigate();
  // State for search input
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch initial Pokemon data when component mounts
  useEffect(() => {
    dispatch(fetchMultiplePokemonById(151));
  }, [dispatch]);

  // Handle search input changes
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Navigate to search page if there's a search term, otherwise go home
    if (value.trim()) {
      navigate(`/search?query=${encodeURIComponent(value)}`);
    } else {
      navigate("/");
    }
  };

  // Show loading state while fetching data
  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <>
      {/* Main title */}
      <h1 className="text-4xl font-bold text-center">포켓몬 도감</h1>
      
      {/* Navigation bar */}
      <nav className="flex justify-center gap-4">
        <Link to={"/"}>메인</Link>
        <Link to={"/favorite"}>찜목록</Link>
      </nav>

      {/* Main content area with routes */}
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
