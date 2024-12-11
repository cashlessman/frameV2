"use client";

import { useEffect, useCallback, useState } from "react";
import sdk, {
  type FrameContext,
} from "@farcaster/frame-sdk";

// import { config } from "~/components/providers/WagmiProvider";
import { Button } from "~/components/ui/Button";
import Link from 'next/link';
import Image from 'next/image';

export default function Demo(
  { title }: { title?: string } = { title: "Frames v2 by @cashlessman.eth" }
) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<FrameContext>();
  // const [isContextOpen, setIsContextOpen] = useState(false);
  // // const [txHash, setTxHash] = useState<string | null>(null);
  // const [addFrameResult, setAddFrameResult] = useState("");
  // const [notificationDetails, setNotificationDetails] =
  //   useState<FrameNotificationDetails | null>(null);
  // const [sendNotificationResult, setSendNotificationResult] = useState("");

  useEffect(() => {
    const load = async () => {
      setContext(await sdk.context);
      sdk.actions.ready();
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);
  interface User {
    fid: number;
    username: string;
    displayName: string;
    pfp: { url: string };  // Profile picture URL
  }
  interface AroundResponse {
    data: User[]; 
  
  }

  const close = useCallback(() => {
    sdk.actions.close();
  }, []);

  const [data, setData] = useState<AroundResponse | null>(null);
  const Around = useCallback(async (fid: string) => {
    try {
      const aroundResponse = await fetch(`/api/wrapcast?fid=${fid}`);
      if (!aroundResponse.ok) {
        throw new Error(`Fid HTTP error! Status: ${aroundResponse.status}`);
      }
      const responseData = await aroundResponse.json();
      if (Array.isArray(responseData) && responseData.length >= 3) {
        setData({ data: responseData });       
      } else {
        throw new Error("Invalid response structure or not enough data");
      }
    } catch (err) {
      console.error("Error fetching data from warpcast", err);
    }
  }, []);

  // const renderError = (error: Error | null) => {
  //   if (!error) return null;
  //   return <div className="text-red-500 text-xs mt-1">{error.message}</div>;
  // };

  const  default_image_url="https://wrpcd.net/cdn-cgi/imagedelivery/BXluQx4ige9GuW0Ia56BHw/7df1c31c-5721-4d33-2d2c-a102a8b3ca00/original" 
useEffect(() => {
  if (context?.user.fid) {
    Around(String(context.user.fid));
  }
}, [context?.user.fid]);

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }
  // w-[350px]

  if (!context?.user.fid)
    return (
      <div className="flex flex-col items-center justify-center h-full text-white text-2xl p-4">
        <p>you need to access this frame from inside a farcaster client</p>
        <p>(click on the Logo to open in Warpcast)</p>

        <div className="flex items-center justify-center p-2 bg-white rounded-lg mt-4">
          <Link href="https://warpcast.com/cashlessman.eth/0xc798a604" className="shadow-lg shadow-white">
            <Image
              src="https://warpcast.com/og-logo.png"
              alt="warpcast logo"
              width={100}
              height={100}
            />
          </Link>
        </div>
      </div>
    );


  return (
    <div className="w-auto mx-2 my-2 px-2">
      <h1 className="text-2xl font-bold text-center mb-4">{title}</h1>

      <div className="mb-4">
        <h2 className="font-5xl justify-self-center font-bold">See Who Joined Around You</h2>
        <h2 className="font-xl justify-self-center ">By @cashlessman.eth</h2>
      </div>
      {/* <div>hello {context?.user.username}</div>
      <div>hello {context?.user.fid}</div> */}

      <div className="flex flex-col bg-[#3c3446] text-[#FFDEAD] rounded-xl">
      <div className="grid grid-cols-4 justify-self-center gap-3 m-2 mb-1">
      <div className="flex flex-col items-center justify-center">
                     <img
                         src={data?.data[0]?.pfp?.url || default_image_url}
                         className="w-15 aspect-square rounded-full border-4 border-[#FFFACD]"
                       />
              <span className="flex text-xs">{data?.data[0]?.fid ?? "N/A"}</span>
              <span className="flex text-sm">@{data?.data[0]?.username ?? "N/A"}</span>
              
                 {/* <a
    href={`https://warpcast.com/~/profiles/${data?.data[0]?.fid ?? ""}`}
    className="flex text-sm"
  >
    @{data?.data[0]?.username ?? "N/A"}
  </a> */}
            </div>
            <div className="flex flex-col items-center justify-center">
                     <img
                         src={data?.data[1]?.pfp?.url || default_image_url}
                         className="w-15 aspect-square rounded-full border-4 border-[#FFFACD]"
                       />
              <span className="flex text-xs">{data?.data[1]?.fid ?? "N/A"}</span>
              <span className="flex text-sm">@{data?.data[1]?.username ?? "N/A"}</span>
            </div>
  

            <div className="flex flex-col items-center justify-center">
                     <img
                         src={data?.data[2]?.pfp?.url || default_image_url}
                         className="w-15 aspect-square rounded-full border-4 border-[#FFFACD]"
                       />
              <span className="flex text-xs">{data?.data[2]?.fid ?? "N/A"}</span>
              <span className="flex text-sm">@{data?.data[2]?.username ?? "N/A"}</span>
            </div>

            <div className="flex flex-col items-center justify-center">
                     <img
                         src={data?.data[3]?.pfp?.url || default_image_url}
                         className="w-15 aspect-square rounded-full border-4 border-[#FFFACD]"
                       />
              <span className="flex text-xs">{data?.data[3]?.fid ?? "N/A"}</span>
              <span className="flex text-sm">@{data?.data[3]?.username ?? "N/A"}</span>
            </div>

            <div className="flex flex-col items-center justify-center">
                     <img
                         src={data?.data[4]?.pfp?.url || default_image_url}
                         className="w-15 aspect-square rounded-full border-4 border-[#FFFACD]"
                       />
              <span className="flex text-xs">{data?.data[4]?.fid ?? "N/A"}</span>
              <span className="flex text-xs">@{data?.data[4]?.username ?? "N/A"}</span>
            </div>

            <div className="flex flex-col items-center justify-center">
                     <img
                         src={data?.data[5]?.pfp?.url || default_image_url}
                         className="w-15 aspect-square rounded-full border-4 border-[#FFFACD]"
                       />
              <span className="flex text-xs">{data?.data[5]?.fid ?? "N/A"}</span>
              <span className="flex text-xs">@{data?.data[5]?.username ?? "N/A"}</span>
            </div>
            <div className="flex flex-col items-center justify-center">
                     <img
                         src={data?.data[6]?.pfp?.url || default_image_url}
                         className="w-15 aspect-square rounded-full border-4 border-[#FFFACD]"
                       />
              <span className="flex text-xs">{data?.data[6]?.fid ?? "N/A"}</span>
              <span className="flex text-xs">@{data?.data[6]?.username ?? "N/A"}</span>
            </div>
            <div className="flex flex-col items-center justify-center">
                     <img
                         src={data?.data[7]?.pfp?.url || default_image_url}
                         className="w-15 aspect-square rounded-full border-4 border-[#FFFACD]"
                       />
              <span className="flex text-xs">{data?.data[7]?.fid ?? "N/A"}</span>
              <span className="flex text-xs">@{data?.data[7]?.username ?? "N/A"}</span>
            </div>
            </div>
            {/* middle row */}
            <div className="grid grid-cols-3 justify-around gap-8 m-2 mb-0">
            <div className="flex flex-col items-center justify-center">
            <img
                         src={data?.data[8]?.pfp?.url || default_image_url}
                         className="w-15 aspect-square rounded-full border-4 border-[#FFFACD]"
                       />

               <span className="flex text-xs">{data?.data[8]?.fid ?? "N/A"}</span>
              <span className="flex text-xs">@{data?.data[8]?.username ?? "N/A"}</span>
            </div>
            <div className="flex flex-col items-center justify-center">
            <img
                         src={data?.data[9]?.pfp?.url || default_image_url}
                         className="w-15 aspect-square rounded-lg border-4 border-blue-500"
                       />
                  <span className="flex text-xs">{data?.data[9]?.fid ?? "N/A"}</span>
                  <span className="flex text-xs">@{data?.data[9]?.username ?? "N/A"}</span>

             </div>
            <div className="flex flex-col items-center justify-center">
            <img
                         src={data?.data[10]?.pfp?.url || default_image_url}
                         className="w-15 aspect-square rounded-full border-4 border-[#FFFACD]"
                       />

               <span className="flex text-xs">{data?.data[10]?.fid ?? "N/A"}</span>
              <span className="flex text-xs">@{data?.data[10]?.username ?? "N/A"}</span>
            </div>
            </div>
            <div className="grid grid-cols-4 justify-self-center gap-3 m-2">
      <div className="flex flex-col items-center justify-center">
                     <img
                         src={data?.data[11]?.pfp?.url || default_image_url}
                         className="w-15 aspect-square rounded-full border-4 border-[#FFFACD]"
                       />
              <span className="flex text-xs">{data?.data[11]?.fid ?? "N/A"}</span>
              <span className="flex text-xs">@{data?.data[11]?.username ?? "N/A"}</span>
            </div>
            <div className="flex flex-col items-center justify-center">
                     <img
                         src={data?.data[12]?.pfp?.url || default_image_url}
                         className="w-15 aspect-square rounded-full border-4 border-[#FFFACD]"
                       />
              <span className="flex text-xs">{data?.data[12]?.fid ?? "N/A"}</span>
              <span className="flex text-sm">@{data?.data[12]?.username ?? "N/A"}</span>
            </div>
  

            <div className="flex flex-col items-center justify-center">
                     <img
                         src={data?.data[13]?.pfp?.url || default_image_url}
                         className="w-15 aspect-square rounded-full border-4 border-[#FFFACD]"
                       />
              <span className="flex text-xs">{data?.data[13]?.fid ?? "N/A"}</span>
              <span className="flex text-sm">@{data?.data[13]?.username ?? "N/A"}</span>
            </div>

            <div className="flex flex-col items-center justify-center">
                     <img
                         src={data?.data[14]?.pfp?.url || default_image_url}
                         className="w-15 aspect-square rounded-full border-4 border-[#FFFACD]"
                       />
              <span className="flex text-xs">{data?.data[14]?.fid ?? "N/A"}</span>
              <span className="flex text-sm">@{data?.data[14]?.username ?? "N/A"}</span>
            </div>

            <div className="flex flex-col items-center justify-center">
                     <img
                         src={data?.data[15]?.pfp?.url || default_image_url}
                         className="w-15 aspect-square rounded-full border-4 border-[#FFFACD]"
                       />
              <span className="flex text-xs">{data?.data[15]?.fid ?? "N/A"}</span>
              <span className="flex text-xs">@{data?.data[15]?.username ?? "N/A"}</span>
            </div>

            <div className="flex flex-col items-center justify-center">
                     <img
                         src={data?.data[16]?.pfp?.url || default_image_url}
                         className="w-15 aspect-square rounded-full border-4 border-[#FFFACD]"
                       />
              <span className="flex text-xs">{data?.data[16]?.fid ?? "N/A"}</span>
              <span className="flex text-xs">@{data?.data[16]?.username ?? "N/A"}</span>
            </div>
            <div className="flex flex-col items-center justify-center">
                     <img
                         src={data?.data[17]?.pfp?.url || default_image_url}
                         className="w-15 aspect-square rounded-full border-4 border-[#FFFACD]"
                       />
              <span className="flex text-xs">{data?.data[17]?.fid ?? "N/A"}</span>
              <span className="flex text-xs">@{data?.data[17]?.username ?? "N/A"}</span>
            </div>
            <div className="flex flex-col items-center justify-center">
                     <img
                         src={data?.data[18]?.pfp?.url || default_image_url}
                         className="w-15 aspect-square rounded-full border-4 border-[#FFFACD]"
                       />
              <span className="flex text-xs">{data?.data[18]?.fid ?? "N/A"}</span>
              <span className="flex text-xs">@{data?.data[18]?.username ?? "N/A"}</span>
            </div>
            </div>
            </div>

            
      <div>

        {/* <div className="mb-4 mt-4">
          <Button onClick={openUrl}>Open Link</Button>
        </div>  */}

         {/* <div className="mb-4">

          <Button onClick={openWarpcastUrl}>Open Warpcast Link</Button>
        </div> */}

        <div className=" mt-5 mb-4">
 
          <Button onClick={close}>Close Frame</Button>
        </div>
        
      </div>
    </div>
  );
}


// const renderError = (error: Error | null) => {
//   if (!error) return null;
//   return <div className="text-red-500 text-xs mt-1">{error.message}</div>;
// };
