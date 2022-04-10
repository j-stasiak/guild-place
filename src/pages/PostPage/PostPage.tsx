import { Button, Form, Input, Spin } from "antd";

import { AuthenticationContext } from "../../AuthenticationContext";
import FormItem from "antd/lib/form/FormItem";
import { Post } from "./components/Post";
import _ from "lodash";
import styles from "./styles.module.scss";
import { useContext } from "react";
import { useCreateReplyMutation } from "./hooks/useCreateReplyMutation";
import { useForm } from "antd/lib/form/Form";
import { useGetForumPost } from "../../hooks/api/useGetPost";
import { useParams } from "react-router-dom";

export const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetForumPost(id);
  const mutation = useCreateReplyMutation();
  const { user } = useContext(AuthenticationContext);

  const [form] = useForm();

  const onFinish = () => {
    const fields = form.getFieldsValue();
    const formattedMessage = JSON.stringify([
      {
        type: "paragraph",
        children: [{ text: fields.message }],
      },
    ]);
    mutation.mutate({ postId: id!, message: formattedMessage });
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <div className={styles.postsPageWrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>{data.data.title}</h1>
        <Button className={styles.buttons}>Report</Button>
      </div>
      <div className={styles.content}>
        <div className={styles.mainPost}>
          <Post data={data.data} key={data.data._id} />
        </div>
        <div className={styles.replies}>
          {data.data.replies?.map((reply: any) => (
            <div className={styles.reply}>
              <Post data={reply} key={reply._id} />
            </div>
          ))}
        </div>
      </div>
      {!_.isEmpty(user?._id) && (
        <Form form={form} onFinish={onFinish}>
          <FormItem name="message">
            <Input.TextArea rows={4} />
          </FormItem>
          <Button onClick={() => form.submit()}>Reply</Button>
        </Form>
      )}
    </div>
  );
};
