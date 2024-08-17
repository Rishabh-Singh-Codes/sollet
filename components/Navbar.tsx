import { IoWallet } from "react-icons/io5";
import { ModeToggle } from "./ui/theme-toggle";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-center items-center">
        <div className="flex flex-grow justify-center">
          <Link href="/"><h1 className="text-center text-4xl font-extrabold flex pl-8">Sollet</h1></Link>
          <IoWallet className="text-4xl ml-4" />
        </div>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
