import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const todo = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });

    if (!todo) {
      return NextResponse.json(
        { success: false, error: "Todo not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: todo }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch todo" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, completed } = body;

    const existingTodo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!existingTodo) {
      return NextResponse.json(
        { success: false, error: "Todo not found" },
        { status: 404 },
      );
    }

    const todo = await prisma.todo.update({
      where: { id },
      data: {
        ...(typeof title === "string" ? { title } : {}),
        ...(typeof completed === "boolean" ? { completed } : {}),
      },
    });

    return NextResponse.json({ success: true, data: todo }, { status: 200 });
  } catch (error) {
    console.error("Failed to update todo", error);
    return NextResponse.json(
      { success: false, error: "Failed to update todo" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const result = await prisma.todo.deleteMany({
      where: { id },
    });

    if (result.count === 0) {
      return NextResponse.json(
        { success: false, error: "Todo not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete todo", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete todo" },
      { status: 500 },
    );
  }
}
