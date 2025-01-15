import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    return NextResponse.json(
      { message: "Branch Datas" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "An error Login!" }, { status: 500 });
  }
}
