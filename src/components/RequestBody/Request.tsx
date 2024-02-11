import React, { ChangeEvent, useEffect, useState } from "react";
import { saveToHistory } from "@/utils/functions";
import { HistoryProps, addHistory } from "@/lib/reducers/UserHistory";
import { useAppDispatch, useAppSelector, useAppStore } from "@/lib/hooks";
import { addResponse, initialuserResponseStateProps } from "@/lib/reducers/UserResponse";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import RequestTabs from "./RequestTabs";
import toObject, { detectType, reverseToKeyValue } from "@/utils/ObjectCreator";
import InputFields from "../InputFileds/InputFields";
import { RootState } from "@/lib/store";
import moment from "moment"
import { toast } from "react-toastify";
import { formatTime } from "@/utils/TimeFormat";
type initialStateProp = {
  id: string,
  key: string,
  value: string
}
const initialKeyValueState: initialStateProp[] = [

];

const initialURLState = "https://fakestoreapi.com/products/1"



const validBody = (data: any) => {
  const DataLen = Object.entries(data).length > 0;

  if (DataLen) return JSON.stringify(data, null, 2)
  return "{\n\t\n}"
}

export default function Request() {
  const { Requestdata, loading } = useAppSelector((state) => state.initialRequest);
  const setHistory = (data: HistoryProps): void => {
    dispatch(addHistory(data));
  }
  const dispatch = useAppDispatch();
  const [sending, setSending] = useState(false);
  const [URL, setURL] = useState(initialURLState);
  const [method, setMethod] = useState("GET");
  const [queryParams, setQueryParams] = useState(initialKeyValueState);
  const [headers, setHeaders] = useState(initialKeyValueState);

  const [initialBody, setInitialBody] = useState("{\n\t\n}");
  const [body, setBody] = useState(initialBody);
  const setResponse = (obj: initialuserResponseStateProps): void => {
    const { data: { data, status, statusText, time, headers }, initial } = obj;
    dispatch(
      addResponse({
        data: { data, statusText, status, time, headers },
        initial
      })
    )
  }

  const onSendRequest = async (e: ChangeEvent) => {
    e.preventDefault();
    setSending(true);

    let data
    try {
      data = JSON.parse(body.toString())
    } catch (err) {
      setSending(false);
      return alert("Something wrong with json data !")
    }

    let time = new Date().getTime()
    const request = {
      url: URL.trim(),
      method,
      headers: toObject(headers),
      params: toObject(queryParams),
      data,
      id: uuidv4()
    };
    try {

      const response = await axios(request);

      time = new Date().getTime() - time
      const timeConvertor = formatTime(time);
      setResponse({
        data: { ...response, time: timeConvertor, headers: detectType(response.headers), data: detectType(response?.data) },
        initial: false
      });

      saveToHistory({ ...request, data: detectType(request?.data), headers: detectType(request?.headers), params: detectType(request?.params), timeStamp: Date.now().toLocaleString() }, setHistory)
    } catch (err: any) {
      time = new Date().getTime() - time
      const timeConvertor = formatTime(time);

      setResponse({
        data: { status: 404, time: timeConvertor, data: "", statusText: err.message },
        initial: false
      });
      toast.error("Something went wrong")
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (Requestdata.length > 0) {
      try {
        setURL(Requestdata[0].url)
        setMethod(Requestdata[0].method)
        setQueryParams(reverseToKeyValue(JSON.parse(Requestdata[0]?.params||`{}`)))
        setHeaders(reverseToKeyValue(JSON.parse(Requestdata[0].headers||`{}`)))
        setInitialBody(validBody(Requestdata[0].data))
        setBody(validBody(Requestdata[0].data))

      } catch (err) {
      }
    }
  }, [loading, Requestdata])

  return (
    <>
      <InputFields
        urlState={[URL, setURL]}
        methodState={[method, setMethod]}
        sending={sending}
        onSendRequest={onSendRequest}
      />
      <RequestTabs
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        headers={headers}
        setHeaders={setHeaders}
        body={initialBody}
        setBody={setBody}
      />
    </>
  );
}
