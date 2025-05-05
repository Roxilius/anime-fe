import React from "react";
import AnimeSchedule from "../components/AnimeSchedule";

const SchedulePage: React.FC = () => {
  return (
    <div className="bg-[#121212] min-h-screen p-6">
      <h1 className="text-3xl font-bold text-white text-center mb-8 sm:text-2xl md:text-3xl lg:text-4xl">
        Weekly Anime Schedule
      </h1>
      <AnimeSchedule />
    </div>
  );
};

export default SchedulePage;
