import { useEffect, useState } from "react";
import AnimeInfo from "../components/AnimeInfo";
import { Anime } from "../types/types";
import { getAnimeInfo } from "../api/api";
import { useParams } from "react-router-dom";


const AnimeInfoPage = () => {
    const { animeId } = useParams<{ animeId: string }>();
    const [anime, setAnime] = useState<Anime>();

    useEffect(() => {
        const fetchAnimeInfo = async () => {
            if (!animeId) return;

            try {
                const data = await getAnimeInfo(animeId);
                setAnime(data);
            } catch (error) {
                console.error("Failed to fetch anime info:", error);
            }
        };

        fetchAnimeInfo();
    }, [animeId]);

    return (
        <div className="min-h-screen p-6 text-white bg-black">
            {anime && (
                <AnimeInfo anime={anime} />
            )}
        </div>
    );
}

export default AnimeInfoPage;