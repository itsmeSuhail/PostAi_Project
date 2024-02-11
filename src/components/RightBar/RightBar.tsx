"use client"
import React, { ChangeEvent, RefObject, useEffect, useRef, useState } from 'react'
import { IoClose } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { openModal } from '@/lib/reducers/rightBarSlice';
import { deleteUserHistory } from '@/lib/reducers/UserHistory';
import { clearInitialState, setInitialLoading, setInitialRequest } from '@/lib/reducers/InitailRequest';
import { RootState } from '@/lib/store';
import { toast } from 'react-toastify';
import axios from 'axios';
export default function RightBar() {
  const { open } = useAppSelector((state: RootState) => state.rightBarSlice);
  const { data } = useAppSelector((state: RootState) => state.UserHistory);
  const dis = useAppDispatch();
  const [history, setHistory] = useState(data);
  const deleteHistory = async (id: string) => {
    await axios.delete(`/api/userhistory/${id}`);
  }
  const setOpen = (val: boolean): void => {
    dis(openModal(val));
  }
  const deleteFromHistory = (val: string): void => {
    dis(deleteUserHistory(val));
  }
  useEffect(() => {
    setHistory(data);
  }, [data])
  const convertTime = (val: string) => {
    const dateInstance = new Date(val);
    const [day, month, year, hour, minute] = [
      dateInstance.getDate(),
      dateInstance.getMonth(),
      dateInstance.getFullYear(),
      dateInstance.getHours(),
      dateInstance.getMinutes()
    ]
    const date = `${day}/${month}/${year} - ${hour}:${minute}`
    return date;

  }

  return (
    <>
      <div className={`md:w-[450px] w-[90%] shadow-lg z-40 fixed right-0  h-screen max-h-screen overflow-x-hidden  bg-white transition-all delay-100 ${open ? "pointer-events-auto translate-x-0" : "translate-x-[100%] pointer-events-none"}`}>
        <div className='w-full bg-white sticky top-0 z-20 py-3 px-1 flex justify-between items-center backdrop-blur-sm border-b-[1px] border-b-gray-300'>
          <p className='space-x-2 pl-3'><span className='text-black font-medium text-3xl'>{history.length}</span><span className='text-black/80 text-lg'>Request{history.length > 1 && "s"}</span></p>
          <button type='button' className='flex items-center justify-center gap-1 rounded-lg font-medium text-black bg-black/10 text-sm px-3 py-2 text-center focus:ring-1 focus:outline-none focus:ring-blue-300' onClick={() => setOpen(false)}>
            <IoClose size={"20px"} color="black" />
          </button>
        </div>

        <div className='flex flex-col gap-2 p-1 overflow-x-hidden overflow-y-auto'>
          {history.length > 0 ? history.map((his, index) => (
            <div className='w-full rounded-lg   p-1' key={index}>
              <p className='text-black/80 text-sm mb-1'>{his?.timeStamp ? convertTime(his.timeStamp) : "1/9/2024"}</p>
              <div className='w-full pr-1 flex items-center font-medium text-black text-sm text-center gap-1 justify-between focus:ring-0 cursor-pointer'>
                <button onClick={() => {
                  dis(setInitialLoading())
                  toast.success("copied")
                  dis(setInitialRequest(his))
                }} className='flex gap-1 w-[90%]'>
                  <div className="text-black  w-15 border rounded-lg px-2 py-2 border-black/10 bg-black/10 hover:bg-black/20 focus:ring-0">
                    {his.method}
                  </div>
                  <div className="text-black overflow-hidden w-full border px-4 py-2 rounded-lg border-black/10 bg-black/10 hover:bg-black/20 focus:ring-0">
                    {his.url}
                  </div>
                </button>
                <button
                  type="button"
                  className="w-fit rounded-md border border-black/10 bg-black/10 hover:bg-black/20 px-2 py-2" title="Delete"
                  onClick={() => {
                    deleteHistory(his.id);
                    deleteFromHistory(his.id)
                  }}
                >
                  <MdDeleteForever color='black' size={"20px"} />
                </button>
              </div>
            </div>
          )) : <p className='px-4 py-2 text-gray-400 font-medium text-lg text-center'>Nothing in history !!</p>}
        </div>
      </div>

    </>
  )
}
