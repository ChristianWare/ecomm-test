import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { dbConnect } from "@/backend/config/dbConnect";
import Collection from "@/backend/models/collection";

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

    const { title, description, image } = await req.json();

    // Check if the collection already exists
    const existingCollection = await Collection.findOne({ title });
    if (existingCollection) {
      return new NextResponse("Collection already exists", { status: 400 });
    }

    // Validate required fields
    if (!title || !image) {
      return new NextResponse("Title and image are required", { status: 400 });
    }

    // Create a new collection
    const newCollection = new Collection({
      title,
      description,
      image,
    //   userId: token.sub, // Associate the collection with the user
    });

    await newCollection.save();

    return new NextResponse(JSON.stringify(newCollection), { status: 200 });
  } catch (err) {
    console.log("[collections_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
