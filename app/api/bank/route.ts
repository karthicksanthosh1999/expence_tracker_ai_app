import { PrismaClient } from "@/lib/generated/prisma"
import { NextRequest, NextResponse } from "next/server";

const PRISMA = new PrismaClient();

// CREATE BANK
export const POST = async(req:NextRequest, res:NextResponse) => {
    const {title, userId} = await req.json();
    try {
        const bank = await PRISMA.bank.create({
            data : {title, userId},
            include: {user: true}
        })
        return NextResponse.json({
            message:"Bank created successfully",
            status : 201,
            response: bank
        })
    } catch (error) {
        return NextResponse.json({
            message:"Expences post failed", 
            status: 500, 
            error
        })
    }
}

// GET SINGLE BANK
export const GET = async () => {
  try {
    const banks = await PRISMA.bank.findMany({
      include: { user: true },
    });

    return NextResponse.json({
      message: 'Banks fetched successfully',
      status: 200,
      response: banks,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error', error },
      { status: 500 }
    );
  }
};
