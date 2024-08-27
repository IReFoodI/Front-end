import React from 'react';

export function BannerPromo  ({ title })  {
  return (
    <div className="h-[300px] p-4 my-4 top-[889px] bg-[#FFCBCB] rounded-[14px] flex items-center justify-center">
      <h1 className="text-center text-[#616375] font-inter font-semibold text-[24px] leading-[29px]">
        {title}
      </h1>
    </div>
  );
};

