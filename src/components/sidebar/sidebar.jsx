import React, { useState } from "react";
import {
  FiSun,
  FiMoon,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useTheme } from "../../hooks/useTheme";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { darkMode, toggleDarkMode } = useTheme();

  const menuItems = [
    { name: "Dashboard" },
    { name: "Chatbots" },
    { name: "Files" },
    { name: "Prompts" },
    { name: "File Wizard" },
    { name: "API" },
    { name: "User Guide" },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`flex h-screen ${darkMode ? "bg-black" : "bg-white"}`}>
      <div
        className={`w-10 flex flex-col items-center pt-4 border-r ${
          darkMode
            ? "bg-black text-white border-[#ECE9E980]"
            : "bg-gray-100 border-none"
        } `}
      >
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-full mb-4 ${
            darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
          }`}
        >
          {isOpen ? <FiChevronLeft /> : <FiChevronRight />}
        </button>
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full mb-4 ${
            darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
          }`}
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
        <button
          className={`p-2 rounded-full ${
            darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
          }`}
        >
          <FiSettings />
        </button>
      </div>

      {isOpen && (
        <div
          className={`w-64 flex flex-col justify-between ${
            darkMode ? "bg-black text-white" : "bg-white text-black"
          } shadow-md p-4 border-r ${
            darkMode ? "border-[#ECE9E980]" : "border-gray-200"
          }`}
        >
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-[#FF9478] w-[48px] h-[48px] rounded-md"></div>
            <h1 className="text-xl font-bold">Amizzo Chat</h1>
          </div>
          <div className="mb-10">
            <h2 className="text-lg font-semibold mb-2">Menu</h2>
            <ul>
              {menuItems.map((item, index) => (
                <React.Fragment key={index}>
                  <li className="mb-2">
                    <div className="flex items-center">
                      <span className="hover:text-[#FF9478] cursor-pointer">
                        {item.name}
                      </span>
                    </div>
                  </li>
                </React.Fragment>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold mb-2">View Plan</h3>
            <a
              href="#"
              className={`text-sm ${
                darkMode ? "text-white" : "text-black"
              } hover:underline mb-4 block`}
            >
              Join Smith
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
