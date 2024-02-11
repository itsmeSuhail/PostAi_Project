import React, { useEffect } from "react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import JsonEditor from "../Editor/Editor";
import ResponseHeader from "./ResponseHeader";

export default function ResponseTabs({ resBody, resHeader }:any) {
  const tabs = [
    {
      id: 1,
      name: "Response Body",
      value: resBody,
      panel: JsonEditor
    },
    {
      id: 2,
      name: "Response Header",
      value: resHeader?JSON.parse(resHeader):{},
      panel: ResponseHeader
    }
  ];

  return (
    <>
      <Tabs
        forceRenderTabPanel
        selectedTabClassName="bg-orange-500 font-semibold text-white"
      >
        <TabList className="relative text-black rounded-lg border border-black/10 bg-black/10 font-medium text-md p-1.5 flex gap-3 tabs">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              className="relative  md:text-lg text-[15px] z-10 md:px-4 px-2 py-2 focus:ring-1 focus:outline-none focus:ring-gray-300 rounded-[5px] cursor-pointer"
            >
              {tab.name}
            </Tab>
          ))}
        </TabList>

        <div className="w-full h-2"></div>

        {tabs.map((tab) => (
          <TabPanel key={tab.id}>
            <tab.panel panelValue={tab.value} editable={false} />
          </TabPanel>
        ))}
      </Tabs>
    </>
  );
}