import React, { JSX } from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import { SpotLight } from '../types/types';
import { Clapperboard, Globe2, Play, Star, Tv2, Volume2 } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type SpotlightProps = {
  data: SpotLight[];
};

const Spotlight: React.FC<SpotlightProps> = ({ data }) => {
  const spotlight = data.find((item) => item.rank === 1);
  if (!spotlight) return null;

  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    dots: true,
    arrows: true,
    prevArrow: (
      <button className="slick-prev z-30 absolute left-6 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full text-white shadow-lg">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    ),
    nextArrow: (
      <button className="slick-next z-30 absolute right-6 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full text-white shadow-lg">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    ),
    appendDots: (dots: React.ReactNode) => (
      <div className="absolute bottom-3 w-full">
        <ul className="flex justify-center gap-2">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-2 h-2 bg-white/40 rounded-full hover:bg-white transition duration-300" />
    ),
  };

  const typeIcons: Record<string, JSX.Element> = {
    Movie: <Clapperboard className="w-4 h-4 text-orange-500" />,
    TV: <Tv2 className="w-4 h-4 text-purple-500" />,
    Special: <Star className="w-4 h-4 text-yellow-400" />,
  };

  return (
    <motion.section
      className="relative w-full h-[500px] bg-black overflow-hidden rounded-2xl shadow-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Slider {...settings}>
        {data.map((spotlightItem, index) => (
          <motion.div key={index} className="relative h-[500px] w-full" whileHover={{ scale: 1.01 }}>
            <img
              src={spotlightItem.banner}
              alt={spotlightItem.title}
              className="absolute inset-0 object-cover w-full h-full opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
            <div className="relative z-10 p-8 md:p-12 max-w-3xl text-white space-y-4 h-full flex flex-col justify-end">
              <motion.h2
                className="text-4xl md:text-5xl font-extrabold drop-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {spotlightItem.title}
              </motion.h2>

              <motion.p
                className="italic text-sm text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {spotlightItem.japaneseTitle}
              </motion.p>

              <motion.div
                className="text-xs text-gray-300 space-y-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-2">
                  {typeIcons[spotlightItem.type] ?? null}
                  <span className="uppercase font-semibold tracking-wide">
                    {spotlightItem.type} • {spotlightItem.duration}
                  </span>
                </div>
                <div className="text-gray-400">{spotlightItem.releaseDate} • {spotlightItem.quality}</div>
                <div className="flex gap-2 mt-1">
                  <div className="flex items-center gap-1 rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-black">
                    <Globe2 className="w-3 h-3" /> {spotlightItem.sub}
                  </div>
                  <div className="flex items-center gap-1 rounded bg-gray-200 px-2 py-0.5 text-xs font-bold text-black">
                    <Volume2 className="w-3 h-3" /> {spotlightItem.dub}
                  </div>
                </div>
              </motion.div>

              <motion.p
                className="text-sm md:text-base text-gray-200 line-clamp-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {spotlightItem.description}
              </motion.p>

              <motion.a
                href={spotlightItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 bg-orange-600 hover:bg-orange-700 transition px-4 py-2 rounded font-semibold w-max shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <Play size={18} /> Watch Now
              </motion.a>
            </div>
          </motion.div>
        ))}
      </Slider>
    </motion.section>
  );
};

export default Spotlight;
