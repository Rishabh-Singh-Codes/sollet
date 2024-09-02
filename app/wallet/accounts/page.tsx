"use client";

import { useEffect, useState } from "react";
import { BiSolidDollarCircle } from "react-icons/bi";
import { IoGrid } from "react-icons/io5";
import { IoMdSwap } from "react-icons/io";
import { BsLightningChargeFill } from "react-icons/bs";
import { TbWorld } from "react-icons/tb";
import { BiPlusCircle } from "react-icons/bi";
import AccountDetails from "../../components/accounts/details";

const Accounts = () => {
  const [seed, setSeed] = useState<string>();
  const [totalWallets, setTotalWallets] = useState<number>(1);
  const [currAccountIdx, setCurrAccountIdx] = useState<number>(1);

  useEffect(() => {
    const storedTotalAccounts =
      Number(sessionStorage.getItem("totalAccounts")) || 1;
    const storedSeed = sessionStorage.getItem("walletPhrase");

    const currAccIdx = Number(sessionStorage.getItem("currAccountIdx")) || 1;

    setTotalWallets(storedTotalAccounts);
    setCurrAccountIdx(currAccIdx);
    setSeed(storedSeed || "");
  }, []);

  const handleAccountChange = (index: number) => {
    const accNo = index+1;
    setCurrAccountIdx(accNo);
    sessionStorage.setItem("currAccountIdx", String(accNo));
  }
  return (
    <div className="w-1/2 border flex mx-auto h-[80vh] rounded-2xl">
      <div className="flex flex-col w-full">
        <div className="flex flex-grow">
          <div className="max-w-[20%] px-3 border-r pt-4 py-4 flex flex-col items-center">
            <BiPlusCircle
              className="text-6xl border-b-4 pb-2 mb-4 hover:cursor-pointer"
              onClick={() => {
                setTotalWallets(totalWallets + 1);
                sessionStorage.setItem(
                  "totalAccounts",
                  String(totalWallets + 1)
                );
              }}
            />
            {Array.from({ length: totalWallets }, (_, index) => (
              <div className="mb-4 hover:cursor-pointer" key={index}>
                <div
                  key={index}
                  className={` ${
                    currAccountIdx === index + 1 ? "bg-white" : "bg-slate-400"
                  } rounded-full w-12 h-12 flex justify-center items-center mx-auto text-black text-xl font-bold mb-2`}
                  onClick={() => handleAccountChange(index)}
                >
                  {`A${index + 1}`}
                </div>
                <div className="text-xs font-thin -mt-2">
                  Account {index + 1}
                </div>
              </div>
            ))}
          </div>

          <div className="flex-grow">
            {seed && <AccountDetails seed={seed} idx={currAccountIdx} />}
          </div>
        </div>
        <div className="bg-gray-700 p-4 w-full flex justify-around items-center rounded-b-2xl min-h-[10vh] border-t-[1px] border-black">
          <BiSolidDollarCircle className="text-4xl hover:cursor-pointer" />
          <IoGrid className="text-3xl text-gray-400 hover:cursor-pointer" />
          <IoMdSwap className="text-3xl text-gray-400 hover:cursor-pointer" />
          <BsLightningChargeFill className="text-3xl text-gray-400 hover:cursor-pointer" />
          <TbWorld className="text-3xl text-gray-400 hover:cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Accounts;
