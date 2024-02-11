import React from "react";
import { MdDeleteForever } from "react-icons/md";

export default function KeyValuesInput({ row, updateRow, removeRow }:any) {
  return (
    <div className="flex flex-wrap gap-2 mb-2">
      <input
        type="text"
        className="rounded-lg min-w-[150px] border border-black/10 bg-black/10 hover:bg-black/10  text-md p-1.5 focus:ring-1 focus:outline-none focus:ring-gray-300 font-semibold flex-grow"
        placeholder="Key"
        name="key"
        value={row.key}
        onChange={({ target }) => updateRow(row, target)}
      />
      <div className="flex flex-grow">
        <input
          type="text"
          className="rounded-lg min-w-[150px] border border-black/10 bg-black/10 hover:bg-black/10  text-md p-1.5 focus:ring-1 focus:outline-none focus:ring-gray-300 font-semibold flex-grow"
          placeholder="Value"
          name="value"
          value={row.value}
          onChange={({ target }) => updateRow(row, target)}
        />
        <button
          type="button"
          onClick={() => removeRow(row)}
          className={"flex items-center justify-center gap-1 rounded-lg  text-white  text-center focus:ring-1 focus:outline-none bg-orange-500/90 px-3 ml-1 py-2 font-semibold"}
        >
          <MdDeleteForever size={"17px"} />
        </button>
      </div>
    </div>
  );
}
