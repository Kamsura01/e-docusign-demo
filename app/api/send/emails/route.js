import { NextResponse } from "next/server";

export async function GET() {
  try {

    return NextResponse.json({ message: "test" }, { status: 201 });
  } catch (error) {

    return NextResponse.json({ message: error }, { status: 500 });
  }
}