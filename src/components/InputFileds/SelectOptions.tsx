import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { IoIosArrowDown } from "react-icons/io";
export default function SelectOptions({ optionState, options, className }:any) {
    const [ option, setOption ] = optionState
    const [hideDropMenu, setHideDropMenu] = useState(true);

    const selectOption = (selectedOption:boolean) => {
      setOption(selectedOption);
      setHideDropMenu(true);
    };

    useEffect(() => {
      const handleClick = () => setHideDropMenu(true);
      window.addEventListener("click", handleClick, true);
  
      return () => {
        window.removeEventListener("click", handleClick, true);
      };
    }, []);

  return (
    <div className={`relative md:w-25 w-20 z-20 ${className}`}>
      <span className="relative">
        <div className="absolute opacity-0 top-0 left-0 w-full h-full cursor-pointer"></div>
        <button
          onClick={() => setHideDropMenu(!hideDropMenu)}
          className={"flex items-center rounded-lg font-medium text-black text-sm text-center focus:ring-1 focus:outline-none focus:ring-gray-300 relative z-10 w-full justify-center bg-black/10 md:px-4 px-2 py-3 gap-0 " + clsx({ "pointer-events-none" : !hideDropMenu })}
          type="button"
        >
          {option} <IoIosArrowDown size={"20px"} />
        </button>
      </span>

      <div
        hidden={hideDropMenu}
        className="w-full mt-2 absolute border rounded-lg border-black/10 text-sm z-10 shadow overflow-hidden backdrop-blur-md bg-white "
      >
        {options.map((option:boolean, index:number) => (
            <button
              key={index}
              type="button"
              onClick={() => selectOption(option)}
              className="block px-4 py-2 w-full hover:bg-black/10 text-black"
            >
              {option}
            </button>
        ))}
      </div>
    </div>
  );
}
