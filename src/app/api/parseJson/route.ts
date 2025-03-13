// src/app/api/parseJson/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { json } = await req.json(); // Extract JSON string from request
    const parsedResult = JSON.parse(json); // Parse JSON input

    return NextResponse.json(parsedResult, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON format", details: error.message },
      { status: 400 },
    );
  }
}
