import { useState, useRef, useEffect } from "react";
import AgeGroupSelect from "../components/ageGroupSelect";
import PriceInput from "../components/priceInput";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { getNumberIntervals } from "../components/utils/utils";

const AgeGroupPriceList = ({ onChange }) => {
  const [groupList, setGroupList] = useState([
    { id: 1, ageGroup: [0, 20], price: 0, isOverlapping: false },
  ]);

  // 新增架個設定，會scroll到最下面的list
  const listRef = useRef(null);
  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
  }, [groupList.length]);

  // list裡面overlap計算
  const overlappingAgeGroups = getNumberIntervals(
    groupList.map((item) => item.ageGroup)
  ).overlap;

  const newGroupList = groupList.map((item) => {
    return {
      ...item,
      isOverlapping: overlappingAgeGroups.some(
        (overlap) =>
          overlap[0] <= item.ageGroup[0] && overlap[1] >= item.ageGroup[1]
      ),
    };
  });

  // 對比list有沒有改變，如果有改變，要重新計算overlap
  useEffect(() => {
    if (JSON.stringify(newGroupList) !== JSON.stringify(groupList)) {
      setGroupList(newGroupList);
    }
  }, [groupList, newGroupList]);

  useEffect(() => {
    onChange(newGroupList);
  }, [onChange, newGroupList]);

  // 新增list
  const handleAdd = () => {
    const newId = groupList.length ? groupList[groupList.length - 1].id + 1 : 1;
    setGroupList((prev) => [
      ...prev,
      { id: newId, ageGroup: [0, 20], price: 0, isOverlapping: false },
    ]);
  };

  // 移除list
  const handleRemove = (id) => {
    setGroupList((prev) => prev.filter((item) => item.id !== id));
  };

  // 計算在ageGroupSelect裡面的年齡區間選項state有沒有更新
  const updateAgeGroup = (id, newAgeGroup) => {
    const updatedGroupList = groupList.map((item) => {
      if (item.id === id) {
        return { ...item, ageGroup: newAgeGroup };
      }
      return item;
    });
    setGroupList(updatedGroupList);
  };

  return (
    <div className=" h-[93.5dvh] w-screen grid grid-rows-2 ">
      <div className="h-[88px] row-start-1 row-end-2 bg-custom-gradient"></div>
      <div className="h-[93dvh] fixed z-10 row-start-1 row-end-3 w-[40%]   flex flex-col justify-self-center  justify-center items-center">
        <ul
          className="flex flex-col h-[93dvh] py-4 w-full overflow-y-auto gap-8 divide-y-2 pr-2"
          ref={listRef}
        >
          {groupList.map((item) => (
            <li
              key={item.id}
              className="grid pt-6 grid-rows-[10%_87%] w-full min-h-[205px] gap-2"
            >
              <div className="row-start-1 row-end-2 h-full flex w-full justify-center ">
                <div className=" w-[50%] max-w-[430px] flex justify-start">
                  <p className="text-sm  flex items-center text-[#3a3a3a] ">
                    價格設定 - {item.id}
                  </p>
                </div>
                <div className=" w-[50%] max-w-[430px] flex justify-end">
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-sm flex items-center text-[#e35656] gap-1"
                  >
                    <AiOutlineClose className=" text-lg" />
                    移除
                  </button>
                </div>
              </div>
              <div className="row-start-2 row-end-3 w-full gap-4 flex justify-center">
                <AgeGroupSelect
                  isOverlapping={item.isOverlapping}
                  setGroupList={setGroupList}
                  newGroupList={newGroupList}
                  onChangeAgeGroup={(newAgeGroup) =>
                    updateAgeGroup(item.id, newAgeGroup)
                  }
                />
                <PriceInput />
              </div>
            </li>
          ))}
          <div className=" w-full max-w-[860px] flex justify-start self-center pt-6">
            <button
              onClick={handleAdd}
              className="text-sm flex items-center text-[#248178] gap-1"
            >
              <AiOutlinePlus />
              新增價格設定
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default AgeGroupPriceList;
