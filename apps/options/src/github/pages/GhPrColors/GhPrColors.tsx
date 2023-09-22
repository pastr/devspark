import { Button, Form } from "antd";
import { useState } from "react";

import { useResetFormOnCloseModal } from "../../../_shared/hooks/useResetFormOnCloseModal";
import GhOptionPageTitle from "../../components/GhOptionPageTitle";

import GhPrColorsModal from "./components/GhPrColorsModal";
import { GhPrColorsTable } from "./components/GhPrColorsTable";


export default function GhPrColors() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useResetFormOnCloseModal({
    form,
    open: isModalOpen
  });

  return (
    <div>
      <GhOptionPageTitle title="Customize Pull Requests Color" >
        <>
          <p>Change the colors of the pull requests in the pull request list page.</p>
          <p>The order matter, if a PR match two rules then only the latest one will be applied</p>
        </>
      </GhOptionPageTitle>

      <Button type="primary" onClick={() => setIsModalOpen(!isModalOpen)}>Create Rule</Button>

      <GhPrColorsModal editIndex={editIndex}
                       setEditIndex={setEditIndex}
                       form={form}
                       setIsModalOpen={setIsModalOpen}
                       isModalOpen={isModalOpen} />

      <div className="mt-4">
        <GhPrColorsTable setEditIndex={setEditIndex}
                         form={form}
                         setIsModalOpen={setIsModalOpen} />
      </div>
    </div>
  );
}
