import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { dbConnect } from "@/backend/config/dbConnect";
import Collection from "@/backend/models/collection";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Check if the user is authenticated
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await dbConnect();

    await Collection.findByIdAndDelete(params.collectionId);
    return new NextResponse("Collection is deleted", { status: 200 });
  } catch (err) {
    console.log("[collectionId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};
