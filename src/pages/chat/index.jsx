import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import { useTheme } from "../..//hooks/useTheme";
import {
  translateText,
  detectLanguage,
  getSupportedLanguages,
} from "../../api/translateApi";

import { showError } from "../../lib/react.toastify";
function Chat() {
  const { darkMode } = useTheme();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState("fr");
  const [supportedLanguages, setSupportedLanguages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const languages = await getSupportedLanguages();
        setSupportedLanguages(languages);
      } catch (error) {
        showError({ message: "Failed to load supported languages" }, error);
      }
    };
    loadLanguages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      originalLanguage: "en",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const detection = await detectLanguage(inputMessage);
      const detectedLanguage = detection.language || "en";

      const translation = await translateText(
        inputMessage,
        targetLanguage,
        detectedLanguage
      );

      const botMessage = {
        id: Date.now() + 1,
        text: translation.trans || "Translation not available",
        sender: "bot",
        originalText: inputMessage,
        fromLanguage: detectedLanguage,
        toLanguage: targetLanguage,
        showTranslationNote: true,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Translation error:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I couldn't translate that. Please try again.",
        sender: "bot",
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${darkMode ? "bg-black" : "bg-white"} flex h-screen`}>
      <Sidebar />
      <div
        className={`h-full w-px ${darkMode ? "bg-[#ECE9E980]" : "bg-gray-200"}`}
      ></div>
      <div className="flex-1 flex flex-col">
        <div
          className={`${
            darkMode ? "bg-[#13141A]" : "bg-white"
          } p-3 sm:p-4 shadow-sm border-b ${
            darkMode ? "border-[#ECE9E980]" : "border-gray-200"
          } flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3`}
        >
          <h2
            className={`text-lg sm:text-xl ${
              darkMode ? "text-white" : "text-black"
            } font-semibold`}
          >
            Chat
          </h2>
          <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 w-full sm:w-auto">
            <p
              className={`text-base sm:text-[20px] ${
                darkMode ? "text-white" : "text-black"
              } whitespace-nowrap`}
            >
              Select language:
            </p>
            <div className="w-full xs:w-auto">
              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                className={`w-full px-3 py-1 sm:px-4 sm:py-2 rounded-md ${
                  darkMode
                    ? "bg-[#2D3748] text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                {supportedLanguages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.language}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div
          className={`flex-1 overflow-y-auto p-4 ${
            darkMode ? "bg-[#13141A]" : "bg-white"
          }`}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 p-3 rounded-lg max-w-xs ${
                message.sender === "user"
                  ? `${darkMode ? "bg-[#2D3748]" : "bg-blue-100"} ml-auto`
                  : `${darkMode ? "bg-[#1E293B]" : "bg-gray-100"} mr-auto`
              } ${darkMode ? "text-white" : "text-black"}`}
            >
              <p>{message.text}</p>
              {message.sender === "bot" && !message.isError && (
                <p
                  className={`text-xs mt-1 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Translated from {message.fromLanguage} to {message.toLanguage}
                </p>
              )}
            </div>
          ))}
          {isLoading && (
            <div
              className={`mb-4 p-3 rounded-lg max-w-xs ${
                darkMode ? "bg-[#1E293B]" : "bg-gray-100"
              } mr-auto`}
            >
              <p className={darkMode ? "text-white" : "text-black"}>
                Translating...
              </p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className={`${darkMode ? "bg-[#13141A]" : "bg-white"} p-4`}>
          <div className="relative rounded-lg bg-gradient-to-r from-[#0379FF] via-[#B74BDD] to-[#FF805F] p-[1px]">
            <form onSubmit={handleSendMessage} className="flex rounded-lg">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Enter your question, goal or next big project..."
                className={`flex-1 rounded-l-lg p-3 focus:outline-none ${
                  darkMode ? "bg-[#13141A] text-white" : "bg-white text-black"
                }`}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="relative z-10 bg-[#FF9478] text-white px-6 py-3 rounded-r-lg font-medium hover:opacity-90 transition-opacity"
              >
                {isLoading ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Chat;
