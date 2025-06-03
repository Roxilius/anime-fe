import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
    setSelectedGenre("");
  };
  return (
    <>
      <Header onSearch={handleSearch} searchKeyword={searchKeyword} />
      <Outlet context={{ searchKeyword, setSearchKeyword, selectedGenre, setSelectedGenre }} />
    </>
  );
}

export default App;
