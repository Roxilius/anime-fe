/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeScheduleAnime } from "../types/types";
import { scheduleAnime } from "../api/api";

const formatDateTime = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Jakarta",
    day: "2-digit",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  return new Intl.DateTimeFormat("en-GB", options).format(date);
};

const initialDate = (() => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
})();

const AnimeSchedule: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(formatDateTime(new Date()));
  const [activeDayIndex, setActiveDayIndex] = useState<number>(new Date().getDay());
  const [selectedDate, setSelectedDate] = useState<string>(initialDate);
  const [scheduleData, setScheduleData] = useState<TypeScheduleAnime[]>([]);

  const getDayLabel = (index: number) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[index];
  };

  const getDayDate = (index: number) => {
    const date = new Date();
    date.setDate(date.getDate() + (index - date.getDay()));
    return date;
  };

  const handleDayClick = (index: number) => {
    setActiveDayIndex(index);
    const selected = getDayDate(index);
    const year = selected.getFullYear();
    const month = String(selected.getMonth() + 1).padStart(2, "0");
    const day = String(selected.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setSelectedDate(formattedDate);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(formatDateTime(new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchSchedule = async () => {
      const result = await scheduleAnime(selectedDate);

      if (result?.results) {
        const formattedData: TypeScheduleAnime[] = result.results.map((item: any) => ({
          id: item.id,
          title: item.title,
          airingEpisode: item.airingEpisode,
          airingTime: item.airingTime,
          url: item.url,
        }));
        setScheduleData(formattedData);
      } else {
        setScheduleData([]);
      }
    };

    fetchSchedule();
  }, [selectedDate]);

  const filteredSchedule = scheduleData;

  return (
    <motion.div
      className="bg-[#141323] text-white p-4 rounded-xl max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex justify-between items-center mb-4">
        <motion.h2
          className="text-lg font-semibold text-pink-300"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          Estimated Schedule
        </motion.h2>
        <motion.div
          className="bg-white text-black text-xs px-3 py-1 rounded-full whitespace-nowrap"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          (GMT+07:00) {currentTime}
        </motion.div>
      </div>

      <div className="flex items-center justify-center gap-2 overflow-hidden flex-wrap">
        {Array.from({ length: 7 }).map((_, index) => {
          const date = getDayDate(index);
          return (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={index}
              onClick={() => handleDayClick(index)}
              className={`cursor-pointer flex flex-col items-center px-4 py-2 rounded-lg min-w-[64px] transition-colors ${
                index === activeDayIndex ? "bg-orange-500 text-white" : "bg-[#1e1d3a] text-gray-300"
              }`}
            >
              <span className="text-sm font-semibold">{getDayLabel(index)}</span>
              <span className="text-xs">{date.getMonth() + 1}/{date.getDate()}</span>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDate}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-3"
          >
            {filteredSchedule.length === 0 ? (
              <div className="text-gray-300">No anime scheduled for today.</div>
            ) : (
              filteredSchedule.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between border-b border-white/10 pb-2"
                >
                  <span className="text-sm text-gray-300 w-20">{item.airingTime}</span>
                  <a
                    href={`/${item.id}`}
                    className="text-sm font-medium flex-1 hover:underline"
                  >
                    {item.title}
                  </a>
                  <span className="text-xs text-gray-300">▶{item.airingEpisode}</span>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AnimeSchedule;
