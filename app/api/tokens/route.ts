import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

let LAST_UPDATED_AT: number | null = null;

const PRICE_REFRESH_RATE = 1 * 60 * 1000; // 1 min

let LAST_FETCHED_DATA: any = null;

export async function GET(req: NextRequest) {
    const currTime = new Date().getTime();

    if (!LAST_UPDATED_AT || currTime - LAST_UPDATED_AT >= PRICE_REFRESH_RATE) {
        try {
          const response = await axios.get("https://price.jup.ag/v6/price?ids=SOL");
    
          LAST_UPDATED_AT = currTime;
          LAST_FETCHED_DATA = response.data;
    
          return NextResponse.json(response.data);
        } catch (error) {
          console.log("error in fetching latest price", error);
          return NextResponse.error(); 
        }
      } else {
        return NextResponse.json(LAST_FETCHED_DATA);
      }
}