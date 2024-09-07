"use client";

import { BlinkForm } from "@/app/components/blink/blinkForm";
import BlinkPreview from "@/app/components/blink/blinkPreview";
import BlinkResult from "@/app/components/blink/blinkResult";
import { useState } from "react";

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

  return (
    <div className="flex flex-col w-full gap-6 mb-6">
      {blink ? (
        <BlinkResult blink={blink} setBlink={setBlink} />
      ) : (
        <>
          <h1 className="text-slate-400 text-center">
            Please provide Blink details and check out quick preview
          </h1>
          <div className="flex flex-col md:flex-row justify-between gap-10">
            <div className="flex flex-col md:w-1/2 border py-2 rounded-2xl px-6">
              <h1 className="font-bold text-xl mb-4 text-center">Details</h1>
              <BlinkForm
                formData={formData}
                setFormData={setFormData}
                setBlink={setBlink}
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2 border rounded-2xl h-fit pb-6 px-6 md:px-0">
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
