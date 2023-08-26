import { DeleteOutlined } from "@ant-design/icons";
import { Button, ColorPicker, Input, Select } from "antd";
import { useEffect, useState } from "react";

import { useOptions } from "@devspark/context/options";
import { TGhColorPrType } from "@devspark/types/interfaces/TGhColorPrType";

const SelectOptions: { value: TGhColorPrType, label: string }[] = [
  { value: "ownPr", label: "Your own PR" },
  { value: "reviewedPr", label: "Reviewed PR" },
  { value: "titlePr", label: "PR's title that match this regex" },
  { value: "userPr", label: "GitHub user who own the PR" }
];

const defaultColors = {
  ownPr: "#2f81f7",
  reviewedPr: "#8C8D8E",
  titlePr: "#a60565",
  userPr: "#5eff0a"
};

export function GhColoredPr() {
  const [prType, setPrType] = useState<TGhColorPrType>("ownPr");
  const [regexString, setRegexString] = useState("");
  const [selectedColor, setSelectedColor] = useState(defaultColors.ownPr);
  const [options, setOptions] = useOptions();

  useEffect(() => {
    console.log("prType", prType);
    if (prType === "ownPr") {
      setSelectedColor(defaultColors.ownPr);
    } else if (prType === "titlePr") {
      setSelectedColor(defaultColors.titlePr);
    } else if (prType === "reviewedPr") {
      setSelectedColor(defaultColors.reviewedPr);
    } else if (prType === "userPr") {
      setSelectedColor(defaultColors.userPr);
    }
  }, [prType]);

  function addNewPrColor() {
    const newOptions = { ...options };
    if (newOptions?.github?.prColors) {
      newOptions.github.prColors.push({
        type: prType,
        color: selectedColor,
        regexString: regexString
      });
    } else {
      newOptions.github = { prColors: [] };
      newOptions.github.prColors!.push({
        type: prType,
        color: selectedColor,
        regexString: regexString
      });
    }
    setOptions(newOptions);
  }

  function removePrColor(index: number) {
    const newOptions = { ...options };
    newOptions.github!.prColors!.splice(index, 1);
    setOptions(newOptions);
  }

  function getLabelFromType(type: TGhColorPrType) {
    return SelectOptions.find((option) => option.value === type)?.label;
  }

  function showSavedPrColors() {
    const prColors = options?.github?.prColors;
    if (!prColors?.length) return;
    return prColors.map((prColor, index) => {
      return (
        <div className="flex gap-2 items-center justify-between" key={`${index}-${prColor.type}`}>
          <span className="text-sm font-semibold">{getLabelFromType(prColor.type)}</span>
          { prColor.regexString && <span className="text-sm font-semibold">/{prColor.regexString}/</span> }
          <span className="text-sm font-semibold" style={{ color: prColor.color }}>{prColor.color}</span>
          <Button type="link" danger className="flex justify-center items-center mr-1" icon={<DeleteOutlined />} onClick={() => removePrColor(index)} />
        </div>
      );
    });
  }

  function selectChange(value: TGhColorPrType) {
    setPrType(value);
  }

  return (
    <div>
      <div className="flex flex-col items-start gap-3">
        <div>
          <label className="text-xs font-bold text-gray-500 block" htmlFor="gh_colored_pr_select">
            Select the kind of PR you want to color
          </label>
          <Select id="gh_colored_pr_select"
                  value={prType}
                  onChange={selectChange}
                  popupClassName="!w-[230px]"
                  options={SelectOptions}/>
        </div>
        <RegexInput prType={prType} onRegexChange={setRegexString} />
        <div>
          <span className="text-xs font-bold text-gray-500 block">Pick the color</span>
          <ColorPicker value={selectedColor}
                       showText
                       format={"hex"}
                       onChange={(color) => setSelectedColor(color.toHex())}
                       disabledAlpha />
        </div>
        <Button onClick={addNewPrColor}>
          Add
        </Button>
      </div>

      <section className="mt-2">
        {/* {showSavedTextsToDeemphasize()} */}
        {showSavedPrColors()}
      </section>
    </div>
  );
}


function RegexInput({ prType, onRegexChange }: { prType: TGhColorPrType, onRegexChange: (regex: string) => void }) {
  if (prType !== "titlePr" && prType !== "userPr") return null;

  return (
    <div>
      <label className="text-xs font-bold text-gray-500 block" htmlFor="gh_colored_pr_input">
        Regex to match
      </label>
      <Input id="gh_colored_pr_input" onChange={(e) => onRegexChange(e.target.value)} type="text"/>
    </div>
  );
}
