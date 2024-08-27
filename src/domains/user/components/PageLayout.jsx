import React from "react";

export default function PageLayout({ children, headerText }) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="fixed top-0 left-0 w-full sm:h-1/4 lg:h-1/6 bg-[#fedede] z-10 flex justify-center items-center">
        <p className="text-center text-2xl font-bold">{headerText}</p>
      </div>
      <div className="sm:pt-[30vh] lg:pt-[20vh] w-11/12 lg:w-10/12">
        {children}
      </div>
    </div>
  );
}
