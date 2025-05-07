import React from "react";
import { Link } from "react-router-dom";
import frame from "../../assets/frame1.svg";

function Welcome() {
  return (
    <div className="relative bg-black min-h-screen flex flex-col justify-center items-center gap-6 px-4 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40">
        <img
          src={frame}
          alt="background pattern"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 text-center">
        <h1 className="text-[72px] md:text-[96px] font-bold text-white leading-[1.1]">
          <span className="block">AI-Powered</span>
          <span className="block">Productivity.</span>
        </h1>
      </div>

      <div className="relative z-10">
        <p className="text-[20px] text-white text-center min-w-[600px] leading-[1.5]">
          AI-powered tools in one to supercharge your team productivity.
          <br />
          With Taskade, all your work is in sync in one unified workspace.
        </p>
      </div>

      <div className="relative z-10">
        <Link to="/login">
          <button className="bg-transparent cursor-pointer transition-colors duration-300 h-[45px] min-w-[200px] rounded-full border-2 border-[#FF805F] text-[#E5E7EB] text-[20px] font-medium">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Welcome;
