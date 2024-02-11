import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/Db"
import { NextApiRequest } from "next";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
	const { id } = params;
	try {
		const data = await prisma.userHistory.delete({
			where: {
				id: id
			}
		})
		return NextResponse.json(data, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ message: "something went wrong", err: error.message }, { status: 500 })
	}
}
