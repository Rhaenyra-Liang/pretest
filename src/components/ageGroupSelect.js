import React, { useState } from "react";

function AgeGroupSelect({ isOverlapping, onChangeAgeGroup }) {
  const [startAge, setStartAge] = useState(0);
  const [endAge, setEndAge] = useState(20);

  const handleStartAgeChange = (e) => {
    setStartAge(parseInt(e.target.value, 10));
    onChangeAgeGroup([parseInt(e.target.value, 10), endAge]);
  };

  const handleEndAgeChange = (e) => {
    setEndAge(parseInt(e.target.value, 10));
    onChangeAgeGroup([startAge, parseInt(e.target.value, 10)]);
  };

  return (
    <div className="h-full w-[50%] max-w-[423.3px] grid-rows-[20%_60%_20%] grid ">
      <p className="row-start-1 row-end-2 w-full text-gray-700 pl-2 text-sm flex items-center">
        年齡
      </p>
      <div className="row-start-2 row-end-3 p-2 grid grid-rows-[60%_40%] ">
        <div className="flex  w-full ">
          <div className="w-[45%]">
            <select
              value={startAge}
              onChange={handleStartAgeChange}
              className={`w-full h-full rounded-l-md ${
                isOverlapping ? "border-red-500" : "border-[#CFCFCF]"
              } border `}
            >
              {Array.from({ length: 21 }, (_, index) => (
                <option key={index} value={index} disabled={index > endAge}>
                  {index} 歲
                </option>
              ))}
            </select>
          </div>
          <div className="w-[10%] border-[#CFCFCF] border  bg-[#d8d7d7] flex items-center justify-center">
            <p className=" text-[#666666]">~</p>
          </div>
          <div className="w-[45%] border border-[#CFCFCF]">
            <select
              value={endAge}
              onChange={handleEndAgeChange}
              className={`w-full h-full rounded-r-md ${
                isOverlapping ? "border-red-500" : "border-[#CFCFCF]"
              } border `}
            >
              {Array.from({ length: 21 }, (_, index) => (
                <option key={index} value={index} disabled={index < startAge}>
                  {index} 歲
                </option>
              ))}
            </select>
          </div>
        </div>
        {isOverlapping && (
          <p className="text-sm bg-[#F6EBE8] text-[#de6565] rounded-sm px-1 flex items-center border w-full">
            年齡區間不可重疊
          </p>
        )}
      </div>
    </div>
  );
}

export default AgeGroupSelect;
