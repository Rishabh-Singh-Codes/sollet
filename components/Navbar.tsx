import { IoWallet } from "react-icons/io5";
import { ModeToggle } from "./ui/theme-toggle";
import Link from "next/link";

const Navbar = () => {
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
          <Link href="/blink" className="text-slate-400 hover:text-black dark:hover:text-white">
            Blink
          </Link>
          <Link href="/wallet" className="text-slate-400 hover:text-black dark:hover:text-white">
            Wallet
          </Link>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
