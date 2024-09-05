"use client";

import { BlinkForm } from "@/app/components/blink/blinkForm";
import BlinkPreview from "@/app/components/blink/blinkPreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { BiSolidCheckCircle, BiSolidCopyAlt } from "react-icons/bi";
import { BsGlobe2 } from "react-icons/bs";

export type BlinkForm = {
  title: string;
  description: string;
  publicKey: string;
  image?: string;
  price1?: number;
  price2?: number;
  price3?: number;
  checkPrice1: boolean;
  checkPrice2: boolean;
  checkPrice3: boolean;
  variablePrice: boolean;
};

const CreateBlink = () => {
  const [formData, setFormData] = useState<BlinkForm>({
    title: "",
    description: "",
    image: "",
    publicKey: "",
    price1: 0.1,
    price2: 0.2,
    price3: 0.3,
    checkPrice1: true,
    checkPrice2: true,
    checkPrice3: true,
    variablePrice: true,
  });
  const [blink, setBlink] = useState<string | null>();
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
    <div className="flex flex-col w-full gap-6 mb-6">
      {blink ? (
        <>
          <div className="border border-slate-400 rounded-xl w-1/2 mx-auto mt-8 py-6 px-4">
            <h1 className="text-xl font-semibold text-center">
              Congratulations 🎉  your Blink is generated!
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
                  href={`https://dial.to/devnet?action=solana-action:${encodeURIComponent(blink)}`}
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
        </>
      ) : (
        <>
          <h1 className="text-slate-400 text-center">
            Please provide Blink details and check out quick preview
          </h1>
          <div className="flex flex-col md:flex-row justify-between md:gap-10">
            <div className="flex flex-col md:w-1/2 border py-2 rounded-2xl md:px-6">
              <h1 className="font-bold text-xl mb-4 text-center">Details</h1>
              <BlinkForm
                formData={formData}
                setFormData={setFormData}
                setBlink={setBlink}
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2 border rounded-2xl h-fit pb-6">
              <h1 className="font-bold text-xl text-center w-full py-2">
                Preview
              </h1>
              <BlinkPreview formData={formData} />
              <h3 className="text-xs text-slate-400 md:mx-20 mt-8 text-center">
                This is just an illustration <br /> The actual Blink may look
                different depending on the platform
              </h3>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateBlink;

// https://dial.to/?action=solana-action%3Ahttp%3A%2F%2Flocalhost%3A3001%2Fapi%2Factions%2Fgift%3Ftitle%3DRishabh%26description%3DCoffee%26image%3Dhttps%3A%2F%2Fscience.nasa.gov%2Fwp-content%2Fuploads%2F2024%2F05%2Fsdo-x5pt8-flare-0122ut-may-11-2024-171-193-131.jpg%3Fw%3D4096%26format%3Djpeg%26price1%3D0.5%26price2%3D1%26variablePrice%3Dtrue&cluster=devnet
// http://localhost:3001/api/actions/gift?title=Rishabh&description=asdfas+fas+fdsd+af&publicKey=FiH5NYP3fr244YqvBy2RkyywvnJaYKHEYZsR7HhHwfcY&image=https:%2F%2Fscience.nasa.gov%2Fwp-content%2Fuploads%2F2024%2F05%2Fsdo-x5pt8-flare-0122ut-may-11-2024-171-193-131.jpg%3Fw%3D4096%26format%3Djpeg&price1=0.1&price2=0.2&price3=0.3&checkPrice1=true&checkPrice2=true&checkPrice3=true&variablePrice=true
// https://dial.to/?action=solana-action:http://localhost:3001/api/actions/gift?title=Rishabh&description=asdfas+fas+fdsd+af&publicKey=FiH5NYP3fr244YqvBy2RkyywvnJaYKHEYZsR7HhHwfcY&image=https:%2F%2Fscience.nasa.gov%2Fwp-content%2Fuploads%2F2024%2F05%2Fsdo-x5pt8-flare-0122ut-may-11-2024-171-193-131.jpg%3Fw%3D4096%26format%3Djpeg&price1=0.1&price2=0.2&price3=0.3&checkPrice1=true&checkPrice2=true&checkPrice3=true&variablePrice=true