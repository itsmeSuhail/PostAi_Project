"use client"
type Props = {}
import { ToastContainer } from 'react-toastify';
import { ScaleLoader } from 'react-spinners'
import dynamic from 'next/dynamic'
const DynamicRequest = dynamic(() => import("@/components/RequestBody/Request"), { loading: BigLoader });
const DynamicResponse = dynamic(() => import("@/components/Response/Response"), { loading: BigLoader });
const page = (props: Props) => {
 
  return <>
    <div className="md:px-20 px-5 w-full my-10">
      <ToastContainer />
      <DynamicRequest />
      <DynamicResponse />
    </div>
  </>
}
function BigLoader() {
  return (
    <div className="w-full flex py-4 px-2 flex-colo h-[90vh] items-center justify-center">
      <ScaleLoader color="rgb(249 115 22 / 0.9)" />
    </div>
  );
}


export default page