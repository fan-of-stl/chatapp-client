import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: 0.4 },
    },
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 to-purple-500">
      {/* Chat App Introduction */}
      <motion.div
        className="text-white text-center mb-10"
        initial="hidden"
        animate="visible"
        variants={textVariants}
      >
        <h1 className="text-5xl font-bold mb-4">
          Welcome to the Real-Time Chat App
        </h1>
        <p className="text-lg">
          Experience seamless communication with instant messaging.
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        className="flex space-x-6"
        initial="hidden"
        animate="visible"
        variants={buttonVariants}
      >
        <button
          className="bg-white text-purple-700 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-purple-50 transition"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="bg-white text-purple-700 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-purple-50 transition"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </motion.div>
    </div>
  );
};

export default Home;
