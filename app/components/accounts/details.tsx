"use client";

import { useEffect, useState } from "react";
import { IoKeySharp } from "react-icons/io5";
import { TbReload } from "react-icons/tb";
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
import {
  Keypair,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

export default function AccountDetails({
  seed,
  idx,
}: {
  seed: string;
  idx: number;
}) {
  const [showPubKey, setShowPubKey] = useState<boolean>(false);
  const [copyPubKey, setCopyPubKey] = useState<boolean>(false);
  const [publicKey, setPublicKey] = useState<string | null>();
  const [solBalance, setSolBalance] = useState<number>(0);
  const [solPrice, setSolPrice] = useState<number>(0);
  const [accBalance, setAccBalance] = useState<number>(0);

  const { toast } = useToast();

  const getAccountMetaData = () => {
    setPublicKey("");
    const seedBuffer = mnemonicToSeedSync(seed);
    const path = `m/44'/501'/${idx}'/0'`;
    const derivedSeed = derivePath(path, seedBuffer.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const pubKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
    setPublicKey(pubKey);
  };

  const getLatestPriceAndBalance = async() => {
    try {
      const [balanceRes, priceRes] = await Promise.all([
        axios.get(`/api/account?publicKey=${publicKey}`),
        axios.get("/api/tokens"),
      ]);

      const newBalance = balanceRes.data.result.value / LAMPORTS_PER_SOL;
      setSolBalance(newBalance);
      setSolPrice(priceRes.data.data.SOL.price);
      setAccBalance(parseFloat((newBalance * priceRes.data.data.SOL.price).toFixed(2)));
    } catch (err) {
      console.log("Error while fetching balance or price", err);
      toast({
        title: "Error",
        description: "Failed to fetch balance or price",
        style: {
          backgroundColor: "red",
        },
      });
    }
  }

  const receiveSOL = async () => {
    if (publicKey) {
      try {
        await axios.post(`/api/account/requestSolAirDrop?publicKey=${publicKey}`);

        toast({
          title: "Transaction Status",
          description: "1 SOL added to your account. It might take some time to reflect in your account. Please refresh after some time.",
          style: {
            backgroundColor: "green",
          },
        });

        await getLatestPriceAndBalance();
      } catch (err) {
        console.log("Airdrop failed ", err);
        toast({
          title: "Transaction Status",
          description: "Airdrop failed",
          style: {
            backgroundColor: "red",
          },
        });
      }
    }

  };

  useEffect(() => {
    setSolBalance(0);
    setSolPrice(0);
    setAccBalance(0);
    getAccountMetaData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed, idx]);

  useEffect(() => {
if (publicKey) {
  getLatestPriceAndBalance();
}
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey]);

  const handleCopyPubKey = () => {
    setCopyPubKey(true);
    navigator.clipboard.writeText(publicKey || "");
  };

  //   To handle copy behaviour
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (copyPubKey) {
      timer = setTimeout(() => {
        setCopyPubKey(false);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [copyPubKey]);

  return (
    <div className="w-full p-6 px-2 md:p-6 flex flex-col bg-slate-200 dark:bg-slate-700 rounded-tr-xl max-h-[70vh] overflow-y-scroll">
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
        {publicKey?.slice(0, 4) + "...." + publicKey?.slice(publicKey.length - 4)}
      </div>

      <div className="flex justify-center items-center my-8 text-6xl font-semibold">
        $ {accBalance.toFixed(2)}
        <TbReload onClick={() => window.location.reload()} className="text-xl ml-2  dark:text-slate-300 dark:hover:text-white hover:cursor-pointer"/>
      </div>

      <div className="flex justify-between my-6 dark:text-gray-300">
        <div
            onClick={receiveSOL}
          className="flex flex-col bg-slate-400 dark:bg-slate-800 py-3 px-2 md:p-4 justify-center items-center rounded-2xl min-w-16 md:min-w-20 hover:cursor-pointer hover:bg-slate-500 dark:hover:bg-slate-900 transition-all"
        >
          <FaPlus className="md:text-2xl font-thin" />
          <p className="mt-2 text-xs md:text-sm font-light">Receive</p>
        </div>
        <div className="flex flex-col bg-slate-400 dark:bg-slate-800 py-3 px-2 md:p-4 justify-center items-center rounded-2xl min-w-16 md:min-w-20 hover:cursor-pointer hover:bg-slate-500 dark:hover:bg-slate-900 transition-all">
          <LuSend className="md:text-2xl font-thin" />
          <p className="mt-2 text-xs md:text-sm font-light">Send</p>
        </div>
        <div className="flex flex-col bg-slate-400 dark:bg-slate-800 py-3 px-2 md:p-4 justify-center items-center rounded-2xl min-w-16 md:min-w-20 hover:cursor-pointer hover:bg-slate-500 dark:hover:bg-slate-900 transition-all">
          <IoMdSwap className="md:text-2xl font-thin" />
          <p className="mt-2 text-xs md:text-sm font-light">Swap</p>
        </div>
        <div className="flex flex-col bg-slate-400 dark:bg-slate-800 py-3 px-2 md:p-4 justify-center items-center rounded-2xl min-w-16 md:min-w-20 hover:cursor-pointer hover:bg-slate-500 dark:hover:bg-slate-900 transition-all">
          <FaDollarSign className="md:text-2xl font-thin" />
          <p className="mt-2 text-xs md:text-sm font-light">Buy</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center p-4 bg-slate-300 dark:bg-slate-600 w-full rounded-xl mb-3">
          <Image
            src="https://s2.coinmarketcap.com/static/img/coins/200x200/5426.png"
            alt="Solana"
            width="100"
            height="100"
            className="size-12 rounded-full"
          />

          <div className="flex flex-col pl-4 flex-grow">
            <p className="text-xl font-semibold">Solana</p>
            <p className="dark:text-gray-300 text-sm">{solBalance} SOL</p>
          </div>

          <div className="flex flex-col pl-4">
            <p className="text-xl font-semibold text-end">
              ${(solPrice * solBalance).toFixed(2)}
            </p>
            <p className="dark:text-gray-300 text-sm text-end">
              ${solPrice.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-slate-300 dark:bg-slate-600 w-full rounded-xl mb-3">
          <Image
            src="https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png"
            alt="Solana"
            width="100"
            height="100"
            className="size-12 rounded-full"
          />

          <div className="flex flex-col pl-4 flex-grow">
            <p className="text-xl font-semibold">Ethereum</p>
            <p className="dark:text-gray-300 text-sm">0 ETH</p>
          </div>

          <div className="flex flex-col pl-4">
            <p className="text-xl font-semibold text-end">$0.00</p>
            <p className="dark:text-gray-300 text-sm text-end">$0.00</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-slate-300 dark:bg-slate-600 w-full rounded-xl mb-3">
          <Image
            src="https://s2.coinmarketcap.com/static/img/coins/200x200/1.png"
            alt="Solana"
            width="100"
            height="100"
            className="size-12 rounded-full"
          />

          <div className="flex flex-col pl-4 flex-grow">
            <p className="text-xl font-semibold">Bitcoin</p>
            <p className="dark:text-gray-300 text-sm">0 BTC</p>
          </div>

          <div className="flex flex-col pl-4">
            <p className="text-xl font-semibold text-end">$0.00</p>
            <p className="dark:text-gray-300 text-sm text-end">$0.00</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-slate-300 dark:bg-slate-600 w-full rounded-xl mb-3">
          <Image
            src="https://s2.coinmarketcap.com/static/img/coins/200x200/3408.png"
            alt="Solana"
            width="100"
            height="100"
            className="size-12 rounded-full"
          />

          <div className="flex flex-col pl-4 flex-grow">
            <p className="text-xl font-semibold">USDC</p>
            <p className="dark:text-gray-300 text-sm">0 USDC</p>
          </div>

          <div className="flex flex-col pl-4">
            <p className="text-xl font-semibold text-end">$0.00</p>
            <p className="dark:text-gray-300 text-sm text-end">$0.00</p>
          </div>
        </div>
      </div>
    </div>
  );
}
