import React from "react";
import SelectMenu from "./SelectOptions";
import { FiSend } from "react-icons/fi";
const methods = ["GET", "POST", "DELETE", "PUT", "PATCH"];

export default function InputFields({ sending, urlState, methodState, onSendRequest }: any) {
    const [URL, setURL] = urlState;
    const [method, setMethod] = methodState;

    return (
        <div className="pt-[5vh] pb-[2vh]">
            <form onSubmit={(e) => onSendRequest(e)} className="flex gap-1 w-full flex-wrap">
                <SelectMenu
                    className="md:flex-1 md:flex-grow-0 flex-grow"
                    options={methods}
                    optionState={[method, setMethod]}
                />
                <input
                    type="url"
                    value={URL}
                    required
                    onChange={({ target: { value } }) => setURL(value)}
                    name="url"
                    className="text-black rounded-lg border border-black/30 bg-black/10 hover:bg-black/10 focus:ring-1 focus:outline-none focus:ring-white font-medium text-sm px-5 py-2.5 md:flex-8 md:flex-grow-1 flex-grow "
                    placeholder="https://example.com"
                />
                <button
                    className={"flex items-center justify-center gap-1 rounded-lg  text-white  text-center focus:ring-1 focus:outline-none bg-orange-500/90 px-4 py-2 font-semibold md:flex-1 md:flex-grow-0 flex-grow"}
                    type="submit"
                >
                    Send {sending && <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="none"
                        id="loader"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 6V3M6 12H3M7.75 7.752L5.6 5.602"></path>
                    </svg> }
                </button>
            </form>
        </div>
    );
}
