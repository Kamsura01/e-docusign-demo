import { NextResponse } from "next/server";
import executeQuery from "@/lib/MySQLConnect";

export async function GET() {
  try {
    const query = `SELECT * FROM datacenter.user_member m WHERE m.D_CANCEL IS NULL`;
    const member = await executeQuery(query, []);
    return NextResponse.json(member);
    
  } catch (error) {
    return NextResponse.json({ message: "Error sql execute query!" }, { status: 500 });
  }
}
