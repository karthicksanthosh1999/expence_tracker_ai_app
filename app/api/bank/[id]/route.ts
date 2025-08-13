import { routeHandlerFunction } from "@/lib/error-handler";
import { PrismaClient } from "@/lib/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const PRISMA = new PrismaClient();

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: number } }
) => {
  try {
    const singleBank = await PRISMA.bank.findUnique({
      where: { id: params.id },
      include: { user: true },
    });

    if (!singleBank) {
      return routeHandlerFunction("Bank is not found!");
    }

    return NextResponse.json({
      message: "Bank fetched successfully",
      status: 200,
      response: singleBank,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: number } }
) => {
  const { title, userId } = await req.json();
  try {
    if (!params.id) {
      return routeHandlerFunction("Id is required!");
    }
    const bank = await PRISMA.bank.update({
      where: { id: params.id },
      data: { title, userId },
    });
    return NextResponse.json(
      {
        message: "Bank Updated Successfully",
        response: bank,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: number } }
) => {
  try {
    if (!params.id) {
      return routeHandlerFunction("Id is required!");
    }
    const bank = await PRISMA.bank.delete({
      where: { id: params.id },
    });
    if (!bank) {
      return routeHandlerFunction("Bank is not found");
    }
    return NextResponse.json(
      {
        message: "Bank Deleted Successfully",
        response: bank,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
};
