import React, { useEffect } from "react";
import ResponseTabs from "./ResponseTabs";
import bytes from "bytes";
import { httpStatusCode } from "./ResponseStatus";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
interface responseType {
  data?: string, headers?: string, request?: string, status: number, statusText: string,
  config?: object, atFirst: boolean,
  time: string
}
export default function Response() {
  const { data, initial } = useAppSelector((state: RootState) => state.UserResponse);
  const response: responseType = {
    atFirst: initial,  status: data.status, statusText: data.statusText, data: data.data, headers: data.headers,
    time: data.time
  }
  const size = () => {
    return bytes(
      (response.data ? JSON.stringify(response.data).length : 0) +
      (response.headers ? JSON.stringify(response.headers).length : 0)
    )
  }
  const status = (): number => {
    return response?.status || 0
  }

  return (
    <div className="mt-3 text-black">

      <div className="flex justify-between items-center gap-3 flex-wrap py-2.5 px-2">
        <h1 className="text-xl font-normal">Response</h1>
        <div className="flex items-center justify-between gap-1 text-sm">
          <span className="pl-3 pr-1.5" style={{ color: httpStatusCode[response.status.toString()], fontWeight: "bold" }}>Status : {status()}</span>
          <span className="pl-3 pr-1.5 border-l border-black/10">Time : {response.time} </span>
          <span className="pl-3 pr-1.5 border-l border-black/10">Size : {size()}</span>
        </div>
      </div>

      <ResponseTabs resBody={response?.data} resHeader={response?.headers} />
    </div>
  );
}
