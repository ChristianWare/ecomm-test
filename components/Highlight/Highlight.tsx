import styles from "./Highlight.module.css";

const Highlight = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};
export default Highlight;
