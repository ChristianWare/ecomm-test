import ContentPadding from "../../components/ContentPadding/ContentPadding";
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
      </ContentPadding>
    </LayoutWrapper>
  );
};

export default AdminLayout;
