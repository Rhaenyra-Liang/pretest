import { useState } from "react";
import { addComma } from "./utils/utils";

function PriceInput() {
  const [price, setPrice] = useState("0");
  const [isNotNumber, setIsNotNumber] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const cleanedValue = value.replace(/,/g, "");
    const priceValue = cleanedValue.replace(/[^0-9.-]/g, "");
    setIsNotNumber(cleanedValue !== priceValue);
    setPrice(value);
  };

  const isEmpty = price === "";

  return (
    <div className="h-full w-[50%] max-w-[423.3px] grid-rows-[20%_60%_20%] grid ">
      <p className="row-start-1 row-end-2 w-full text-gray-700 pl-2 text-sm flex items-center">
        入住費用（每人每晚）
      </p>
      <div className="row-start-2 row-end-3 p-2  grid grid-rows-[60%_40%]">
        <div className="flex  ">
          <p className=" bg-[#F5F5F5] rounded-l-md text-xs flex items-center p-1 border border-[#CFCFCF] text-[#7d7d7d]">
            TWD
          </p>
          <input
            value={addComma(price)}
            onChange={handleInputChange}
            placeholder="請輸入費用"
            className={`border ${
              isEmpty ? "border-[#de6565]" : "border-[#CFCFCF]"
            } px-1 rounded-r-md w-full`}
          />
        </div>
        {isEmpty ? (
          <p className="text-sm bg-[#F6EBE8] text-[#de6565] rounded-sm px-1 flex items-center">
            不可為空白
          </p>
        ) : isNotNumber ? (
          <p className="text-sm bg-[#F6EBE8] text-[#de6565] rounded-sm px-1 flex items-center">
            請輸入數字
          </p>
        ) : null}
      </div>
      <p className="row-start-3 row-end-4  pr-2 text-end text-sm w-full text-[#717171]">
        輸入0表示免費
      </p>
    </div>
  );
}

export default PriceInput;
