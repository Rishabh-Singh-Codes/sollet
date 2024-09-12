"use client";

import { Button } from "@/components/ui/button";
import { GoAlertFill } from "react-icons/go";
import {
  BiShow,
  BiSolidHide,
  BiSolidCopyAlt,
  BiSolidCheckCircle,
} from "react-icons/bi";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { generateMnemonic } from "bip39";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const Wallet = () => {
  const [showPhrase, setShowPhrase] = useState<boolean>(false);
  const [copyPhrase, setCopyPhrase] = useState<boolean>(false);
  const [showDisclaimer, setShowDisclaimer] = useState<boolean>(false);
  const [disclaimerChecked, setDisclaimerChecked] = useState<boolean>(false);
  const [viewAccountEnabled, setViewAccountEnabled] = useState<boolean>(true);
  const [mnemonicWords, setMnemonicWords] = useState<string | null>();

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (copyPhrase) {
      timer = setTimeout(() => {
        setCopyPhrase(false);
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [copyPhrase]);

  const handleCopyPhrase = () => {
    setCopyPhrase(true);
    navigator.clipboard.writeText(mnemonicWords || "");
  };

  const handleViewAccountClick = () => {
    if (!showDisclaimer) {
      setShowDisclaimer(true);
      setViewAccountEnabled(false);
    }

    if (showDisclaimer && disclaimerChecked && viewAccountEnabled) {
      if (mnemonicWords) {
        router.push("/wallet/accounts");
        sessionStorage.setItem("walletPhrase", mnemonicWords);
        toast({
          title: "Wallet Status",
          description: "New Account created!",
          style: {
            backgroundColor: "green",
          },
        });
      }
    }
  };

  useEffect(() => {
    if (showDisclaimer) {
      setViewAccountEnabled(disclaimerChecked);
    }
  }, [disclaimerChecked, showDisclaimer]);

  useEffect(() => {
    const words = generateMnemonic();
    setMnemonicWords(words);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-2/3 md:mx-auto">
      <h1 className="mb-2 text-xl font-semibold">New Wallet Created</h1>
      <div>
        <h2 className="text-center text-sm text-gray-400">
          A new Wallet with seed phrase has been created.
        </h2>
        <h2 className="text-center text-sm text-gray-400">
          You can use this single wallet to create multiple accounts.
        </h2>
        <div className="flex items-center mx-auto w-2/3">
          <GoAlertFill className="text-8xl mx-2 dark:text-yellow-300 text-yellow-500" />
          <h2 className="text-xs font-semibold text-gray-400 flex-grow">
            Note down this secret seed phrase and keep it safe. Don&apos;t share
            this with anybody. We won&apos;t be able to recover accounts without
            this seed phrase.
          </h2>
        </div>
      </div>

      <div className="w-2/3 p-2 rounded-xl bg-gray-800 mt-8 grid grid-cols-3 min-h-60">
        {mnemonicWords?.split(" ").map((word, idx) => (
          <div
            key={idx}
            className="inline bg-gray-600 px-4 py-2 m-2 rounded-lg text-sm text-gray-400"
          >
            {idx + 1}.{" "}
            <span
              className={`dark:text-white text-center min-w-full ${
                !showPhrase && "blur-sm"
              }`}
            >
              {word}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-around w-2/3 mt-6">
        <Button
          className="dark:bg-gray-600 dark:text-white min-w-40"
          onClick={() => setShowPhrase(!showPhrase)}
          size="sm"
        >
          {showPhrase ? (
            <>
              <BiSolidHide className="text-xl mr-2" /> Hide Phrase
            </>
          ) : (
            <>
              <BiShow className="text-xl mr-2 text-rose-500" /> Show Phrase
            </>
          )}
        </Button>
        <Button
          className="dark:bg-gray-600 dark:text-white min-w-40"
          onClick={handleCopyPhrase}
        >
          {copyPhrase ? (
            <>
              <BiSolidCheckCircle className="text-xl mr-2 text-green-400" /> Copied
            </>
          ) : (
            <>
              <BiSolidCopyAlt className="text-xl mr-2" /> Copy Phrase
            </>
          )}
        </Button>
      </div>

      <div className="flex flex-col mt-8">
        {showDisclaimer && (
          <div className="flex items-center mb-4">
            <Checkbox
              checked={disclaimerChecked}
              onClick={() => setDisclaimerChecked(!disclaimerChecked)}
            />
            <p className="ml-2 text-sm text-gray-300">
              I&apos;ve read & noted the seed phrase and am ready to proceed.
            </p>
          </div>
        )}
        <div className="flex justify-center">
          <Button
            size="sm"
            onClick={handleViewAccountClick}
            disabled={!viewAccountEnabled}
          >
            View Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
