"use client";

import { IoWallet } from "react-icons/io5";
import { ModeToggle } from "./ui/theme-toggle";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const checkWalletCreation = () => {
    const phrase = sessionStorage.getItem("walletPhrase");

    if (phrase && phrase.length > 0) {
      router.push("/wallet/accounts");
    } else {
      router.push("/wallet");
    }
  };

  return (
    <div className="w-full mb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <h1 className="text-center text-4xl font-extrabold">Sault</h1>
          </Link>
          <IoWallet className="text-4xl ml-2" />
        </div>
        <div className="flex items-center gap-x-4">
          <Link
            href="/blink"
            className="text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
          >
            Blink
          </Link>
          <span
            onClick={checkWalletCreation}
            className="text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white hover:cursor-pointer"
          >
            Wallet
          </span>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
