import { Form, Input, Select } from "antd";

import Modal from "antd/lib/modal/Modal";
import { useForm } from "antd/lib/form/Form";
import { useSignUpMutation } from "../../hooks/useSignUpMutation";

interface RegisterModalProps {
  visible: boolean;
  onClose: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  visible,
  onClose,
}) => {
  const [form] = useForm();
  const mutation = useSignUpMutation();

  const onSubmit = () => {
    const fields = form.getFieldsValue();
    mutation.mutate(fields);
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
        <Form.Item name="email" label="Email">
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input placeholder="Enter password" type="password" />
        </Form.Item>
        <Form.Item name="role" label="Role">
          <Select>
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="user">User</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
