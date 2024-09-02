/* eslint-disable @next/next/no-img-element */

import { BsGlobe2 } from "react-icons/bs";
import PayButton from "./payButton";
import PayField from "./payField";
import { BlinkForm } from "@/app/blink/create/page";

const BlinkPreview = ({ formData }: { formData: BlinkForm }) => {
  return (
    <div className="md:mx-20 bg-slate-200 dark:bg-slate-800 border-2 shadow-lg shadow-[#1d9bf0] border-[#1d9bf0] rounded-xl flex flex-col p-3">
      <img
        src={formData.image || "https://cdn-icons-png.flaticon.com/512/6021/6021967.png"}
        alt="gift"
        className={`h-4/5 bg-slate-600 dark:bg-slate-400 object-contain ${formData.image ? "" : "p-2"} rounded-lg`}
      />
      <div className="flex items-center gap-1 text-slate-400 text-xs my-2">
        <BsGlobe2 />
        <p>sault.io</p>
      </div>

      <h1 className="text-lg font-bold">{formData.title || "Title"}</h1>
      <p className="text-slate-400 text-sm">
        {formData.description ||
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut semperarcu. In sit amet magna pulvinar, mollis urna ac, aliquet metus."}
      </p>

      <div className="flex my-4 gap-2">
        {formData.checkPrice1 && <PayButton value={formData.price1}/>}
        {formData.checkPrice2 && <PayButton value={formData.price2}/>}
        {formData.checkPrice3 && <PayButton value={formData.price3}/>}
      </div>
      {formData.variablePrice && <PayField />}
    </div>
  );
};

export default BlinkPreview;
