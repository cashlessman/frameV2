import { Metadata } from "next";
import App from "./app";

const appUrl = process.env.NEXT_PUBLIC_URL;

const frame = {
  version: "next",
  imageUrl: `https://wrpcd.net/cdn-cgi/imagedelivery/BXluQx4ige9GuW0Ia56BHw/3846edf6-58ad-419b-0519-216a0e730c00/original`,
  button: {
    title: "Fame by @cashlessman.eth",
    action: {
      type: "launch_frame",
      name: "Frame v2 by @cashlessman.eth",
      url: appUrl,
      splashImageUrl: `https://wrpcd.net/cdn-cgi/image/fit=contain,f=auto,w=1200/https%3A%2F%2Fsupercast.mypinata.cloud%2Fipfs%2FQmerbDHWXkZ1f3UBvpbqnSrAHEgupqd2divk5j25vvCfaj%3Ffilename%3D3825D3F5-A2FA-4440-B545-1462A2B03705_1_105_c.jpeg`,
      splashBackgroundColor: "#CEA2FD",
    },
  },
};

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "V2 frame by @cashlessman.eth",
    openGraph: {
      title: "Frame by @cashlessman.eth",
      description: "testing",
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default function Home() {
  return (<App />);
}
