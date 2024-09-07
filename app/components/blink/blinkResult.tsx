"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { BiSolidCheckCircle, BiSolidCopyAlt } from "react-icons/bi";
import { BsGlobe2 } from "react-icons/bs";
import Confetti from 'react-confetti'

const BlinkResult = ({
  blink,
  setBlink,
}: {
  blink: string;
  setBlink: (val: string | null) => void;
}) => {
  const [copyBlink, setCopyBlink] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (copyBlink) {
      timer = setTimeout(() => {
        setCopyBlink(false);
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [copyBlink]);

  const handleCopyPhrase = () => {
    setCopyBlink(true);
    navigator.clipboard.writeText(blink || "");
  };

  return (
    <div>
        <Confetti width={window.screen.width} height={window.screen.height} recycle={false} />
      <div className="border border-slate-400 rounded-xl w-1/2 mx-auto mt-8 py-6 px-4">
        <h1 className="text-xl font-semibold text-center">
          Congratulations 🎉 your Blink is generated!
        </h1>
        <div className="flex items-center w-full my-4">
          <Input value={blink} disabled className="w-4/5" />
          <Button
            className="dark:bg-gray-600 dark:text-white min-w-30 w-1/5"
            onClick={handleCopyPhrase}
          >
            {copyBlink ? (
              <>
                <BiSolidCheckCircle className="text-xl mr-2 text-green-400" />{" "}
                Copied
              </>
            ) : (
              <>
                <BiSolidCopyAlt className="text-xl mr-2" /> Copy
              </>
            )}
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="w-4/5 text-sm">
              You can test this Blink to check out how it looks and perform
              transaction
            </h1>
            <a
              href={`https://dial.to/devnet?action=solana-action:${encodeURIComponent(
                blink
              )}`}
              target="_blank"
              className="w-1/5"
            >
              <Button className="w-full font-bold">
                <BsGlobe2 className="text-xl mr-2" /> Test
              </Button>
            </a>
          </div>
          <div className="flex items-center justify-between gap-4">
            <h1 className="w-4/5 text-sm text-slate-400">
              You can create a new Blink
            </h1>
            <Button
              variant={"secondary"}
              className="w-1/5"
              onClick={() => setBlink(null)}
            >
              Create New
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlinkResult;
