import ContentPadding from "../../components/ContentPadding/ContentPadding";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import { ReactNode } from "react";
import styles from "./AdminLayoutStyles.module.css";
import LeftSidebar from "@/components/LeftSideBar/LeftSideBar";

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <LayoutWrapper>
      <ContentPadding>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftSidebar />
          </div>
          <div className={styles.right}>{children}</div>
        </div>
      </ContentPadding>
    </LayoutWrapper>
  );
};

export default AdminLayout;
