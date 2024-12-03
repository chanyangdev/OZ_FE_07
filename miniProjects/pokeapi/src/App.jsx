import "./App.scss";
import { useEffect, Suspense, lazy } from "react";
import { fetchMultiplePokemonById } from "./RTK/thunk";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import GlobalStyles from "./styles/GlobalStyles";
import styled from "styled-components";

// Lazy load components
const Main = lazy(() => import("./pages/Main"));
const Detail = lazy(() => import("./pages/Detail"));
const Search = lazy(() => import("./pages/Search"));
const Favorite = lazy(() => import("./pages/Favorite"));

// Loading component
const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: 1.5rem;
  color: #ff5350;
  
  &::after {
    content: "";
    width: 40px;
    height: 40px;
    border: 4px solid #ff5350;
    border-top: 4px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-left: 10px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

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
      <GlobalStyles />
      {/* Main title */}
      <h1 className="text-4xl font-bold text-center">포켓몬 도감</h1>
      
      {/* Navigation bar */}
      <nav className="flex justify-center gap-4">
        <Link to={"/"}>메인</Link>
        <Link to={"/favorite"}>찜목록</Link>
      </nav>

      <Suspense fallback={<LoadingSpinner>Loading...</LoadingSpinner>}>
        {/* Main content area with routes */}
        <main className="flex flex-wrap justify-center gap-[20px] pt-[20px]">
          <Routes>
            <Route path={"/"} element={<Main />} />
            <Route path={"/pokemon/:id"} element={<Detail />} />
            <Route path={"/search"} element={<Search searchTerm={searchTerm} />} />
            <Route path={"/favorite"} element={<Favorite />} />
          </Routes>
        </main>
      </Suspense>
    </>
  );
}

export default App;
