import { useState } from "react";
import { ESupportedApps } from "../../common/enums/ESupportedApps";
import { useOptions } from "../../common/context/options.context";
import set from "lodash.set";
import { useFocus } from "../../common/hooks/useFocus";
import OptionView from "./OptionView";
import { Row, Col, Divider, Button, Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export default function OptionCardJira() {
  const [textToDeemphasize, setTextToDeemphasize] = useState("");
  const [textInputRef, setTextInputFocus] = useFocus();
  const [options, setOptions] = useOptions();

  function addToTheList() {
    const newOptions: typeof options = { ...options };

    if (newOptions?.options?.github?.deemphasizeTextList) {
      newOptions.options.github.deemphasizeTextList.push(textToDeemphasize);
    } else {
      set(newOptions, "options.github.deemphasizeTextList", []);
    }
    setOptions(newOptions);
    setTextToDeemphasize("");
    setTextInputFocus();
  }

  function removeFromList(index: number) {
    const newOptions: typeof options = { ...options };
    newOptions.options!.github!.deemphasizeTextList?.splice(index, 1);
    setOptions(newOptions);
  }

  function showSavedTextsToDeemphasize() {
    const texts = options?.options?.github?.deemphasizeTextList;
    if (!texts?.length) return;
    return texts.map((text, index) => {
      return (
        <div className="flex gap-2 items-center justify-between" key={`${index}-${text}`}>
          <span className="text-sm font-semibold">{text}</span>
          <Button type="link" danger className="flex justify-center items-center mr-1" icon={<DeleteOutlined />} onClick={() => removeFromList(index)} />
        </div>
      );
    });
  }

  return (
    <OptionView title="GitHub" icon={ESupportedApps.GitHub}>
      <div>
        <Row gutter={[32, 16]}>
          <Col span={8}>
            <Row className="flex-col">
              <h1 className="text-lg font-semibold">Deemphasize PR</h1>
              <p className="text-gray-600 text-md">Pull request in the pull request page will be deemphasized if their name contains one of the text you added</p>
            </Row>
          </Col>

          <Col span={16}>
            <Row>
              <div>
                <label className="text-xs font-bold text-gray-500" htmlFor="github_deemphasize_text">
                  Text to deemphasize (case sensitive)
                </label>
                <div className="flex gap-2">
                  <Input id="github_deemphasize_text"
                         ref={textInputRef}
                         onKeyDown={(e) => e.key === "Enter" ? addToTheList() : null}
                         value={textToDeemphasize}
                         onChange={(e) => setTextToDeemphasize(e.target.value)}
                         placeholder="JiraTicket-123"
                         type="text" />
                  <Button disabled={textToDeemphasize === ""}
                          onClick={addToTheList}>
                    Add
                  </Button>
                </div>

                <section className="mt-2">
                  {showSavedTextsToDeemphasize()}
                </section>
              </div>
            </Row>
          </Col>
        </Row>
        {/* <section>
          <Divider />
          <Button type="primary" size="large" onClick={addToTheList}>
            Save
          </Button>
        </section> */}
      </div>
    </OptionView>
  );
}
