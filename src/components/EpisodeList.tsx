import React, { useState } from "react";
import { motion } from 'framer-motion';
import { Episodes } from "../types/types";
import { getWatchAnimeEpisode } from "../api/api";

type EpisodeListProps = {
    episodes: Episodes[]
}

const EpisodeList: React.FC<EpisodeListProps> = ({episodes}) => {
    const [loadingEpisodeId, setLoadingEpisodeId] = useState<string | null>(null);
    const [episodeLinks, setEpisodeLinks] = useState<Record<string, string>>({});
    const [currentPage, setCurrentPage] = useState(1);
    const episodesPerPage = 100;
    const totalPages = Math.ceil(episodes.length / episodesPerPage);

    const paginatedEpisodes = episodes.slice(
        (currentPage - 1) * episodesPerPage,
        currentPage * episodesPerPage
    );

    return (
        <motion.div
            className="mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
        >
            <h3 className="text-2xl font-semibold mb-4">All Episodes</h3>

            {/* Pagination Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
                {[...Array(totalPages)].map((_, index) => {
                    const start = index * episodesPerPage + 1;
                    const end = Math.min((index + 1) * episodesPerPage, episodes.length);
                    return (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold shadow-md ${currentPage === index + 1
                                ? 'bg-orange-500 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                } transition-all`}
                        >
                            {start}–{end}
                        </button>
                    );
                })}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {paginatedEpisodes.map((episode, index: number) => (
                    <motion.button
                        key={index}
                        onClick={async () => {
                            if (episodeLinks[episode.id]) {
                                window.open(episodeLinks[episode.id], '_blank');
                                return;
                            }

                            try {
                                setLoadingEpisodeId(episode.id);
                                const data = await getWatchAnimeEpisode(episode.id);
                                const link = data?.headers?.Referer;
                                setEpisodeLinks((prev) => ({ ...prev, [episode.id]: link }));
                                window.open(link, '_blank');
                            } catch (err) {
                                console.error("Failed to fetch episode link", err);
                            } finally {
                                setLoadingEpisodeId(null);
                            }
                        }}
                        disabled={loadingEpisodeId === episode.id}
                        className={`bg-gray-800 text-white text-sm p-3 rounded-lg shadow-md transition-all text-center ${loadingEpisodeId === episode.id ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700 cursor-pointer'}`}
                        whileHover={loadingEpisodeId !== episode.id ? { scale: 1.03 } : {}}
                        whileTap={loadingEpisodeId !== episode.id ? { scale: 0.97 } : {}}
                    >
                        {loadingEpisodeId === episode.id ? "Loading..." : `Episode ${episode.number}`}
                    </motion.button>
                ))}


            </div>
        </motion.div>
    );
}

export default EpisodeList;