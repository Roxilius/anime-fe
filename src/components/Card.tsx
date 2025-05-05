import React, { JSX } from "react";
import { Languages, Volume2, BadgeAlert, Film, Tv, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface CardProps {
  id: string;
  title: string;
  image: string;
  duration: string;
  japaneseTitle: string;
  type: string;
  nsfw: boolean;
  sub: number;
  dub: number;
  episodes: number;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  image,
  duration,
  type,
  sub,
  dub,
  nsfw,
  episodes,
}) => {
  const navigate = useNavigate();

  const typeIcons: Record<string, JSX.Element> = {
    Movie: <Film className="w-3 h-3" />,
    TV: <Tv className="w-3 h-3" />,
    Special: <Star className="w-3 h-3" />,
  };

  return (
    <motion.figure
      className="relative w-full max-w-[160px] cursor-pointer rounded-lg overflow-hidden bg-[#1a1a2e] text-white shadow-md"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      onClick={() => navigate(`/${id}`)}
    >
      <div className="relative w-full h-[200px] sm:h-[150px] md:h-[200px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {nsfw && (
          <div className="absolute top-2 left-2 z-10 flex items-center gap-1 rounded-md bg-red-600 px-2 py-0.5 text-xs font-semibold">
            <BadgeAlert className="w-4 h-4" />
            18+
          </div>
        )}

        <div className="absolute bottom-2 left-2 flex gap-2">
          <div className="flex items-center gap-1 rounded-md bg-green-200 px-1.5 py-0.5 text-xs font-bold text-black">
            <Languages className="w-3 h-3" /> {sub}
          </div>
          <div className="flex items-center gap-1 rounded-md bg-gray-300 px-1.5 py-0.5 text-xs font-bold text-black">
            <Volume2 className="w-3 h-3" /> {dub}
          </div>
        </div>

        {episodes > 0 && (
          <div className="absolute bottom-2 right-2 z-10 flex items-center gap-1 rounded-md bg-blue-600 px-2 py-0.5 text-xs font-semibold">
            <Film className="w-4 h-4" /> {episodes}
          </div>
        )}
      </div>

      <figcaption className="space-y-1 px-2 pt-2 pb-3">
        <h3 className="text-sm font-semibold line-clamp-2">{title}</h3>
        <p className="flex items-center gap-1 text-xs text-gray-400">
          {typeIcons[type] ?? null}
          {type} • {duration}
        </p>
      </figcaption>
    </motion.figure>
  );
};

export default Card;
