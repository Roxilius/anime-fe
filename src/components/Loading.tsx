import { motion } from "framer-motion";
const Loading = () => {
    return (
        <motion.div
            className="col-span-full flex flex-col items-center justify-center text-center mt-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
        >
            <motion.img
                src="https://aniwatchtv.to/images/404.png?v=0.2"
                alt="No results"
                className="w-64 sm:w-80 md:w-96 object-contain mb-6"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            />
            <motion.h1
                className="text-xl sm:text-2xl font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
            >
                Loading...
            </motion.h1>
        </motion.div>
    );
};

export default Loading;