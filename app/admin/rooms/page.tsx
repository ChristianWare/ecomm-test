import Error from "../../error";
import AllRooms from "../../../components/admin/AllRooms";
import { getAuthHeader } from "../../../helpers/authHeaders";

export const metadata = {
  title: "All Rooms - Admin || BookIT",
  description: "This is the description for the home page of this application.",
};

const getRooms = async () => {
  const authHeaders = getAuthHeader();

  const res = await fetch(`${process.env.API_URL}/api/admin/rooms`, {
    headers: authHeaders.headers,
  });
  return res.json();
};

export default async function AdminRoomsPage() {
  const data = await getRooms();

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return (
    <div className='container'>
      <AllRooms data={data} />
    </div>
  );
}
