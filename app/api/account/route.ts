// import { NextRequest, NextResponse } from "next/server";
// import axios from "axios";

// let LAST_UPDATED_AT: number | null = null;

// const PRICE_REFRESH_RATE = 1 * 60 * 1000; // 1 min

// let LAST_FETCHED_DATA: any = null;

// export async function GET(req: NextRequest) {
//   const currTime = new Date().getTime();
//   const { searchParams } = new URL(req.url);
//   const pubKey = searchParams.get("publicKey");
//   const callApiNow = searchParams.get("callApiNow");

//   console.log('callApiNow', callApiNow)

//   if(callApiNow == "true") {
//     return await getAccountSolBalance(pubKey || "", currTime);
//   } else if (!LAST_UPDATED_AT || currTime - LAST_UPDATED_AT >= PRICE_REFRESH_RATE) {
//     return await getAccountSolBalance(pubKey || "", currTime);
//   } else {
//     return NextResponse.json(LAST_FETCHED_DATA);
//   }
// }

// const getAccountSolBalance = async (pubKey: string, currTime: number) => {

//   try {
//     const response = await axios.post(
//       process.env.ALCHEMY_API ?? "",
//       {
//         id: 1,
//         jsonrpc: "2.0",
//         method: "getBalance",
//         params: [
//           pubKey,
//           {
//             commitment: "finalized",
//           },
//         ],
//       },
//       {
//         headers: {
//           accept: "application/json",
//           "content-type": "application/json",
//         },
//       }
//     );

//     LAST_UPDATED_AT = currTime;
//     LAST_FETCHED_DATA = response.data;

//     return NextResponse.json(response.data);
//   } catch (error) {
//     console.log("error in fetching latest price", error);
//     return NextResponse.error();
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pubKey = searchParams.get("publicKey");

  try {
    const response = await axios.post(
      process.env.ALCHEMY_API ?? "",
      {
        id: 1,
        jsonrpc: "2.0",
        method: "getBalance",
        params: [
          pubKey,
          {
            commitment: "finalized",
          },
        ],
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.log("error in fetching latest price", error);
    return NextResponse.error();
  }
}
