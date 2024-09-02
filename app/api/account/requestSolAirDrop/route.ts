import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pubKey = searchParams.get("publicKey");

  try {
    const response = await axios.post(
      process.env.ALCHEMY_API ?? "",
      {
        jsonrpc: "2.0",
        id: 1,
        method: "requestAirdrop",
        params: [pubKey, 1000000000],
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
