"use client";

import { useCallback, useEffect, useState } from "react";
import { IoKeySharp } from "react-icons/io5";
import {
  BiSolidCopyAlt,
  BiSolidCheckCircle,
  BiSolidHide,
} from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { IoMdSwap } from "react-icons/io";
import { FaDollarSign } from "react-icons/fa";
import Image from "next/image";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";

export default function AccountDetails({seed, idx}: {seed: string, idx: number}) {
  const [showPubKey, setShowPubKey] = useState<boolean>(false);
  const [copyPubKey, setCopyPubKey] = useState<boolean>(false);
  const [publicKey, showPublicKey] = useState<string>();

  const getAccountMetaData = useCallback(() => {
    console.log('seed', seed);
    const seedBuffer = mnemonicToSeedSync(seed);
    console.log('seedBuffer', seedBuffer);
    const path = `m/44'/501'/${idx}'/0'`;
    const derivedSeed = derivePath(path, seedBuffer.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const pubKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
    showPublicKey(pubKey);
  }, [seed, idx]);

  useEffect(() => {
    getAccountMetaData();
  }, [getAccountMetaData]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (copyPubKey) {
      timer = setTimeout(() => {
        setCopyPubKey(false);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [copyPubKey]);

  const handleCopyPubKey = () => {
    setCopyPubKey(true);
    navigator.clipboard.writeText(publicKey || "");
  };

  return (
    <div className="w-full p-6 flex flex-col bg-slate-700 rounded-tr-xl max-h-[70vh] overflow-y-scroll">
      <div className="text-sm font-bold text-center flex justify-center items-center">
        <div className="rounded-full bg-gray-300 size-6 flex justify-center items-center p-1 text-black mr-3">
          A{idx}
        </div>
        <p className="mr-3 text-2xl">Account {idx}</p>
        <div
          className="text-xl hover:cursor-pointer"
          onClick={() => setShowPubKey(!showPubKey)}
        >
          {showPubKey ? <BiSolidHide /> : <IoKeySharp />}
        </div>
      </div>

      <div
        className={`flex text-xs items-center justify-center mt-2 hover:cursor-pointer ${
          showPubKey ? "visible" : "invisible"
        }`}
        onClick={handleCopyPubKey}
      >
        {copyPubKey ? (
          <BiSolidCheckCircle className="mr-2 text-green-400" />
        ) : (
          <BiSolidCopyAlt className="mr-2" />
        )}
        {publicKey}
      </div>

      <div className="flex justify-center items-center my-8 text-6xl font-semibold">
        $ 0.00
      </div>

      <div className="flex justify-between my-6 text-gray-300">
        <div className="flex flex-col bg-slate-800 p-4 justify-center items-center rounded-2xl min-w-20 hover:cursor-pointer hover:bg-slate-900 transition-all">
          <FaPlus className="text-2xl font-thin" />
          <p className="mt-2 text-sm font-light">Receive</p>
        </div>
        <div className="flex flex-col bg-slate-800 p-4 justify-center items-center rounded-2xl min-w-20 hover:cursor-pointer hover:bg-slate-900 transition-all">
          <LuSend className="text-2xl font-thin" />
          <p className="mt-2 text-sm font-light">Send</p>
        </div>
        <div className="flex flex-col bg-slate-800 p-4 justify-center items-center rounded-2xl min-w-20 hover:cursor-pointer hover:bg-slate-900 transition-all">
          <IoMdSwap className="text-2xl font-thin" />
          <p className="mt-2 text-sm font-light">Swap</p>
        </div>
        <div className="flex flex-col bg-slate-800 p-4 justify-center items-center rounded-2xl min-w-20 hover:cursor-pointer hover:bg-slate-900 transition-all">
          <FaDollarSign className="text-2xl font-thin" />
          <p className="mt-2 text-sm font-light">Buy</p>
        </div>
      </div>


      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center p-4 bg-slate-600 w-full rounded-xl mb-3">
          <Image
            src="https://s2.coinmarketcap.com/static/img/coins/200x200/5426.png"
            alt="Solana"
            width="100"
            height="100"
            className="size-12 rounded-full"
          />

          <div className="flex flex-col pl-4 flex-grow">
            <p className="text-xl font-semibold">Solana</p>
            <p className="text-gray-300 text-sm">0 SOL</p>
          </div>

          <div className="flex flex-col pl-4">
            <p className="text-xl font-semibold text-end">$0.00</p>
            <p className="text-gray-300 text-sm text-end">$0.00</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-slate-600 w-full rounded-xl mb-3">
          <Image
            src="https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png"
            alt="Solana"
            width="100"
            height="100"
            className="size-12 rounded-full"
          />

          <div className="flex flex-col pl-4 flex-grow">
            <p className="text-xl font-semibold">Ethereum</p>
            <p className="text-gray-300 text-sm">0 ETH</p>
          </div>

          <div className="flex flex-col pl-4">
            <p className="text-xl font-semibold text-end">$0.00</p>
            <p className="text-gray-300 text-sm text-end">$0.00</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-slate-600 w-full rounded-xl mb-3">
          <Image
            src="https://s2.coinmarketcap.com/static/img/coins/200x200/1.png"
            alt="Solana"
            width="100"
            height="100"
            className="size-12 rounded-full"
          />

          <div className="flex flex-col pl-4 flex-grow">
            <p className="text-xl font-semibold">Bitcoin</p>
            <p className="text-gray-300 text-sm">0 BTC</p>
          </div>

          <div className="flex flex-col pl-4">
            <p className="text-xl font-semibold text-end">$0.00</p>
            <p className="text-gray-300 text-sm text-end">$0.00</p>
          </div>
        </div>     
        <div className="flex items-center p-4 bg-slate-600 w-full rounded-xl mb-3">
          <Image
            src="https://s2.coinmarketcap.com/static/img/coins/200x200/3408.png"
            alt="Solana"
            width="100"
            height="100"
            className="size-12 rounded-full"
          />

          <div className="flex flex-col pl-4 flex-grow">
            <p className="text-xl font-semibold">USDC</p>
            <p className="text-gray-300 text-sm">0 USDC</p>
          </div>

          <div className="flex flex-col pl-4">
            <p className="text-xl font-semibold text-end">$0.00</p>
            <p className="text-gray-300 text-sm text-end">$0.00</p>
          </div>
        </div>
      </div>

      

    </div>
  );
}
