import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/Db"
export async function POST(req: NextRequest, res: NextResponse) {
	try {
		const body = await req.json();
		const { url,
			method,
			headers,
			params, data
		} = body;

		const datas = await prisma.userHistory.create({
			data: {
				url, method, headers, params, data
			}
		})
		return NextResponse.json(datas, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ message: "something went wrong", err: error.message }, { status: 500 })
	}
}

export async function GET(req: Request) {
	try {
		const data = await prisma.userHistory.findMany({
			take: 8,
			orderBy: { timeStamp: 'desc' },
		});
		return NextResponse.json(data, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ message: "something went wrong", err: error.message }, { status: 500 })

	}
}