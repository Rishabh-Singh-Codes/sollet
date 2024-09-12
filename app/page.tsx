/* eslint-disable @next/next/no-img-element */

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RiTwitterXFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

export default function Home() {
  return (
    <main className="flex flex-col items-center md:px-24 py-16">
      <h1 className="text-5xl font-bold text-center">
        Create your Blink and accept crypto gifts in your personal wallet
      </h1>
      <p className="mt-10 text-center text-base md:text-xl font-normal text-slate-500 dark:text-slate-300 max-w-md mx-auto">
        Unlock the power of <span className="text-[#9945FF]">Solana</span>{" "}
        <span className="text-[#14F195]">Blink</span> for yourself and accept
        crypto gifts in your personal wallet.
      </p>

      <p className="mt-8 text-start text-base md:textlg font-normal text-neutral-500 dark:text-neutral-200 max-w-md mx-auto">
        Accept gifts from any platform
      </p>
      <div className="flex justify-between mt-2 items-center mx-auto">
        <RiTwitterXFill className="text-5xl text-gray-400 dark:hover:text-gray-600 mr-6" />
        <FaYoutube className="text-5xl text-gray-400 dark:hover:text-gray-600 mr-6" />
        <FaInstagram className="text-5xl text-gray-400 dark:hover:text-gray-600" />
      </div>

      <p className="mt-6 text-start text-base md:textlg font-normal text-neutral-500 dark:text-neutral-200 max-w-md mx-auto">
        Accept gifts in any wallet
      </p>
      <div className="flex justify-between mt-2">
        <img
          className="size-12 mr-6 grayscale hover:grayscale-0 rounded-md"
          src="https://187760183-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-MVOiF6Zqit57q_hxJYp%2Fuploads%2FHEjleywo9QOnfYebBPCZ%2FPhantom_SVG_Icon.svg?alt=media&token=71b80a0a-def7-4f98-ae70-5e0843fdaaec"
          alt="phantom"
        />
        <img
          className="size-12 mr-6 grayscale hover:grayscale-0 rounded-md"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJZaVpfhv3kgZA46GoqfVNIFhR6pXIdX4_Rg&s"
          alt="metamask"
        />
        <img
          className="size-12 grayscale hover:grayscale-0 rounded-md"
          src="https://play-lh.googleusercontent.com/EhgMPJGUYrA7-8PNfOdZgVGzxrOw4toX8tQXv-YzIvN6sAMYFunQ55MVo2SS_hLiNm8"
          alt="backpack"
        />
      </div>
      <div className="flex gap-6 mt-10">
        <Link href="/wallet">
          <Button variant={"secondary"}>Create Wallet</Button>
        </Link>
        <Link href="/blink">
          <Button className="font-bold">Create Blink</Button>
        </Link>
      </div>

      <div className="mt-12 flex items-center gap-4">
        <a href="https://www.youtube.com/watch?v=yiZxD1G__sI" target="_blank">
          <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            Watch the Demo
            <FaYoutube className="text-3xl ml-4 text-red-500 " />
          </button>
        </a>
      </div>
    </main>
  );
}
