import { Button } from "@/components/ui/button";
import Link from "next/link";

const Blink = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex flex-col">
          <p className="font-bold text-xl">
            Blink into the future with Solana Blinks
          </p>
          <p className="mt-4 text-gray-400">
            Simple, shareable links that bring blockchain transactions to your
            favorite websites and apps, turning the internet into your gateway
            to Web3.
          </p>
          <p className="font-semibold mt-4">
            Effortless, secure, and everywhere you are!
          </p>
        </div>
        <div className="border-2 shadow-lg shadow-[#1d9bf0] border-[#1d9bf0] rounded-xl pointer-events-none overflow-clip">
          <iframe
            className="aspect-video md:h-[35vh]"
            src="https://www.youtube.com/embed/m_feBl0ROik?autoplay=1&mute=1&rel=0&controls=0&loop=1&playlist=m_feBl0ROik&end=50"
            title="Solana Blinks"
            allow="autoplay*; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="flex flex-col mt-20 text-center w-full items-center">
        <h1 className="text-2xl font-bold">Let`&apos;s create your Blink</h1>
        <h3 className="text-sm font-semibold mt-2 text-gray-400">
          To create your own Blink, you need a crypto Wallet
        </h3>
        <h3 className="text-sm font-semibold text-gray-400">
          Do you have a Crypto wallet?
        </h3>
        <div className="flex justify-around md:w-1/2 mt-8">
          <Link href="/wallet">
            <Button variant={"secondary"}>No, create a wallet</Button>
          </Link>
          <Link href="/blink/create">
            <Button className="font-bold">Yes, I have a wallet</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Blink;
