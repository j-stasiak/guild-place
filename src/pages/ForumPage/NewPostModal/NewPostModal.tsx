import { Form, Input } from "antd";

import Modal from "antd/lib/modal/Modal";
import { useCreateNewPostMutation } from "../hooks/useNewPostMutation";
import { useForm } from "antd/lib/form/Form";

interface NewPostModalProps {
  visible: boolean;
  onClose: () => void;
}

export const NewPostModal: React.FC<NewPostModalProps> = ({
  visible,
  onClose,
}) => {
  const [form] = useForm();
  const mutation = useCreateNewPostMutation();

  const onSubmit = () => {
    const fields = form.getFieldsValue();
    const formattedMessage = JSON.stringify([
      {
        type: "paragraph",
        children: [{ text: fields.message }],
      },
    ]);
    mutation.mutate({ ...fields, message: formattedMessage });
  };

  if (mutation.isSuccess) {
    onClose();
  }

  return (
    <Modal
      centered
      visible={visible}
      closable
      onCancel={onClose}
      confirmLoading={mutation.isLoading}
      onOk={form.submit}
      okText="Submit"
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item name="title" label="Title">
          <Input placeholder="Enter title" />
        </Form.Item>
        <Form.Item name="message" label="Message">
          <Input.TextArea placeholder="Enter message" rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
