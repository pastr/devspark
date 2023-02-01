import browser from "webextension-polyfill";
import { ribbonCorner } from "./ribbon-corner";
import { IEnvrionmentNameState, IOptionsContextState } from "../../../common/types/IOptionsState";

console.log("ADD RIBBON");
const url = new URL(window.location.href);

// get sync storage
browser.storage.sync.get("options").then((item) => {
  const options: IOptionsContextState = item.options;
  console.log("🚀 ~ file: index.ts:9 ~ browser.storage.sync.get ~ result", options);
  options.options?.environmentName?.forEach((environmentNameOption) => {
    console.log("🚀 ~ file: index.ts:13 ~ options.options?.environmentName?.forEach ~ environmentName", environmentNameOption);
    addRibbon(environmentNameOption);
  });

});


// ribbonCorner({ horizontalAlign: "right" });

function addRibbon(option: IEnvrionmentNameState) {
  console.log("🚀 ~ file: index.ts:23 ~ addRibbon ~ option", option);
  const url = new URL(window.location.href);
  console.log("🚀 ~ file: index.ts:25 ~ addRibbon ~ url", url);
  if (url.href.includes(option.url)) {
    ribbonCorner(option);
  }
  // const environmentName = url.hostname.split(".")[0];
}