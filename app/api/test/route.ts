import { NextResponse } from "next/server";
import client from "@/lib/redis";

export const GET = async () => {
  // Fetch data from Redis
  await client.set("serkan", "deneme");
  const result = await client.get("city:İstanbul");

  // Return the result in the response
  return new NextResponse(JSON.stringify({ result }), { status: 200 });
};
