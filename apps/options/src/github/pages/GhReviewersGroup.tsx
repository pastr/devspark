import { Form, FormInstance } from "antd";
import Button from "antd/es/button";
import { useEffect, useRef, useState } from "react";


import { GhReviewersGroupList } from "../components/GhReviewersGroupList";
import { GhReviewersGroupModal } from "../components/GhReviewersGroupModal";

const useResetFormOnCloseModal = ({ form, open }: { form: FormInstance; open: boolean }) => {
  const prevOpenRef = useRef<boolean>();
  useEffect(() => {
    prevOpenRef.current = open;
  }, [open]);
  const prevOpen = prevOpenRef.current;

  useEffect(() => {
    if (!open && prevOpen) {
      form.resetFields();
    }
  }, [form, prevOpen, open]);
};

export default function GhReviewersGroup() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useResetFormOnCloseModal({
    form,
    open: isModalOpen
  });


  return (
    <>
      <h1 className="font-bold text-xl mb-2">Create reviewers group</h1>
      <div className="mb-4">Create a group of users that you can easily add as reviewers to your pull requests.</div>
      <Button type="primary" onClick={() => setIsModalOpen(!isModalOpen)}>Create Group</Button>

      <section className="mt-6">
        <GhReviewersGroupModal isModalOpen={isModalOpen}
                               setIsModalOpen={setIsModalOpen}
                               form={form}
                               editIndex={editIndex}
                               setEditIndex={setEditIndex}/>
      </section>


      <section className="mt-3">
        <GhReviewersGroupList setIsModalOpen={setIsModalOpen}
                              form={form}
                              setEditIndex={setEditIndex} />
      </section>
      {/* Show existing group here */}
    </>
  );
}


