import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { dbConnect } from "@/backend/config/dbConnect";
import Category from "@/backend/models/category";

export const GET = async (
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) => {
  try {
    await dbConnect();

    const category = await Category.findById(params.categoryId);

    if (!category) {
      return new NextResponse(
        JSON.stringify({ message: "Category not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(category, { status: 200 });
  } catch (err) {
    console.log("[categoryId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Check if the user is authenticated
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await dbConnect();
    let category = await Category.findById(params.categoryId);

    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }

    const { title, description } = await req.json();

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    category = await Category.findByIdAndUpdate(
      params.categoryId,
      { title, description },
      { new: true }
    );

    await category.save();

    return NextResponse.json(category, { status: 200 });
  } catch (err) {
    console.log("[categoryId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Check if the user is authenticated
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await dbConnect();

    await Category.findByIdAndDelete(params.categoryId);

    return new NextResponse("Category is deleted", { status: 200 });
  } catch (err) {
    console.log("[categoryId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};
