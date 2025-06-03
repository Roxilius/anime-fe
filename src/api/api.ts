export const getRecentEpisodes = async (page: number) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/recent-episodes?page=${page}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to fetch recent episodes:", error);
    return [];
  }
};

export const getTopAiring = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/top-airing`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to fetch recent episodes:", error);
    return [];
  }
};
export const getSpotLight = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/spotlight`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to fetch recent episodes:", error);
    return [];
  }
};

export const searchAnime = async (query: string, page: number) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/${query}?page=${page}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to fetch recent episodes:", error);
    return [];
  }
};

export const scheduleAnime = async (date: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/schedule/${date}`,
      {
        headers: {
          // "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to fetch recent episodes:", error);
    return [];
  }
};

export const getGenreList = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/genre/list`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    const modifiedResult = result.map((r: string) => r.replace(/ /g, "-"));
    return modifiedResult;
  } catch (error) {
    console.error("Failed to fetch recent episodes:", error);
    return [];
  }
};

export const getAnimeByGenre = async (genre: string, page: number) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/genre/${genre}?page=${page}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to fetch recent episodes:", error);
    return [];
  }
};
export const getAnimeInfo = async (id: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/info?id=${id}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to fetch recent episodes:", error);
    return [];
  }
};

export const getWatchAnimeEpisode = async (episodeId: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/watch/${episodeId}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to fetch recent episodes:", error);
    return [];
  }
};
