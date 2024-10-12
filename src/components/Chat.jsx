
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Chat.css";

const Chat = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const userId = query.get("userId");

  const [messages, setMessages] = useState([
    { id: 1, sender: "server", content: "Welcome to the chat!" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef(null);
  const wsRef = useRef(null);
  const navigate = useNavigate(null);

  useEffect(() => {
    wsRef.current = new WebSocket("ws://strapi-chat-app-fgb8.onrender.com/ws");

    wsRef.current.onopen = () => {
      wsRef.current.send(JSON.stringify({ action: "connect", userId }));
    };

    wsRef.current.onmessage = (event) => {
      const parsedMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, parsedMessage]);
    };

    return () => {
      wsRef.current.close();
    };
  }, [userId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight; // Scroll to the latest message
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: Date.now(),
        sender: "user",
        content: newMessage,
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      wsRef.current.send(
        JSON.stringify({ action: "message", content: newMessage })
      );

      setNewMessage("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center p-4 flex-col">
      <div className="flex flex-col h-full max-w-screen-md w-full bg-white/80 backdrop-blur-lg rounded-lg shadow-lg p-4">
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Chat Application</h2>
          <p className="text-gray-500">Feel free to chat with the server!</p>
        </div>

        <div
          ref={chatContainerRef}
          className="flex-grow overflow-y-auto max-h-80 scrollbar-none mb-4 bg-gray-100 rounded-lg p-4 shadow-inner"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-3 p-3 rounded-lg text-white max-w-xs ${
                message.sender === "user"
                  ? "bg-blue-500 ml-auto text-right shadow-md"
                  : "bg-gray-500 mr-auto text-left shadow-md"
              }`}
            >
              {message.content}
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-1">
          <input
            type="text"
            className="flex-grow border border-gray-300 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 max-w-full"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? handleSendMessage() : null)}
          />
          <button
            className="bg-indigo-600 text-white py-2 px-3 rounded-full hover:bg-indigo-700 transition duration-300 shadow-lg chat-button"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>

      
      <div className="flex justify-end w-full ">
        <button
          className="bg-red-600 rounded-md text-white py-2 px-4 hover:bg-red-700 transition duration-300 me-8 my-2"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Chat;
