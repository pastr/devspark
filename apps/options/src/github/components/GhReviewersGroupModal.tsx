import { MinusCircleOutlined } from "@ant-design/icons";
import { FormInstance, Modal, Input, Button, Form } from "antd";
import set from "lodash.set";
import { useState } from "react";

import { useOptions } from "@devspark/context/options";

import { GithubApi } from "../GithubApi.service";

const formItemLayout = {
  labelCol: {
    sm: { span: 5 }
  },
  wrapperCol: {
    sm: { span: 16 }
  }
};


type GhReviewersGroupModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  form: FormInstance;
  editIndex: number | null;
  setEditIndex: (index: number | null) => void;
}

export function GhReviewersGroupModal({ isModalOpen, setIsModalOpen, form, editIndex, setEditIndex }: GhReviewersGroupModalProps) {
  const [loading, setLoading] = useState(false);
  const [globalErrors, setGlobalErrors] = useState<string[]>([]);
  const [options, setOptions] = useOptions();
  const editMode = editIndex !== null;

  async function onOk() {
    try {
      await form.validateFields();

      const fieldsValue = form.getFieldsValue();
      if (!fieldsValue?.users?.length) {
        setGlobalErrors(["You need to have at least one user"]);
        return;
      }
      setGlobalErrors([]);

      const invalidUsernames = [];
      const validGhUsers = [];
      setLoading(true);
      for (const [index, username] of fieldsValue.users.entries()) {
        const ghUser = await GithubApi.getGithubUser(username);

        if (!ghUser) {
          invalidUsernames.push(username);
          form.setFields([
            {
              name: ["users", index],
              errors: ["Invalid username"]
            }
          ]);
        } else {
          validGhUsers.push(ghUser);
        }
      }


      if (invalidUsernames.length === 0) {
        const formatedGhUsers = validGhUsers.map((ghUser) => ({
          id: ghUser.id,
          login: ghUser.login,
          avatarUrl: ghUser.avatar_url
        }));

        // move this part belown into a fn
        const copyOptions = { ...options };
        if (copyOptions.github?.reviewersGroup.length) {
          if (editMode) {
            copyOptions.github.reviewersGroup[editIndex] = { groupName: fieldsValue.groupName, users: formatedGhUsers };
            setOptions(copyOptions);
            setIsModalOpen(false);
            setEditIndex(null);
            return;
          }


          copyOptions.github.reviewersGroup.push({ groupName: fieldsValue.groupName, users: formatedGhUsers });
        } else {
          set(copyOptions, "github.reviewersGroup", [{ groupName: fieldsValue.groupName, users: formatedGhUsers }]);
        }
        setOptions(copyOptions);

        setIsModalOpen(false);
      }
    } catch (e) {
      console.log("hohohohohooo");
    } finally {
      setLoading(false);
    }

  }

  return (
    <Modal open={isModalOpen}
           confirmLoading={loading}
           title={editMode ? "Edit Reviewers Group" : "Create Reviewers Group"}
           onOk={onOk}
           okText={editMode ? "Save" : "Create"}
           onCancel={() => setIsModalOpen(false)} >
      <Form {...formItemLayout} form={form} className="mt-6">
        <Form.ErrorList className="text-red-600" errors={globalErrors} />

        <Form.Item {...formItemLayout}
                   name="groupName"
                   label="Group name"
                   rules={[
                     {
                       required: true,
                       whitespace: true,
                       message: "A group name is required"
                     }
                   ]}>
          <Input placeholder="Group name"/>
        </Form.Item>

        <Form.List name="users">
          {(fields, { add, remove }, { errors }) =>
            <>
              {fields.map((field, index) =>
                <Form.Item {...formItemLayout}
                           label={`User #${index + 1}`}
                           required={false}
                           key={field.key}>
                  <Form.Item {...field}
                             validateTrigger={["onChange", "onBlur"]}
                             rules={[
                               {
                                 required: true,
                                 whitespace: true,
                                 message: "Please input a GitHub username or delete this field."
                               }
                             ]}
                             noStyle>
                    <Input placeholder="GitHub username" style={{ width: "90%" }} />
                  </Form.Item>
                  <MinusCircleOutlined className="ml-2 text-lg text-gray-500 cursor-pointer hover:text-gray-700"
                                       onClick={() => remove(field.name)}/>

                </Form.Item>
              )}
              <Form.Item>
                <Button type="dashed"
                        onClick={() => add()}>
                  Add user
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          }
        </Form.List>
      </Form>

    </Modal>
  );
}
