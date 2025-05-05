import { Volume2, Subtitles, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Anime } from '../types/types';
import { getWatchAnimeEpisode } from '../api/api';
import EpisodeList from './EpisodeList';
import Card from './Card';


const AnimeInfo: React.FC<{ anime: Anime }> = ({ anime }) => {
    const [recentEpisode, setRecentEpisode] = useState<string>("");
    const genreColors = [
        'from-indigo-500 to-purple-600',
        'from-rose-500 to-pink-600',
        'from-emerald-500 to-teal-600',
        'from-yellow-400 to-orange-500',
        'from-pink-500 to-red-500',
    ];

    useEffect(() => {
        if (!anime?.episodes?.length) return;

        const fetchRecentEpisode = async () => {
            try {
                window.scrollTo({ top: 0, behavior: "smooth" });
                const lastEpisode = anime.episodes[anime.episodes.length - 1];
                const data = await getWatchAnimeEpisode(lastEpisode.id);
                setRecentEpisode(data?.headers?.Referer);
            } catch (error) {
                console.error("Failed to fetch episode:", error);
            }
        };
        fetchRecentEpisode();
    }, [anime]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="min-h-screen px-4 md:px-6 py-10 bg-gradient-to-br from-gray-900 to-black text-white"
        >
            <div className="flex flex-col lg:flex-row items-start gap-10 max-w-6xl mx-auto">
                {/* Poster */}
                <motion.img
                    src={anime.image}
                    alt={anime.title}
                    className="rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.1)] w-full max-w-xs object-cover"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                />

                {/* Detail */}
                <div className="flex flex-col flex-grow space-y-6">
                    {/* Title */}
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold relative w-fit"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {anime.title}
                        <span className="absolute left-0 -bottom-2 w-full h-1 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full animate-pulse"></span>
                    </motion.h2>

                    {/* Genres */}
                    <motion.div
                        className="flex flex-wrap gap-2"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: {
                                transition: { staggerChildren: 0.05 },
                            },
                            hidden: {},
                        }}
                    >
                        {anime.genres.map((genre, i) => (
                            <motion.span
                                key={i}
                                className={`bg-gradient-to-r ${genreColors[i % genreColors.length]} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg hover:scale-105 transition-transform cursor-pointer`}
                                variants={{
                                    hidden: { opacity: 0, y: 10 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                            >
                                {genre}
                            </motion.span>
                        ))}
                    </motion.div>

                    {/* Status and Info */}
                    <motion.div
                        className="flex flex-wrap gap-3 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <span className="bg-green-600 px-4 py-1 rounded-full shadow-md">{anime.status}</span>
                        <span className="bg-blue-500 px-4 py-1 rounded-full shadow-md">{anime.type}</span>
                        <span className="bg-purple-500 px-4 py-1 rounded-full shadow-md">{anime.season}</span>
                        <span className="text-gray-300 bg-gray-800 px-3 py-1 rounded-full shadow-inner">
                            Episodes: {anime.totalEpisodes}
                        </span>

                        {anime.hasSub && (
                            <motion.span
                                className="flex items-center gap-1 bg-emerald-500 text-white px-3 py-1 rounded-full shadow-md"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <Subtitles size={16} /> Sub
                            </motion.span>
                        )}
                        {anime.hasDub && (
                            <motion.span
                                className="flex items-center gap-1 bg-yellow-400 text-black px-3 py-1 rounded-full shadow-md"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                            >
                                <Volume2 size={16} /> Dub
                            </motion.span>
                        )}
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        className="text-gray-300 leading-relaxed max-w-3xl"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        {anime.description}
                    </motion.p>

                    {/* Watch Button */}
                    {recentEpisode && recentEpisode !== "#" && (
                        <motion.a
                            href={recentEpisode}
                            target="_blank"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-400 hover:brightness-110 text-white font-bold py-3 px-6 rounded-full shadow-xl transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Play size={20} />
                            Watch The Latest Episode
                        </motion.a>
                    )}
                </div>
            </div>

            {/* Episode List */}
            <div className="mt-16">
                <EpisodeList episodes={anime.episodes} />
            </div>

            {/* Related Anime */}
            <div className="mt-14">
                <motion.h3
                    className="text-2xl font-semibold mb-6 border-b border-white/10 pb-2 w-fit"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Related Anime
                </motion.h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {anime.relatedAnime.map((related, index) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <Card duration={''} nsfw={false} {...related} />
                        </motion.div>
                    ))}
                </div>
            </div>
            {/* recomendations */}
            <div className="mt-14">
                <motion.h3
                    className="text-2xl font-semibold mb-6 border-b border-white/10 pb-2 w-fit"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Recommendations Anime
                </motion.h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {anime.recommendations.map((recomendation, index) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <Card {...recomendation} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};
export default AnimeInfo;
