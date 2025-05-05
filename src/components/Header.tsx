import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search, CalendarDays, Menu, X } from "lucide-react";

type HeaderProps = {
  searchKeyword: string;
  onSearch: (keyword: string) => void;
};

const Header = ({ searchKeyword, onSearch }: HeaderProps) => {
  const [keyword, setKeyword] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword);
    navigate("/home");
    setMenuOpen(false); // close drawer if open
  };

  useEffect(() => {
    setKeyword(searchKeyword);
  }, [searchKeyword]);

  // Scroll animation
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [1, 0.9]);
  const blur = useTransform(scrollY, [0, 100], ["0px", "6px"]);

  return (
    <>
      <motion.header
        style={{ opacity: bgOpacity, backdropFilter: blur }}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-xl"
      >
        <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 py-3">
          {/* Logo */}
          <motion.a
            href="/"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-3xl font-extrabold text-orange-400 tracking-wide cursor-pointer"
          >
            Roxilius Anime
          </motion.a>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden md:flex items-center space-x-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <motion.a
              href="/schedule"
              whileHover={{ scale: 1.1, color: "#facc15" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center gap-2 text-lg font-semibold hover:text-yellow-400"
            >
              <CalendarDays size={20} /> Schedule
            </motion.a>
            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={keyword}
                  onChange={handleSearchChange}
                  placeholder="Search Anime..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg"
              >
                Search
              </motion.button>
            </form>
          </motion.nav>

          {/* Hamburger Button for Mobile */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-gray-900 text-white z-40 shadow-lg p-6 flex flex-col gap-6"
          >
            <a
              href="/"
              className="text-2xl font-bold text-orange-400"
              onClick={() => setMenuOpen(false)}
            >
              Roxilius Anime
            </a>

            <a
              href="/schedule"
              className="flex items-center gap-2 text-lg hover:text-yellow-400 transition-all"
              onClick={() => setMenuOpen(false)}
            >
              <CalendarDays size={20} /> Schedule
            </a>

            <form onSubmit={handleSearchSubmit} className="flex flex-col gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={keyword}
                  onChange={handleSearchChange}
                  placeholder="Search Anime..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg"
              >
                Search
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
