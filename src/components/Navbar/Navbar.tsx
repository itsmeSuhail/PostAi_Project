"use client"
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { initialData } from "@/lib/reducers/UserHistory";
import { openModal } from "@/lib/reducers/rightBarSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { MdHistory } from "react-icons/md";
export default function Nav() {
  const dis = useAppDispatch();
  const { data } = useAppSelector(state => state.UserHistory);
  useEffect(() => {
    if (data.length === 0) {
      fetchInitialData()
    }
  }, [])
  const fetchInitialData = async () => {
    let arr = [];
    try {
      const { data } = await axios.get("/api/userhistory/");
      arr = data;
    } catch (error) {
      return [];
    } finally {
      dis(initialData(arr));
    }
  }
  const openHistory=(val:boolean):void=>{
    dis(openModal(val));
  }
  return (
    <nav className="py-3 px-6 sticky top-0 left-0 w-full z-30 bg-white flex justify-between items-center backdrop-blur-md shadow">
      <h1 className="text-2xl text-black font-bold">PostAi</h1>
      <button type="button" className={"flex items-center justify-center gap-1 rounded-lg  text-white  text-center focus:ring-1 focus:outline-none bg-orange-500/90 px-4 py-2 font-semibold"} onClick={() => openHistory(true)}>History <MdHistory size={"20px"}/> </button>
    </nav>
  );
}
