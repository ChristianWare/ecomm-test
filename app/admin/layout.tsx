import ContentPadding from "../../components/ContentPadding/ContentPadding";
import FinalCTA1 from "../../components/FinalCTA1/FinalCTA1";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import AdminSidebar from "../../components/layout/AdminSidebar";
import { ReactNode } from "react";
import styles from "./AdminLayoutStyles.module.css";

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <LayoutWrapper>
      <ContentPadding>
        <div>
          <h1 className={styles.heading}>Admin Dashboard</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.left}>
            <AdminSidebar />
          </div>
          <div className={styles.right}>{children}</div>
        </div>
        <FinalCTA1 />
      </ContentPadding>
    </LayoutWrapper>
  );
};

export default AdminLayout;
