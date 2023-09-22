import { ColorPicker, Form, FormInstance, Input, Modal, Select } from "antd";
import { useState } from "react";

import { useOptions } from "@devspark/context/options";
import { TGhColorPrType } from "@devspark/types/interfaces/TGhColorPrType";

type GhPrColorsModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  form: FormInstance;
  editIndex: number | null;
  setEditIndex: (index: number | null) => void;
}

const DEFAULT_COLOR = "#2f81f7";

const selectOptions: { value: TGhColorPrType, label: string }[] = [
  { value: "ownPr", label: "Your own PR" },
  { value: "titlePr", label: "PR's title that match this regex" },
  { value: "userPr", label: "GitHub's user who own the PR" }
];

export default function GhPrColorsModal({ form, isModalOpen, setIsModalOpen, editIndex, setEditIndex }: GhPrColorsModalProps) {
  const [options, setOptions] = useOptions();
  const [ruleType, setRuleType] = useState<TGhColorPrType>("ownPr");
  const editMode = editIndex !== null;

  async function addNewPrColor() {
    let color;
    const regexString = form.getFieldValue("ruleType") !== "ownPr" ? form.getFieldValue("regexString") : null;

    if (typeof form.getFieldValue("color") === "string") {
      color = form.getFieldValue("color");
    } else if (typeof form.getFieldValue("color") === "object") {
      color = form.getFieldValue("color").toHexString();
    } else {
      color = DEFAULT_COLOR;
    }

    try {
      await form.validateFields();

      const newOptions = { ...options };
      if (editMode) {
        newOptions.github.prColors[editIndex] = {
          type: form.getFieldValue("ruleType"),
          color: color,
          regexString
        };
      } else {
        newOptions.github.prColors.push({
          type: form.getFieldValue("ruleType"),
          color: color,
          regexString
        });
      }
      setOptions(newOptions);
      setEditIndex(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Modal open={isModalOpen}
           title={editMode ? "Edit Rule" : "Create Rule"}
           onOk={addNewPrColor}
           okText={editMode ? "Save" : "Create"}
           onCancel={() => setIsModalOpen(false)} >
      <Form form={form}
            className="mt-6"
            layout={"vertical"}>
        <Form.Item name="ruleType"
                   label="Rule Type"
                   initialValue={ruleType}>
          <Select id="gh_colored_pr_select"
                  value={ruleType}
                  onChange={setRuleType}
                  options={selectOptions}/>
        </Form.Item>

        <RegexInput prType={form.getFieldValue("ruleType")} />

        <Form.Item name="color"
                   label="Color">
          <ColorPicker showText
                       defaultValue={DEFAULT_COLOR}
                       format={"hex"}
                       disabledAlpha />
        </Form.Item>

      </Form>
    </Modal>
  );
}

function RegexInput({ prType }: { prType: TGhColorPrType }) {
  if (prType !== "titlePr" && prType !== "userPr") {
    return null;
  }

  return (
    <Form.Item name="regexString"
               label="Regex"
               rules={[{
                 required: true,
                 message: "Please enter a regex"
               }]}>
      <Input type="text"/>
    </Form.Item>
  );
}
