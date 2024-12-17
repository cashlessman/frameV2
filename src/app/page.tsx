import { Metadata } from "next";
import App from "./app";

const appUrl = `https://around-v2.vercel.app/`;

const frame = {
  version: "next",
  imageUrl: `https://wrpcd.net/cdn-cgi/imagedelivery/BXluQx4ige9GuW0Ia56BHw/4511bc5d-4be0-46ac-6a45-1bd5ebb47c00/original`,
  button: {
    title: "Fame by @cashlessman.eth",
    action: {
      type: "launch_frame",
      name: "Frame v2 by @cashlessman.eth",
      url: appUrl,
      splashImageUrl: `https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/a74b030e-2d92-405c-c2d0-1696f5d51d00/original`,
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
