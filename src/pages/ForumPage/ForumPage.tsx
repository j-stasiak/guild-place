import { Button, Table } from "antd";

import { ColumnsType } from "antd/lib/table";
import { Link } from "react-router-dom";
import { NewPostModal } from "./NewPostModal";
import styles from "./styles.module.scss";
import { useGetForumPostsQuery } from "./hooks/useGetPostsQuery";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useState } from "react";

export const ForumPage: React.FC = () => {
  const [isNewPostModalOpen, setNewPostModalOpen] = useState<boolean>(false);
  const { data } = useGetForumPostsQuery();
  const [isMobile] = useIsMobile();

  const columns: ColumnsType<any> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (value, record) => (
        <Link to={`/forum/${record.forumPost}`}>{value}</Link>
      ),
    },
    {
      title: "Author",
      dataIndex: ["author", "email"],
      key: "author",
    },
    {
      title: "Creation date",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Last activity",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
  ];

  const mobileColumns: ColumnsType<any> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (value, record) => (
        <Link to={`/forum/${record.forumPost}`}>{value}</Link>
      ),
    },
    {
      title: "Author",
      dataIndex: ["author", "email"],
      key: "author",
    },
  ];
  return (
    <>
      <div className={styles.forumWrapper}>
        <div className={styles.forumHeader}>
          <h1>Forum</h1>
          <Button onClick={() => setNewPostModalOpen(true)}>+ Add post</Button>
        </div>
        <Table
          dataSource={data?.data ?? []}
          className={styles.forumTable}
          columns={isMobile ? mobileColumns : columns}
          pagination={{ defaultPageSize: 5 }}
        />
      </div>
      <NewPostModal
        visible={isNewPostModalOpen}
        onClose={() => setNewPostModalOpen(false)}
      />
    </>
  );
};
