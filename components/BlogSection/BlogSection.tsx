import BlogPreview from "../BlogPreview/BlogPreview";
import ContentPadding from "../ContentPadding/ContentPadding";
import LayoutWrapper from "../LayoutWrapper/LayoutWrapper";
import styles from "./BlogSection.module.css";
import { FC } from "react";
import { BlogSectionProps, BlogData } from "../../lib/interface";
import Button from "../Button/Button";

const BlogSection: FC<BlogSectionProps> = ({ blogData }) => {
  return (
    <LayoutWrapper>
      <ContentPadding>
        <h2 className={styles.heading}>Our Blog</h2>
        <div className={styles.bottom}>
          {blogData.map((x: BlogData, index: number) => (
            <BlogPreview key={index} mapData={x} />
          ))}
        </div>
      </ContentPadding>
    </LayoutWrapper>
  );
};
export default BlogSection;
