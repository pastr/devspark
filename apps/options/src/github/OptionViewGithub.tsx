import { DeleteOutlined } from "@ant-design/icons";
import { Row, Col, Button, Input } from "antd";
import set from "lodash.set";
import { useState } from "react";

import { useOptions } from "@devspark/context/options";
import { useFocus } from "@devspark/hooks/useFocus";
import { ESupportedApps } from "@devspark/types/enums/ESupportedApps";


import OptionView from "../_shared/components/OptionView";

import { GhColoredPrForm } from "./components/GhColoredPrForm";
import { GhColoredPrTable } from "./components/GhColoredPrTable";

export default function OptionCardJira() {
  // const [textToDeemphasize, setTextToDeemphasize] = useState("");
  // const [textInputRef, setTextInputFocus] = useFocus();
  // const [options, setOptions] = useOptions();

  // function addToTheList() {
  //   const newOptions: typeof options = { ...options };

  //   if (newOptions?.github?.deemphasizeTextList) {
  //     newOptions.github.deemphasizeTextList.push(textToDeemphasize);
  //   } else {
  //     set(newOptions, "github.deemphasizeTextList", []);
  //   }
  //   setOptions(newOptions);
  //   setTextToDeemphasize("");
  //   setTextInputFocus();
  // }

  // function removeFromList(index: number) {
  //   const newOptions: typeof options = { ...options };
  //   newOptions.github!.deemphasizeTextList?.splice(index, 1);
  //   setOptions(newOptions);
  // }

  // function showSavedTextsToDeemphasize() {
  //   const texts = options?.github?.deemphasizeTextList;
  //   if (!texts?.length) return;
  //   return texts.map((text, index) => {
  //     return (
  //       <div className="flex gap-2 items-center justify-between" key={`${index}-${text}`}>
  //         <span className="text-sm font-semibold">{text}</span>
  //         <Button type="link" danger className="flex justify-center items-center mr-1" icon={<DeleteOutlined />} onClick={() => removeFromList(index)} />
  //       </div>
  //     );
  //   });
  // }

  return (
    <OptionView title="GitHub" icon={ESupportedApps.GitHub}>
      <div>
        <Row gutter={[48, 16]}>
          <Col span={8}>
            <h1 className="text-lg font-semibold">Customize PR Color</h1>
            <p className="text-gray-600 text-md">Change the colors of the pull requests in the pull request list page.</p>
            <p className="text-gray-600 text-md">The order matter, if a PR match two rules then only the latest one will be applied</p>
          </Col>

          <Col span={16}>
            <GhColoredPrForm />
          </Col>
        </Row>
        <Row className="mt-6">
          <Col span={24}>
            <GhColoredPrTable />
          </Col>
        </Row>
      </div>
    </OptionView>
  );
}
