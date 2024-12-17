import { Metadata } from "next";
import App from "./app";

const appUrl = process.env.NEXT_PUBLIC_URL;

const frame = {
  version: "next",
imageUrl: `https://github.com/jpfraneto/images/blob/main/banner-2-anky.png?raw=true`,  button: {
    title: "Frame v2 by @cashlessman.eth",
    action: {
      type: "launch_frame",
      name: "SEE",
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
