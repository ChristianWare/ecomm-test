import ContentPadding from "../ContentPadding/ContentPadding";
import styles from "./C1.module.css";
import LayoutWrapper from "../LayoutWrapper/LayoutWrapper";
import ImageGridii from "../ImageGridii/ImageGridii";

const C1 = () => {
  return (
    <div className={styles.bgColor}>
      <LayoutWrapper>
        <ContentPadding>
          <div className={styles.content}>
            <div className={styles.top}>
              <h2 className={styles.heading}>Features Of Our Properties</h2>
            </div>
          </div>
          <ImageGridii />
        </ContentPadding>
      </LayoutWrapper>
    </div>
  );
};
export default C1;
