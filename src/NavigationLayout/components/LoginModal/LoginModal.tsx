import { Button, Form, Input } from "antd";

import Modal from "antd/lib/modal/Modal";
import { useForm } from "antd/lib/form/Form";
import { useLoginMutation } from "../../hooks/useLoginMutation";

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
  onLogin: (user: any) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  visible,
  onClose,
  onLogin,
}) => {
  const [form] = useForm();
  const mutation = useLoginMutation();

  const onSubmit = () => {
    const fields = form.getFieldsValue();
    mutation.mutate(fields);
  };

  if (mutation.isSuccess) {
    onLogin((mutation.data as any).data);
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
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input placeholder="Enter email"></Input>
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter password" type="password" />
        </Form.Item>
      </Form>
      <Button htmlType="submit" type="primary" onClick={() => form.submit()}>
        Submit
      </Button>
    </Modal>
  );
};
