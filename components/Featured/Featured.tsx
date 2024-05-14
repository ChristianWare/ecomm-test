
import { IRoom } from "../../backend/models/room";
import ContentPadding from "../ContentPadding/ContentPadding";
import LayoutWrapper from "../LayoutWrapper/LayoutWrapper";
import PropPreview from "../PropPreview/PropPreview";
import styles from "./Featured.module.css";

interface Props {
  data: {
    success: boolean;
    resPerPage: number;
    filteredRoomsCount: number;
    rooms: IRoom[];
  };
}

const Featured = ({ data }: Props) => {
  const { rooms } = data;

  return (
    <LayoutWrapper>
      <ContentPadding>
        <section className={styles.content}>
          <div className={styles.top}>
            <h2 className={styles.heading}>Featured</h2>
          </div>
          <div className={styles.bottom}>
            <div className='row mt-4'>
              {rooms?.length === 0 ? (
                <div className='alret alret-danger mt-5 w-100'>
                  <b>No Rooms.</b>
                </div>
              ) : (
                rooms
                  ?.slice(0, 2)
                  .map((room) => <PropPreview key={room._id} room={room} />)
              )}
            </div>
          </div>
        </section>
      </ContentPadding>
    </LayoutWrapper>
  );
};
export default Featured;
