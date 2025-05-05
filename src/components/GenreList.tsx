import React from "react";
import { motion } from "framer-motion";

type GenreListProps = {
  genres: string[];
  selectedGenre: string | null;
  onSelect: (genre: string) => void;
};

const GenreList: React.FC<GenreListProps> = ({ genres, selectedGenre, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-gray-900 rounded-2xl shadow-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-xl font-semibold">Genre List</h2>
        {selectedGenre && (
          <button
            onClick={() => onSelect("")}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition"
          >
            Clear
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => onSelect(genre)}
            className={`cursor-pointer px-4 py-2 rounded-lg text-sm text-center transition-all duration-300
              ${
                selectedGenre === genre
                  ? "bg-orange-500 text-white font-bold"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
          >
            {genre.replace(/-/g, " ")}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default GenreList;
