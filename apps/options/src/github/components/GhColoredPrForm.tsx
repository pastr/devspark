import { Button, ColorPicker, Input, Select } from "antd";
import { useEffect, useState } from "react";

import { useOptions } from "@devspark/context/options";
import { TGhColorPrType } from "@devspark/types/interfaces/TGhColorPrType";


const selectOptions: { value: TGhColorPrType, label: string }[] = [
  { value: "ownPr", label: "Your own PR" },
  { value: "titlePr", label: "PR's title that match this regex" },
  { value: "userPr", label: "GitHub's user who own the PR" }
];

const defaultColors = {
  ownPr: "#2f81f7",
  titlePr: "#a60565",
  userPr: "#5eff0a"
};

export function GhColoredPrForm() {
  const [prType, setPrType] = useState<TGhColorPrType>("ownPr");
  const [regexString, setRegexString] = useState("");
  const [selectedColor, setSelectedColor] = useState(defaultColors.ownPr);
  const [options, setOptions] = useOptions();

  useEffect(() => {
    if (prType === "ownPr") {
      setSelectedColor(defaultColors.ownPr);
    } else if (prType === "titlePr") {
      setSelectedColor(defaultColors.titlePr);
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
                  options={selectOptions}/>
        </div>
        <RegexInput prType={prType} onRegexChange={setRegexString} />
        <div>
          <span className="text-xs font-bold text-gray-500 block">Pick the color</span>
          <ColorPicker value={selectedColor}
                       showText
                       format={"hex"}
                       onChange={(color) => setSelectedColor(color.toHexString())}
                       disabledAlpha />
        </div>
        <Button type="primary" onClick={addNewPrColor}>
          Add
        </Button>
      </div>
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
