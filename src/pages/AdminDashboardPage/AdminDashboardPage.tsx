import { Button, Table } from "antd";

import { ColumnsType } from "antd/lib/table";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { useDeletePostMutation } from "./hooks/useDeletePostMutation";
import { useGetForumPostsQuery } from "../ForumPage/hooks/useGetPostsQuery";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useState } from "react";

export const AdminDashboardPage: React.FC = () => {
  const { data } = useGetForumPostsQuery();
  const mutation = useDeletePostMutation();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
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

  const onSelectRows = (selectedRowKeys: any[], selectedRows: any[]) => {
    setSelectedIds([...selectedRowKeys]);
  };

  const onDeleteClicked = () => {
    for (const id of selectedIds) {
      mutation.mutateAsync({ postId: id });
    }
  };

  return (
    <>
      <div className={styles.forumWrapper}>
        <div className={styles.forumHeader}>
          <h1>Admin dashboard</h1>
          <Button onClick={onDeleteClicked}>Delete selected</Button>
        </div>
        <Table
          rowSelection={{
            type: "checkbox",
            onChange: onSelectRows,
          }}
          dataSource={
            data?.data?.map((post: any) => ({
              ...post,
              key: post.forumPost,
            })) ?? []
          }
          className={styles.forumTable}
          columns={isMobile ? mobileColumns : columns}
          pagination={{ defaultPageSize: 5 }}
        />
      </div>
    </>
  );
};
