import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { dbConnect } from "@/backend/config/dbConnect";
import Category from "@/backend/models/category";

export const POST = async (req: NextRequest) => {
  try {
    // Connect to the database
    await dbConnect();

    // Get the token from the request
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Check if the user is authenticated
    if (!token) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { title, description } = await req.json();

    // Check if the category already exists
    const existingCategory = await Category.findOne({ title });
    if (existingCategory) {
      return new NextResponse(
        JSON.stringify({ error: "Category with that name already exists" }),
        { status: 400 }
      );
    }

    // Validate required fields
    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    // Create a new category
    const newCategory = new Category({
      title,
      description,
    });

    await newCategory.save();

    return new NextResponse(JSON.stringify(newCategory), { status: 200 });
  } catch (err) {
    console.log("[categories_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await dbConnect();

    const categories = await Category.find().sort({
      createdAt: "desc",
    });
    return NextResponse.json(categories, { status: 200 });
  } catch (err) {
    console.log("[categories_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
