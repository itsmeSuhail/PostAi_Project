import React, { useEffect } from "react";
import KeyValues from "../KeyValue/KeyValue";
import JsonEditor from "../Editor/Editor";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

export default function RequestTabs({
  queryParams,
  setQueryParams,
  headers,
  setHeaders,
  body,
  setBody,
}: any) {
  useEffect(() => { }, [queryParams])
  const tabs = [
    {
      id: 1,
      name: "Query Params",
      value: queryParams,
      setValue: setQueryParams,
      panel: KeyValues,
    },
    {
      id: 2,
      name: "Headers",
      value: headers,
      setValue: setHeaders,
      panel: KeyValues,
    },
    {
      id: 3,
      name: "Body",
      value: body,
      setValue: setBody,
      panel: JsonEditor,
    },
  ];

  return (
    <>
      <Tabs
        forceRenderTabPanel
        selectedTabClassName="bg-orange-500 text-white font-bold"
      >
        <TabList className="relative text-black rounded-lg border border-black/10 bg-black/10 font-medium text-md p-1.5 flex gap-3 flex-wrap tabs">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              className="relative md:text-lg text-[15px] z-10 md:px-4 px-2 py-2 focus:ring-1 focus:outline-none focus:ring-gray-300 rounded-[5px] cursor-pointer"
            >
              {tab.name}
            </Tab>
          ))}
        </TabList>

        <div className="w-full h-2"></div>

        {tabs.map((tab) => (
          <TabPanel key={tab.id}>
            <tab.panel panelValue={tab.value} setPanelValue={tab.setValue} />
          </TabPanel>
        ))}
      </Tabs>
    </>
  );
}
