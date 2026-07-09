import React from "react";
import bgImage from "../assets/images/bgImg.png";
import leftTopBg from "../assets/images/leftTopBg.svg";
import rightBottomBg from "../assets/images/rightBottomBg.svg";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-2 md:px-4 relative overflow-hidden bg-[#1D3461]"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPosition:"center",
        backgroundSize:"cover",
        backgroundRepeat:"no-repeat"
      }}
    >
      {/* Background gradients */}
      <img
        src={leftTopBg}
        alt="Top Left Gradient"
        className="absolute top-0 left-0 pointer-events-none z-0"
      />
      <img
        src={rightBottomBg}
        alt="Bottom Right Gradient"
        className="absolute bottom-0 right-0 pointer-events-none z-0"
      />

      <div className="md:w-[560px] md:min-h-[419px] w-full bg-black rounded-[14px] px-2 py-5 md:p-10 shadow-lg border-4 border-(--border-blue) relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
