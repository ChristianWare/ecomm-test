import { dbConnect } from "../../../backend/config/dbConnect";
import { newBooking } from "../../../backend/controllers/bookingControllers";
import { isAuthenticatedUser } from "../../../backend/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {
  params: {
    id: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser).post(newBooking);

export async function POST(
  request: NextRequest,
  ctx: RequestContext
): Promise<Response> {
  return router.run(request, ctx) as Promise<Response>;
}
