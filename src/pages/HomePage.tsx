/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  getAnimeByGenre,
  getGenreList,
  getRecentEpisodes,
  getTopAiring,
  searchAnime,
} from "../api/api";
import { TypeRecentEpisodes } from "../types/types";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import GenreList from "../components/GenreList";
import { motion } from "framer-motion";

type HomeProps = {
  searchKeyword: string;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  selectedGenre: string;
  setSelectedGenre: React.Dispatch<React.SetStateAction<string>>;
};

const HomePage = () => {
  const { searchKeyword, setSearchKeyword, selectedGenre, setSelectedGenre}: HomeProps = useOutletContext();
  const [animeData, setAnimeData] = useState<TypeRecentEpisodes | null>(null);
  const [topAiring, setTopAiring] = useState<TypeRecentEpisodes | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [genreList, setGenreList] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchKeyword) {
          const data = await searchAnime(searchKeyword, page);
          setAnimeData(data);
          setTotalPages(data.totalPages);
        } else if (selectedGenre) {
          const data = await getAnimeByGenre(selectedGenre, page);
          setAnimeData(data);
          setTotalPages(data.totalPages);
        } else {
          const dataRecent = await getRecentEpisodes(page);
          setAnimeData(dataRecent);
          setTotalPages(Math.ceil(dataRecent.totalPages));
        }

        const dataTopAiring = await getTopAiring();
        setTopAiring(dataTopAiring);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page, searchKeyword, selectedGenre]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getGenreList();
        setGenreList(data);
      } catch (error) {
        console.error("Error fetching genre list:", error);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [searchKeyword]);

  const handleNextPage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleSelectGenre = (genre: string) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSearchKeyword("");
    setSelectedGenre(genre);
    setPage(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-4 py-8"
    >
      <div className="max-w-screen-xl mx-auto flex flex-col gap-10">
        {/* Title */}
        <motion.h2
          className="text-xl sm:text-2xl font-bold text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {searchKeyword
            ? `Search Results for "${searchKeyword}"`
            : selectedGenre
              ? `Anime for Genre ${selectedGenre}`
              : "Recent Episodes"}
        </motion.h2>

        {/* Content Grid */}
        <div className="flex flex-col xl:flex-row gap-10">
          {/* Main Content */}
          <div className="w-full xl:w-8/12">
            <motion.div
              key={`${page}-${selectedGenre}-${searchKeyword}`}
              className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 place-items-center"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {Array.isArray(animeData?.results) && animeData.results.length > 0 ? (
                animeData.results.map((anime: any, index: number) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.1, delay: index * 0.1 }}
                  >
                    <Card {...anime} />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  className="col-span-full flex flex-col items-center justify-center text-center mt-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.img
                    src="https://aniwatchtv.to/images/404.png?v=0.2"
                    alt="No results"
                    className="w-64 sm:w-80 md:w-96 object-contain mb-6"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  />
                  <motion.h1
                    className="text-xl sm:text-2xl font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                  >
                    No Results for "{searchKeyword}"
                  </motion.h1>
                </motion.div>
              )}
            </motion.div>

            {animeData?.results?.length ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onNextPage={handleNextPage}
                  onPreviousPage={handlePreviousPage}
                />
              </motion.div>
            ) : null}
          </div>

          {/* Sidebar */}
          <div className={`w-full xl:w-4/12 flex flex-col gap-8 ${selectedGenre ? 'flex-col-reverse' : 'flex-col'}`}>
            {/* Top Airing */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Top Airing Anime</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2 place-items-center gap-4">
                {Array.isArray(topAiring?.results) && topAiring?.results.map((anime: any, index: number) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.1, delay: index * 0.1 }}
                  >
                    <Card {...anime} />
                  </motion.div>
                ))}
              </div>
            </motion.div>


            {/* Genre List */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <GenreList
                genres={genreList}
                selectedGenre={selectedGenre}
                onSelect={handleSelectGenre}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;
