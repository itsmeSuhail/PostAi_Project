import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import KeyValuesInput from "./InputFields";
import { useAppSelector } from "@/lib/hooks";

export default function KeyValues({ panelValue, setPanelValue }: any) {
  const { Requestdata } = useAppSelector(state => state.initialRequest);
  const [keyState, setKeyState] = useState(panelValue);
  useEffect(() => {
    setKeyState(panelValue);
  }, [Requestdata])
  const addNewRow = () => {
    setKeyState((state: any) => [
      ...state,
      {
        id: uuidv4(),
        key: "",
        value: "",
      },
    ]);
  };

  const updateRow = (row: any, { name, value }: any) => {
    setKeyState((state: any) =>
      [...state].map((e) => {
        if (e.id == row.id) {
          return { ...e, [name]: value }
        }
        return e;
      })
    );
  };

  const removeRow = (row: any) => {
    setKeyState((state: any) =>
      [...state].filter((e) => e.id !== row.id)
    );
  };

  useEffect(() => {
    setPanelValue(keyState)
  }, [setKeyState])

  return (
    <section className="relative rounded-lg border border-black/10 bg-black/10 text-black text-sm p-2">
      {keyState.map((row: any) => (
        <KeyValuesInput
          row={row}
          key={row.id}
          updateRow={updateRow}
          removeRow={removeRow}
        />
      ))}

      <button
        type="button"
        className={"flex items-center justify-center gap-1 rounded-lg  text-white  text-center focus:ring-1 focus:outline-none bg-orange-500/90 px-4 py-2 font-semibold"}
        onClick={addNewRow}
      >
        Add
      </button>
    </section>
  );
}
