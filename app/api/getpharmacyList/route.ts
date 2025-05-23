import { getCityList } from "@/Services";
import { NextResponse } from "next/server";

export async function GET() {
  await getCityList();
  return NextResponse.json({ message: "success" }, { status: 200 });
}
